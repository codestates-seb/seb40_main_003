package com.kittyhiker.sikjipsa.chatting.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kittyhiker.sikjipsa.chatting.dto.ChatRoomDto;
import com.kittyhiker.sikjipsa.chatting.entity.ChatRoom;
import com.kittyhiker.sikjipsa.chatting.mapper.ChatRoomMapper;
import com.kittyhiker.sikjipsa.chatting.repository.ChatRoomRepository;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.service.DealService;
import com.kittyhiker.sikjipsa.exception.BusinessLogicException;
import com.kittyhiker.sikjipsa.exception.ExceptionCode;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import javax.annotation.PostConstruct;
import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final ObjectMapper objectMapper;
    private final ChatRoomMapper chatRoomMapper;
    private final DealService dealService;
    private final MemberService memberService;
    private final ChatRoomRepository chatRoomRepository;
    private Map<String, ChatRoomDto> chatRooms;

    @PostConstruct
    private void init() {
        chatRooms = new LinkedHashMap<>();
    }

    public List<ChatRoomDto> findAllRoom() {
        return new ArrayList<>(chatRooms.values());
    }

    public ChatRoomDto findRoomById(String roomId) {
        return chatRooms.get(roomId);
    }

    public ChatRoomDto createDealRoom(Long userId, Long dealId) {
        String randomId = UUID.randomUUID().toString();
        Deal deal = dealService.verifiedDeal(dealId);
        Member member = memberService.verifyMember(userId);
        if (chatRoomRepository.existsByDealAndSender(deal, member)) {
            ChatRoom findChatRoom = chatRoomRepository.findByDealAndSender(deal, member)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_CHATROOM));
            ChatRoomDto response = chatRoomMapper.chatRoomToChatRoomDto(findChatRoom);
            return response;
        } else {
            ChatRoom chatRoom = ChatRoom.builder()
                    .roomName(randomId)
                    .deal(deal)
                    .sender(member).build();

            ChatRoom savedChatRoom = chatRoomRepository.save(chatRoom);
            ChatRoomDto chatRoomDto = chatRoomMapper.chatRoomToChatRoomDto(savedChatRoom);
            chatRooms.put(randomId, chatRoomDto);
            return chatRoomDto;
        }
    }

    public ChatRoomDto createExpertRoom(Long userId, Long expertId) {
        String randomId = UUID.randomUUID().toString();
        ChatRoomDto chatRoom = ChatRoomDto.builder().build();
//        chatRooms.put(randomId, chatRoom);
        return chatRoom;
    }

    public <T> void sendMessage(WebSocketSession session, T message) {
        try {
            session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }
}
