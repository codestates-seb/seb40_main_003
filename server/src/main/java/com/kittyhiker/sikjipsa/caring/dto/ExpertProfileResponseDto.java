package com.kittyhiker.sikjipsa.caring.dto;

import com.kittyhiker.sikjipsa.image.dto.ImageDto;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import com.kittyhiker.sikjipsa.plant.dto.PlantResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ExpertProfileResponseDto {
	private Long expertId;

	private String name;

	private int age;

	private int gender;

	private String simpleContent;

	private String detailContent;

	private int useNum;

	private String price;

	private String address;

	private String extra;

	private MemberDto2 member;

	//private List<PlantResponseDto> plants;

	private List<TechTagDto> techTags;

//	private List<AreaTagDto> areaTags;

	private List<ExpertReviewDto> expertReviews;

	private ImageDto image;
	//private Long expertProfileId;
}