package com.kittyhiker.sikjipsa.member.memberprofile.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfileDto {
	@NotBlank(message = "Not Blank, 공백이 있습니다.")
	private String content;
}
