package com.kittyhiker.sikjipsa.member.memberprofile.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@AllArgsConstructor
public class MemberPatchDto {
	private Long id;
	private String nickname;
}
