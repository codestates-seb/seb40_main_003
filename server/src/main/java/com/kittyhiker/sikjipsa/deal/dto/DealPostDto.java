package com.kittyhiker.sikjipsa.deal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotEmpty;
import javax.validation.constraints.NotNull;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DealPostDto {

    @NotEmpty
    String title;
    @NotEmpty
    String content;
    @NotNull
    int price;
    @NotNull
    int category;
    @NotNull
    int area;

}
