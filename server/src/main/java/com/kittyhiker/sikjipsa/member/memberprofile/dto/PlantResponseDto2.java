package com.kittyhiker.sikjipsa.member.memberprofile.dto;

import com.kittyhiker.sikjipsa.image.dto.ImageDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PlantResponseDto2 {
	private Long plantId;

	private String plantName;

	private int plantAge;

	private String plantType;

	private ImageDto plantPhoto;
}
