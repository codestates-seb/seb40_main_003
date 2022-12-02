package com.kittyhiker.sikjipsa.caring.mapper;

import com.kittyhiker.sikjipsa.caring.dto.ExpertSuccessResponseDto;
import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.caring.entity.ExpertSuccess;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ExpertSuccessMapper {
	ExpertSuccess toExpertSuccess(ExpertProfile expertProfile, Member member, Member member1);

	ExpertSuccessResponseDto toExpertSuccessResponseDto(ExpertSuccess savedSuccess, Long expertId, Long buyerId);
}
