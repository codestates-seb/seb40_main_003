package com.kittyhiker.sikjipsa.chatting.controller;

import com.kittyhiker.sikjipsa.chatting.dto.ChatRoomDto;
import com.kittyhiker.sikjipsa.chatting.dto.ChatRoomMessageDto;
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

    @PostMapping("/experts/{expert-id}")
    public ResponseEntity createExpertRoom(@PathVariable("expert-id") Long expertId,
                                  @RequestHeader("Authorization") String token) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        ChatRoomDto expertRoom = chatService.createExpertRoom(userId, expertId);
        return new ResponseEntity(expertRoom, HttpStatus.CREATED);
    }

    @GetMapping("/deal")
    public ResponseEntity getDealChatRoom(@RequestHeader("Authorization") String token) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        List<ChatRoomDto> myDealChatRoom = chatService.getMyDealChatRoom(userId);

        return new ResponseEntity(myDealChatRoom, HttpStatus.OK);
    }

    @GetMapping("/experts")
    public ResponseEntity getExpertChatRoom(@RequestHeader("Authorization") String token) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        List<ChatRoomDto> myExpertChatRoom = chatService.getMyExpertChatRoom(userId);
        return new ResponseEntity(myExpertChatRoom, HttpStatus.OK);
    }

    @GetMapping("/deal/{room-name}")
    public ResponseEntity getDealChatDetail(@PathVariable("room-name") String roomName) {
        List<ChatRoomMessageDto> messageFromRoom = chatService.getMessageFromRoom(roomName);
        return new ResponseEntity(messageFromRoom, HttpStatus.OK);
    }

    @GetMapping("/experts/{room-name}")
    public ResponseEntity getExpertChatDetail(@PathVariable("room-name") String roomName) {
        List<ChatRoomMessageDto> messageFromRoom = chatService.getMessageFromRoom(roomName);
        return new ResponseEntity(messageFromRoom, HttpStatus.OK);
    }

    @DeleteMapping("/chat/{chat-id}")
    public ResponseEntity deleteChatRoom(@PathVariable("chat-id") Long ChatId) {
        // 삭제 추가

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
