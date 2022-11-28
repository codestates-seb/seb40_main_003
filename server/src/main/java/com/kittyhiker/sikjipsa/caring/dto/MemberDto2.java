package com.kittyhiker.sikjipsa.caring.dto;

import com.kittyhiker.sikjipsa.plant.dto.PlantResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MemberDto2 {
	private Long memberId;
	private List<PlantResponseDto> plants;
	//private ImageDto image;
}
