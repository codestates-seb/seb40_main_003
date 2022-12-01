package com.kittyhiker.sikjipsa.caring.dto;

import com.kittyhiker.sikjipsa.image.dto.ImageDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ExpertProfileResponseDtos {
	private Long expertId;

	private String name;

	private int age;

	private int gender;

	private String simpleContent;

	//private String detailContent;

	//private int useNum;

	//private int price;

	private String address;

	private Long likes;

	private Long view;

	//private String extra;
	private MemberDto2 member;
	private List<TechTagDto> techTags;
	private List<AreaTagDto> areaTags;
	private ImageDto image;
}
