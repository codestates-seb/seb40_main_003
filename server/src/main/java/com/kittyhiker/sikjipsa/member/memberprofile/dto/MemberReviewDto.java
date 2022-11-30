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

	private Long dealId;

//	private Deal deal;

	private MemberDto buyer; // 구매자

	private String content;
//	private LocalDateTime createdAt;
//	private LocalDateTime modifiedAt;
}
