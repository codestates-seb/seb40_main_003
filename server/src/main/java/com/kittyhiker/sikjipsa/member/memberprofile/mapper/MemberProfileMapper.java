package com.kittyhiker.sikjipsa.member.memberprofile.mapper;

import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.entity.MemberProfile;
import com.kittyhiker.sikjipsa.member.memberprofile.dto.MemberProfileDto;
import com.kittyhiker.sikjipsa.member.memberprofile.dto.ProfileResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface MemberProfileMapper {
	MemberProfileDto map(MemberProfile value);
	String map(Image value);

	ProfileResponseDto toProfileResponseDto(Member response);
//
//	@Mapping(source = "memberResponse", target = "member")
//	DealResponseDto dealToDealResponseDto(Deal deal, List<String> images, MemberResponseDto memberResponse);
}
