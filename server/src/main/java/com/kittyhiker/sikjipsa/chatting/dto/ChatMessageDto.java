package com.kittyhiker.sikjipsa.chatting.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@Builder
public class ChatMessageDto {
    public enum MessageType {
        ENTER, TALK
    }

    private MessageType type;
    private Long roomId;
    private Long senderId;
    private String senderNickname;
    private String message;
}
