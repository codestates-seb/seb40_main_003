package com.kittyhiker.sikjipsa.member.memberprofile.dto;

import com.kittyhiker.sikjipsa.caring.dto.MemberDto;
import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;

import javax.persistence.JoinColumn;
import javax.persistence.OneToOne;

@Getter
@AllArgsConstructor
public class MemberInfoDto {
	private Long infoId;
	//private MemberDto member;
	private String name;
	private String phone;
	private String birth;
	private Integer gender;
	private String address;
}
