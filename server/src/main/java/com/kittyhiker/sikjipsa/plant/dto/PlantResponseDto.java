package com.kittyhiker.sikjipsa.plant.dto;

import com.kittyhiker.sikjipsa.image.dto.ImageDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class PlantResponseDto {
	private Long plantId;

	private String name;

	//private int age;

	private int years;

	private String type;

	//private ImageDto photo;

	private ImageDto image;
}
