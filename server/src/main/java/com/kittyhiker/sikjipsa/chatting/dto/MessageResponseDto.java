package com.kittyhiker.sikjipsa.chatting.dto;

import com.kittyhiker.sikjipsa.member.dto.CommunityMemberResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class MessageResponseDto {

    private Long messageId;
    private String message;
    private CommunityMemberResponse messageSender;
}
