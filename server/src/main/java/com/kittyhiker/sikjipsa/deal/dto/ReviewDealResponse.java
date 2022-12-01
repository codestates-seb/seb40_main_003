package com.kittyhiker.sikjipsa.deal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReviewDealResponse {
    Long dealId;
    String title;
    String content;
    List<String> images;
    int view;
    int price;
    LocalDateTime createdAt;
    LocalDateTime modifiedAt;
    int category;
    int area;
    int state;
    int likeNum;
}
