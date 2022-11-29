package com.kittyhiker.sikjipsa.plant.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@AllArgsConstructor
public class PlantDto {
	private Long plantId;

	@NotBlank(message = "Not Blank, 공백이 있습니다.")
	private String name;

	@NotBlank(message = "Not Blank, 공백이 있습니다.")
	private String years;

	@NotBlank(message = "Not Blank, 공백이 있습니다.")
	private String type;
}
