package com.kittyhiker.sikjipsa.member.memberprofile.dto;

import com.kittyhiker.sikjipsa.caring.dto.MemberDto;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class MemberInfoResponseDto2 {
	//private Long infoId;
	//private MemberDto member;
	private String name;
	private String phone;
	private String birth;
	private Integer gender;
	private String address;
}
