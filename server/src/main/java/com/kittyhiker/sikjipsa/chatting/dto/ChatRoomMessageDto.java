package com.kittyhiker.sikjipsa.chatting.dto;

import com.kittyhiker.sikjipsa.community.dto.CommentResponseDto;
import com.kittyhiker.sikjipsa.member.dto.CommunityMemberResponse;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ChatRoomMessageDto {

    private Long messageId;
    private String message;
    private CommunityMemberResponse messageSender;
}
