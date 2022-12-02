package com.kittyhiker.sikjipsa.chatting.dto;

import com.kittyhiker.sikjipsa.chatting.service.ChatService;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.socket.WebSocketSession;

import java.util.HashSet;
import java.util.Set;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ChatRoomDto {

    private Long roomId;
    private String roomName;
    private Long sellerId;
    private Long buyerId;

    private Long notReadNum;

    private ChatDealInfo dealInfo;
}
