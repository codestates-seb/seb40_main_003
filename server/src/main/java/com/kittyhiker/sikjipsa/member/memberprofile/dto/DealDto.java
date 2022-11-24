package com.kittyhiker.sikjipsa.member.memberprofile.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class DealDto {
	private Long dealId;

	private String title;

	//private String content;

	private int view;

	private int price;

	private int likes;

	//private int category;

	private int state;

	private LocalDateTime createdAt;

}
