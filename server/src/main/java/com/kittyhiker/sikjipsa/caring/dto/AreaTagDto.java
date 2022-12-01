package com.kittyhiker.sikjipsa.caring.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotNull;

@Getter
@AllArgsConstructor
public class AreaTagDto {
	private Long areaTagId;

	@NotBlank(message = "Not Blank, 공백이 있습니다.")
	private String areaTagName;
}
