package com.kittyhiker.sikjipsa.member.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.Pattern;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MemberInfoResponseDto {

    private Long memberId;
    private String nickname;
    private String name;
    @Pattern(regexp = "^01(?:0|1|[6-9])-(?:\\d{3}|\\d{4})-\\d{4}$")
    private String phone;
    private String birth;
    private Integer gender;
    private String address;
}
