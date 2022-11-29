package com.kittyhiker.sikjipsa.caring.dto;


import com.kittyhiker.sikjipsa.caring.entity.AreaTag;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ExpertProfileDto {
	private Long expertId;

	private String name;

	private int age;

	private int gender;

	private String simpleContent;

	private String detailContent;

	private String price;

	private String address;

	private String extra;

	//private Member member;

//	private Image image;

//	private List<MemberLikeExpert> memberLikeExperts = new ArrayList<>();
//
//	private List<ExpertReview> expertReviews = new ArrayList<>();

	private List<TechTagDto> techTags;

	private List<AreaTag> areaTags;
//
//	private List<ExpertChat> expertChats = new ArrayList<>();
}
