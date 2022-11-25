package com.kittyhiker.sikjipsa.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.Pattern;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberSignupDto {

    @NotEmpty
    @Pattern(regexp = "^[a-zA-Z0-9+-\\_.]+@[a-zA-Z0-9-]+\\.[a-zA-Z0-9-.]+$",
            message = "이메일 형식을 맞춰야합니다")
    private String email;

    @NotEmpty
    @Pattern(regexp = "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[~!@#$%^&*()+|=])[A-Za-z\\d~!@#$%^&*()+|=]{7,16}$",
            message = "비밀번호는 영문+숫자+특수문자를 포함한 8~20자여야 합니다")
    // 영문 + 숫자 + 특수문자 8자 이상 20자 이하
    private String password;

    @NotEmpty
    @Pattern(regexp = "^(?=.*[a-z0-9가-힣])[a-z0-9가-힣].{1,16}$",
            message = "닉네임은 영문, 숫자, 한글 중 2자 이상 16자 이하여야합니다 (초성, 자음 불가)")
    // 영문, 숫자, 한글 2자 이상 16자 이하(공백 및 초성, 자음 불가능)
    private String nickname;
}
