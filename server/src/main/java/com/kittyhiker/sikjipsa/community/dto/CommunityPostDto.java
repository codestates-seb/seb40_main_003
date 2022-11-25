package com.kittyhiker.sikjipsa.community.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityPostDto {
    @NotEmpty
    String title;
    @NotEmpty
    String content;
}
