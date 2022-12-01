package com.kittyhiker.sikjipsa.member.memberprofile.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.validation.constraints.NotBlank;
import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class MemberPatchDto {
	private Long memberId;

//	@NotEmpty
//	@Pattern(regexp = "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
//			message = "이메일 형식을 맞춰야합니다")
//	private String email;

//	//@NotEmpty
//	@Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{7,16}$",
//			message = "비밀번호는 영문+숫자+특수문자를 포함한 8~20자여야 합니다")
//	// 영문 + 숫자 + 특수문자 8자 이상 20자 이하
//	private String password;

	@NotBlank(message = "Not Blank, 공백이 있습니다.")
	private String nickname;

	private MemberProfileDto memberProfile;

	//private String content;

	private MemberInfoDto memberInformation;

	//private String address;
}
