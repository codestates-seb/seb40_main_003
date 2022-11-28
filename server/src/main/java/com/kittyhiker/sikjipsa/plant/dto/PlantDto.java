package com.kittyhiker.sikjipsa.plant.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class PlantDto {
	private Long plantId;

	private String name;

	private String years;

	private String days;

	private String type;
}
