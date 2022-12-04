package com.kittyhiker.sikjipsa.chatting.dto;

import com.kittyhiker.sikjipsa.caring.dto.AreaTagDto;
import com.kittyhiker.sikjipsa.caring.dto.MemberDto2;
import com.kittyhiker.sikjipsa.caring.dto.TechTagDto;
import com.kittyhiker.sikjipsa.caring.entity.AreaTag;
import com.kittyhiker.sikjipsa.image.dto.ImageDto;
import com.kittyhiker.sikjipsa.image.dto.ImageDto2;
import com.kittyhiker.sikjipsa.image.entity.Image;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatExpertInfo {
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
	//private MemberDto2 member;
	private List<TechTagDto> techTags;
	private List<AreaTagDto> areaTags;
	private ImageDto image;
}
