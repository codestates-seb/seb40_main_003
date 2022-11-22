package com.kittyhiker.sikjipsa.member.mapper;

import com.kittyhiker.sikjipsa.member.dto.*;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.entity.MemberInformation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberSignupDtoToMember(MemberSignupDto memberSignupDto);
    Member memberLoginDtoToMember(MemberLoginDto memberLoginDto);
    MemberInformation memberInfoPostDtoToMemberInfo(MemberInfoPostDto infoPostDto);
    MemberInfoResponseDto memberInfoToResponseDto(MemberInformation memberInfo);

    default MemberResponseDto memberToMemberResponseDto(Member member, String imageUrl){
        if ( member == null ) {
            return null;
        }

        MemberResponseDto.MemberResponseDtoBuilder memberResponseDto = MemberResponseDto.builder();

        memberResponseDto.memberId(member.getId());
        memberResponseDto.nickname( member.getNickname() );
        memberResponseDto.image(imageUrl);

        return memberResponseDto.build();
    }
}
