package com.kittyhiker.sikjipsa.member.service;

import com.kittyhiker.sikjipsa.exception.BusinessLogicException;
import com.kittyhiker.sikjipsa.exception.ExceptionCode;
import com.kittyhiker.sikjipsa.jwt.dto.TokenDto;
import com.kittyhiker.sikjipsa.jwt.entity.RefreshToken;
import com.kittyhiker.sikjipsa.jwt.repository.TokenRepository;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import com.kittyhiker.sikjipsa.member.dto.*;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.entity.MemberInformation;
import com.kittyhiker.sikjipsa.member.entity.MemberProfile;
import com.kittyhiker.sikjipsa.member.mapper.MemberMapper;
import com.kittyhiker.sikjipsa.member.memberprofile.repository.MemberProfileRepository;
import com.kittyhiker.sikjipsa.member.repository.MemberInfoRepository;
import com.kittyhiker.sikjipsa.member.repository.MemberRepository;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class MemberService {
    private final MemberRepository memberRepository;
    private final MemberInfoRepository memberInfoRepository;
    private final TokenRepository tokenRepository;
    private final JwtTokenizer jwtTokenizer;
    private final PasswordEncoder passwordEncoder;
    private final MemberMapper memberMapper;
    private final MemberProfileRepository memberProfileRepository;

    public Long signUpUser(MemberSignupDto signupDto) {
        if (!checkIfUserExists(signupDto.getEmail())) {
            throw new BusinessLogicException(ExceptionCode.ALREAD_EXISTS_EMAIL);
        }

        Member member = memberMapper.memberSignupDtoToMember(signupDto);
        member.encryptingPassword(passwordEncoder);
        member.addRole("ROLE_USER,");
        Member savedUser = memberRepository.save(member);
//        MemberInformation newMemberInfo = MemberInformation.builder().member(savedUser).build();
//        memberInfoRepository.save(newMemberInfo);
        MemberProfile memberProfile = MemberProfile.builder().member(savedUser).content("content").build();
        memberProfileRepository.save(memberProfile);
        return savedUser.getMemberId();
    }

    public MemberLoginResponseDto login(MemberLoginDto memberLoginDto) {
        Member member = memberMapper.memberLoginDtoToMember(memberLoginDto);
        Member findMember = memberRepository.findUserByEmail(member.getEmail())
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_EMAIL));

        verifyPassword(member, findMember);

        String accessToken = jwtTokenizer.createAccessToken(findMember.getMemberId(), findMember.getEmail(), findMember.getRolesToList());
        String refreshToken = jwtTokenizer.createRefreshToken(findMember.getMemberId(), findMember.getEmail(), findMember.getRolesToList());

        tokenRepository.save(new RefreshToken(refreshToken));
        String image = "";
        if (findMember.getImage()!=null) image=findMember.getImage().getImgUrl();

        return MemberLoginResponseDto.builder()
                .accessToken(accessToken)
                .refreshToken(refreshToken)
                .memberId(findMember.getMemberId())
                .image(image)
                .nickname(findMember.getNickname()).build();
    }

    public boolean logoutUser(String token) {
        String[] splitToken = token.split(" ");
        String refreshToken = splitToken[1];

        if (tokenRepository.findRefreshTokenByValue(refreshToken).isEmpty()) return false;
        tokenRepository.deleteRefreshTokenByValue(refreshToken);
        return true;
    }

    public MemberInfoResponseDto postMemberInfo(Long userId, MemberInfoPostDto infoPostDto) {
        MemberInformation info = memberMapper.memberInfoPostDtoToMemberInfo(infoPostDto);
        Member registerMember = verifyMember(userId);
        info.setMember(registerMember);
        MemberInformation savedInfo = memberInfoRepository.save(info);
        return memberMapper.memberInfoToResponseDto(savedInfo, registerMember.getMemberId()
                , registerMember.getNickname());
    }

    public TokenDto reissueToken(String refreshToken) {
//        String[] tokenArr = refreshToken.split(",");
//        refreshToken = tokenArr[1];

        tokenRepository.findRefreshTokenByValue(refreshToken)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.INVALID_REFRESH_TOKEN));

        Claims claims = jwtTokenizer.parseRefreshToken(refreshToken);

        Long userId = Long.valueOf((Integer)claims.get("userId"));
        List roles = (List) claims.get("roles");
        String email = claims.getSubject();

        String accessToken = jwtTokenizer.createAccessToken(userId, email, roles);
        String newRefreshToken = jwtTokenizer.createRefreshToken(userId, email, roles);

        tokenRepository.save(new RefreshToken(newRefreshToken));

        return TokenDto.builder()
                .accessToken(accessToken)
                .refreshToken(newRefreshToken)
                .build();
    }

    public Member verifyMember(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(()
                -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    private void verifyPassword(Member user, Member findUser) {
        if (!passwordEncoder.matches(user.getPassword(), findUser.getPassword())) {
            throw new BusinessLogicException(ExceptionCode.WRONG_PASSWORD);
        }
    }

    private boolean checkIfUserExists(String email) {
        return memberRepository.findUserByEmail(email).isEmpty();
    }

}
