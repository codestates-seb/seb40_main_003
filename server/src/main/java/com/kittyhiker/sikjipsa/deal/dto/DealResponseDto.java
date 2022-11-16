package com.kittyhiker.sikjipsa.deal.dto;

import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DealResponseDto {

    Long dealId;
    String title;
    String content;
    int view;
    int price;
    LocalDateTime createdAt;
    LocalDateTime modifiedAt;
    int category;
    int state;
    int memberLikeDeal;

//    Map<String, Object> image;
//    Map<String, Object> areaTag;
//    Member member;
}
