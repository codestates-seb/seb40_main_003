package com.kittyhiker.sikjipsa.member.memberprofile.dto;

import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.image.dto.ImageDto;
import com.kittyhiker.sikjipsa.plant.dto.PlantResponseDto;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
public class ProfileResponseDto {
	private String nickname;
	private ImageDto image;

	private MemberProfileDto memberProfile;

	private MemberInfoResponseDto3 memberInformation;

	private List<PlantResponseDto> plants;
	private List<DealResponseDto> deals;
	private List<MemberReviewDto> memberReviews;
}
