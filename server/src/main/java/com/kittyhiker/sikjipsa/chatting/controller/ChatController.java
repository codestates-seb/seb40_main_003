package com.kittyhiker.sikjipsa.chatting.controller;

import com.kittyhiker.sikjipsa.chatting.dto.ChatRoomDto;
import com.kittyhiker.sikjipsa.chatting.service.ChatService;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping("/deal/{deal-id}")
    public ChatRoomDto createDealRoom(@PathVariable("deal-id") Long dealId,
                                  @RequestHeader("Authorization") String token) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        return chatService.createDealRoom(userId, dealId);
    }

    @PostMapping("/expert/{expert-id}")
    public ChatRoomDto createExpertRoom(@PathVariable("expert-id") Long expertId,
                                  @RequestHeader("Authorization") String token) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        return chatService.createExpertRoom(userId, expertId);
    }

    @GetMapping
    public List<ChatRoomDto> findAllRoom() {
        return chatService.findAllRoom();
    }
}
