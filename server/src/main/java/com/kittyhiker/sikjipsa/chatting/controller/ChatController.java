package com.kittyhiker.sikjipsa.chatting.controller;

import com.kittyhiker.sikjipsa.chatting.dto.ChatRoomDto;
import com.kittyhiker.sikjipsa.chatting.service.ChatService;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/chat")
public class ChatController {

    private final ChatService chatService;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping("/deal/{deal-id}")
    public ResponseEntity createDealRoom(@PathVariable("deal-id") Long dealId,
                                         @RequestHeader("Authorization") String token) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        ChatRoomDto dealRoom = chatService.createDealRoom(userId, dealId);
        return new ResponseEntity(dealRoom, HttpStatus.CREATED);
    }

    @PostMapping("/expert/{expert-id}")
    public ResponseEntity createExpertRoom(@PathVariable("expert-id") Long expertId,
                                  @RequestHeader("Authorization") String token) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        ChatRoomDto expertRoom = chatService.createExpertRoom(userId, expertId);
        return new ResponseEntity(expertRoom, HttpStatus.CREATED);
    }

    @GetMapping
    public List<ChatRoomDto> findAllRoom() {
        return chatService.findAllRoom();
    }

    @DeleteMapping("/chat/{chat-id}")
    public ResponseEntity deleteChatRoom(@PathVariable("chat-id") Long ChatId) {
        // 삭제 추가

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
