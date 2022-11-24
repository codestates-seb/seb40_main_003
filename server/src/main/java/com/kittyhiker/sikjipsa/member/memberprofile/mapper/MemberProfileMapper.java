package com.kittyhiker.sikjipsa.member.memberprofile.mapper;

import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.entity.MemberProfile;
import com.kittyhiker.sikjipsa.member.memberprofile.dto.ProfileResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MemberProfileMapper {

	//	@Mapping(target = "infoId", source = "memberInformation.infoId")
//	@Mapping(target = "member", source = "memberInformation.member")
//	@Mapping(target = "name", source = "memberInformation.name")
//	@Mapping(target = "phone", source = "memberInformation.phone")
//	@Mapping(target = "birth", source = "memberInformation.birth")
//	@Mapping(target = "gender", source = "memberInformation.gender")
//	@Mapping(target = "content", source = "memberProfile.content")
//	@Mapping(target = "address", source = "memberInformation.address")
	ProfileResponseDto toProfileResponseDto(Member response);
}
