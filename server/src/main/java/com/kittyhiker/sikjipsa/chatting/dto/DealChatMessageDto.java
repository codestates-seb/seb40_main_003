package com.kittyhiker.sikjipsa.chatting.dto;

import com.kittyhiker.sikjipsa.member.dto.CommunityMemberResponse;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DealChatMessageDto {

    private List<MessageResponseDto> messageInfo;
    private ChatDealInfo chatDealInfo;
}
