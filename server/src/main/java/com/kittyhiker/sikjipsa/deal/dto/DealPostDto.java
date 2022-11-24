package com.kittyhiker.sikjipsa.deal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DealPostDto {

    String title;
    String content;
    int price;
    int category;
    int area;

}
