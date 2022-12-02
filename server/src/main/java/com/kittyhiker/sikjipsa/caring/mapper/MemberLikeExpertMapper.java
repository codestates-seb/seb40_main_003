package com.kittyhiker.sikjipsa.caring.mapper;

import com.kittyhiker.sikjipsa.caring.dto.MemberLikeExpertResponseDto;
import com.kittyhiker.sikjipsa.caring.entity.MemberLikeExpert;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")

public interface MemberLikeExpertMapper {
	MemberLikeExpertResponseDto toMemberLikeExpertResponseDto(MemberLikeExpert response);

	List<MemberLikeExpertResponseDto> toMemberLikeExpertResponseDtos(List<MemberLikeExpert> memberLikeExperts);
}
