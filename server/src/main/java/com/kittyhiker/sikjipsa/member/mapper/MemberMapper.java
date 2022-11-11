package com.kittyhiker.sikjipsa.member.mapper;

import com.kittyhiker.sikjipsa.member.dto.MemberInfoPostDto;
import com.kittyhiker.sikjipsa.member.dto.MemberInfoResponseDto;
import com.kittyhiker.sikjipsa.member.dto.MemberLoginDto;
import com.kittyhiker.sikjipsa.member.dto.MemberSignupDto;
import com.kittyhiker.sikjipsa.member.entiry.Member;
import com.kittyhiker.sikjipsa.member.entiry.MemberInformation;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberMapper {
    Member memberSignupDtoToMember(MemberSignupDto memberSignupDto);
    Member memberLoginDtoToMember(MemberLoginDto memberLoginDto);
    MemberInformation memberInfoPostDtoToMemberInfo(MemberInfoPostDto infoPostDto);
    MemberInfoResponseDto memberInfoToResponseDto(MemberInformation memberInfo);
}
