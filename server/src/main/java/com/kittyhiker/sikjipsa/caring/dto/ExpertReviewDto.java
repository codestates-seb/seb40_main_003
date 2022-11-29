package com.kittyhiker.sikjipsa.caring.dto;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class ExpertReviewDto {
	private Long expertReviewId;
	@NotBlank(message = "Not Blank, 공백이 있습니다.")
	private String content;
//	private ExpertProfileDto2 expertProfile;
	private MemberDto3 member;
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
}
