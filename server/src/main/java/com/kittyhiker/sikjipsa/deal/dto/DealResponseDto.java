package com.kittyhiker.sikjipsa.deal.dto;

import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Map;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DealResponseDto {

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
    int likes;
    MemberResponseDto memberResponse;

//    Map<String, Object> image;
//    Map<String, Object> areaTag;
//    Member member;
}
