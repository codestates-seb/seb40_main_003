package com.kittyhiker.sikjipsa.caring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Getter
@AllArgsConstructor
public class TechTagDto {
	private Long techTagId;

	@NotBlank(message = "Not Blank, 공백이 있습니다.")
	private String techTagName;
}
