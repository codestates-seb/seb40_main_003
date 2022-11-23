package com.kittyhiker.sikjipsa.member.memberprofile.dto;

import com.kittyhiker.sikjipsa.caring.dto.MemberDto;
import com.kittyhiker.sikjipsa.image.dto.ImageDto;
import com.kittyhiker.sikjipsa.plant.dto.PlantResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class ProfileResponseDto {
	private String nickname;
	private ImageDto image;

	private MemberProfileDto memberProfile;
	//private String content;

	private MemberInfoResponseDto3 memberInformation;
	//private Long infoId;
	//private MemberDto member;
//	private String name;
//	private String phone;
//	private String birth;
//	private Integer gender;
//	private String address;


	private List<PlantResponseDto> plants;
	private List<DealDto> deals;
	private List<MemberReviewDto> memberReviews;
}
