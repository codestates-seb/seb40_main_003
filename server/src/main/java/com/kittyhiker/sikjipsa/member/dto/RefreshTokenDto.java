package com.kittyhiker.sikjipsa.member.dto;

import lombok.Getter;

import javax.validation.constraints.NotEmpty;

@Getter
public class RefreshTokenDto {
    @NotEmpty
    String refreshToken;
}
