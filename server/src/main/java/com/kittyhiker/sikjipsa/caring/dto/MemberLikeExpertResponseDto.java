package com.kittyhiker.sikjipsa.caring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberLikeExpertResponseDto {
	private Long memberLikeExpertId;

	private MemberDto3 member;

	private ExpertProfileDto2 expertProfile;
}
