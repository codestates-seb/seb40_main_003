package com.kittyhiker.sikjipsa.member.memberprofile.mapper;

import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.entity.MemberProfile;
import com.kittyhiker.sikjipsa.member.memberprofile.dto.MemberProfileDto;
import com.kittyhiker.sikjipsa.member.memberprofile.dto.ProfileResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

@Mapper(componentModel = "spring")
public interface MemberProfileMapper {
	MemberProfileDto map(MemberProfile value);
	ProfileResponseDto toProfileResponseDto(Member response);
}
