package com.kittyhiker.sikjipsa.image.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ImageDto {
	private Long imageId;

//	private String imgName;
//
//	private String originalName;

	private String imgUrl;

	private String isRepImg;
}
