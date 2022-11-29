package com.kittyhiker.sikjipsa.caring.dto;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ExpertReviewDto {
	private Long expertReviewId;
	private String content;
//	private ExpertProfileDto2 expertProfile;
	private MemberDto3 member;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
}
