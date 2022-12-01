package com.kittyhiker.sikjipsa.member.memberprofile.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@AllArgsConstructor
public class DealDto {
	private Long dealId;

	private String title;

	//private String content;

	private int view;

	private int price;

	private int likeNum;

	//private int category;

	private int state;

	List<String> images;

	private LocalDateTime createdAt;

}
