package com.kittyhiker.sikjipsa.chatting.dto;

import com.kittyhiker.sikjipsa.chatting.service.ChatService;
import lombok.Builder;
import lombok.Getter;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
public class ChatRoomDto {

    private Long roomId;
    private String roomName;
    private Set<WebSocketSession> sessions = new HashSet<>();

    @Builder
    public ChatRoomDto(Long roomId, String roomName) {
        this.roomId = roomId;
        this.roomName = roomName;
    }

    public void handlerActions(WebSocketSession session, ChatMessageDto chatMessage, ChatService chatService) {
        if (chatMessage.getType().equals(ChatMessageDto.MessageType.ENTER)) {
            sessions.add(session);
            chatMessage.setMessage(chatMessage.getSenderNickname() +"님이 입장했습니다.");
        }
        sendMessage(chatMessage, chatService);
    }

    public <T> void sendMessage(T message, ChatService chatService) {
        sessions.parallelStream()
                .forEach(session -> chatService.sendMessage(session, message));
    }
}
