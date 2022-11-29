package com.kittyhiker.sikjipsa.member.memberprofile.dto;

import com.kittyhiker.sikjipsa.caring.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import net.bytebuddy.asm.Advice;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class MemberReviewDto {
	private Long dealReviewId;

	private String content;

//	private Deal deal;

	private MemberDto member; // 구매자
	private LocalDateTime createdAt;
	private LocalDateTime modifiedAt;
}
