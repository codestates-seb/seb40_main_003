package com.kittyhiker.sikjipsa.member.dto;

import com.kittyhiker.sikjipsa.image.dto.ImageDto2;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberResponseDto {

	private Long memberId;
	private String nickname;
	private ImageDto2 image;
}
