package com.kittyhiker.sikjipsa.member.memberprofile.mapper;

import com.kittyhiker.sikjipsa.member.entity.MemberInformation;
import com.kittyhiker.sikjipsa.member.memberprofile.dto.MemberInfoDto;
import com.kittyhiker.sikjipsa.member.memberprofile.dto.MemberInfoResponseDto2;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface MemberInfoMapper {
	MemberInformation toMemberInfo(MemberInfoDto memberInfoDto);

	MemberInfoResponseDto2 toMemberInfoResponseDto(MemberInformation response);
}
