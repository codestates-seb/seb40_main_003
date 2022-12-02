package com.kittyhiker.sikjipsa.member.mapper;

import com.kittyhiker.sikjipsa.image.dto.ImageDto;
import com.kittyhiker.sikjipsa.image.dto.ImageDto2;
import com.kittyhiker.sikjipsa.member.dto.*;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.entity.MemberInformation;
import com.kittyhiker.sikjipsa.member.entity.MemberProfile;
import com.kittyhiker.sikjipsa.member.memberprofile.dto.MemberPatchDto;
import com.kittyhiker.sikjipsa.member.memberprofile.mapper.MemberInfoMapper;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;
import org.mapstruct.Mappings;
import org.mapstruct.SubclassMapping;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberSignupDtoToMember(MemberSignupDto memberSignupDto);
    Member memberLoginDtoToMember(MemberLoginDto memberLoginDto);
    MemberInformation memberInfoPostDtoToMemberInfo(MemberInfoPostDto infoPostDto);
    MemberInfoResponseDto memberInfoToResponseDto(MemberInformation memberInfo, Long memberId, String nickname);
    MemberResponseDto memberToMemberResponseDto(Member member, ImageDto2 imageDto);

    @Mapping(source = "imageUrl", target = "image")
    CommunityMemberResponse memberToCommunityMemberDto(Member member, String imageUrl);

//    default MemberResponseDto memberToMemberResponseDto(Member member, String imageUrl){
//        if ( member == null ) {
//            return null;
//        }
//
//        MemberResponseDto.MemberResponseDtoBuilder memberResponseDto = MemberResponseDto.builder();
//
//        memberResponseDto.memberId(member.getMemberId());
//        memberResponseDto.nickname( member.getNickname() );
//        memberResponseDto.image(imageUrl);
//
//        return memberResponseDto.build();
//    }

    // MemberProfile
	Member toProfile(MemberPatchDto memberPatchDto);
}
