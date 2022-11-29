package com.kittyhiker.sikjipsa.caring.dto;

import com.kittyhiker.sikjipsa.image.dto.ImageDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class ExpertSuccessResponseDtos {
	private Long expertId;
	private String name;
	private int age;
	private int gender;
	private String simpleContent;
	private ImageDto image;
	private String address;
	private Long view;
	private Long likes;
}
