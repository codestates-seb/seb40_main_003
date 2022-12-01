package com.kittyhiker.sikjipsa.caring.dto;

import com.kittyhiker.sikjipsa.plant.dto.PlantResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MemberDto {
	private Long memberId;
	private String nickname;
	private List<PlantResponseDto> plants;
}
