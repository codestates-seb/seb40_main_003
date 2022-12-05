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
public class ExpertChatMessageDto {

    private List<MessageResponseDto> messageInfo;
    private ChatExpertInfo chatExpertInfo;
}
