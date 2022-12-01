package com.kittyhiker.sikjipsa.chatting.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder
public class ChatMessageDto {
    public enum MessageType {
        DEAL_CHAT, EXPERT_CHAT
    }

    private MessageType type;
    private Long roomId;
    private String roomName;
    private Long senderId;
    private String senderNickname;
    private String message;
}
