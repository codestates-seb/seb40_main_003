package com.kittyhiker.sikjipsa.chatting.dto;

import com.kittyhiker.sikjipsa.member.dto.CommunityMemberResponse;
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
public class ChatDealInfo {

    Long dealId;
    String title;
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
