package com.kittyhiker.sikjipsa.chatting.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.caring.service.ExpertService;
import com.kittyhiker.sikjipsa.chatting.dto.ChatMessageDto;
import com.kittyhiker.sikjipsa.chatting.dto.ChatRoomDto;
import com.kittyhiker.sikjipsa.chatting.dto.ChatRoomMessageDto;
import com.kittyhiker.sikjipsa.chatting.entity.ChatMessage;
import com.kittyhiker.sikjipsa.chatting.entity.DealChatRoom;
import com.kittyhiker.sikjipsa.chatting.entity.ExpertChatRoom;
import com.kittyhiker.sikjipsa.chatting.mapper.ChatRoomMapper;
import com.kittyhiker.sikjipsa.chatting.repository.DealChatRepository;
import com.kittyhiker.sikjipsa.chatting.repository.ExpertChatRepository;
import com.kittyhiker.sikjipsa.chatting.repository.MessageRepository;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.service.DealService;
import com.kittyhiker.sikjipsa.exception.BusinessLogicException;
import com.kittyhiker.sikjipsa.exception.ExceptionCode;
import com.kittyhiker.sikjipsa.image.service.ImageService;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.mapper.MemberMapper;
import com.kittyhiker.sikjipsa.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class ChatService {

    private final ObjectMapper objectMapper;
    private final ChatRoomMapper chatRoomMapper;
    private final MemberMapper memberMapper;
    private final DealService dealService;
    private final MemberService memberService;
    private final ImageService imageService;
    private final DealChatRepository dealChatRepository;
    private final ExpertChatRepository expertChatRepository;
    private final MessageRepository messageRepository;
    private final ExpertService expertService;


    public ChatRoomDto findDealRoomByName(String roomName) {
        DealChatRoom dealChatRoom = dealChatRepository.findByRoomName(roomName).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.NOT_FOUND_CHATROOM));
        ChatRoomDto chatRoomDto = chatRoomMapper.dealChatToChatRoomDto(dealChatRoom,
                dealChatRoom.getBuyer().getMemberId(),
                dealChatRoom.getSeller().getMemberId(),
                messageRepository.countByRoomNameAndIsRead(roomName, 0L));
        return chatRoomDto;
    }

    public ChatRoomDto findExpertRoomByName(String roomName) {
        ExpertChatRoom expertChatRoom = expertChatRepository.findByRoomName(roomName).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.NOT_FOUND_CHATROOM));
        ChatRoomDto chatRoomDto = chatRoomMapper.expertChatToChatRoomDto(expertChatRoom,
                expertChatRoom.getBuyer().getMemberId(),
                expertChatRoom.getSeller().getMemberId(),
                messageRepository.countByRoomNameAndIsRead(roomName, 0L));
        return chatRoomDto;
    }

    public ChatRoomDto createDealRoom(Long userId, Long dealId) {
        String randomId = UUID.randomUUID().toString();
        Deal deal = dealService.verifiedDeal(dealId);
        Long sellerId = deal.getMember().getMemberId();
        Member member = memberService.verifyMember(userId);
        if (dealChatRepository.existsByDealAndBuyer(deal, member)) {
            DealChatRoom dealChatRoom = dealChatRepository.findByDealAndBuyer(deal, member)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_CHATROOM));
            ChatRoomDto response = chatRoomMapper
                    .dealChatToChatRoomDto(dealChatRoom,
                            dealChatRoom.getBuyer().getMemberId(),
                            dealChatRoom.getSeller().getMemberId(),
                            messageRepository.countByRoomNameAndIsRead(dealChatRoom.getRoomName(), 0L));
            return response;
        } else {
            DealChatRoom newDealChat = DealChatRoom.builder()
                    .roomName(randomId)
                    .deal(deal)
                    .buyer(member)
                    .seller(deal.getMember()).build();

            DealChatRoom savedDealChat = dealChatRepository.save(newDealChat);
            ChatRoomDto chatRoomDto = chatRoomMapper
                    .dealChatToChatRoomDto(savedDealChat, savedDealChat.getBuyer().getMemberId(),sellerId, 0L);
            return chatRoomDto;
        }
    }

    public ChatRoomDto createExpertRoom(Long userId, Long expertId) {
        String randomId = UUID.randomUUID().toString();
        ExpertProfile expertProfile = expertService.findVerifiedExpert(expertId);
        Long sellerId = expertProfile.getMember().getMemberId();
        Member member = memberService.verifyMember(userId);
        if (expertChatRepository.existsByExpertProfileAndBuyer(expertProfile, member)) {
            ExpertChatRoom expertChatRoom = expertChatRepository.findByExpertProfileAndBuyer(expertProfile, member)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_CHATROOM));
            ChatRoomDto response = chatRoomMapper.expertChatToChatRoomDto(expertChatRoom,
                    expertChatRoom.getBuyer().getMemberId(),
                    expertChatRoom.getSeller().getMemberId(),
                    messageRepository.countByRoomNameAndIsRead(expertChatRoom.getRoomName(), 0L));
            return response;
        } else {
            ExpertChatRoom newExpertChat = ExpertChatRoom.builder()
                    .roomName(randomId)
                    .expertProfile(expertProfile)
                    .buyer(member)
                    .seller(expertProfile.getMember()).build();
            ExpertChatRoom savedExpertChat = expertChatRepository.save(newExpertChat);
            ChatRoomDto chatRoomDto = chatRoomMapper.expertChatToChatRoomDto(
                    savedExpertChat, savedExpertChat.getBuyer().getMemberId(), sellerId, 0L);
            return chatRoomDto;
        }
    }


    public List<ChatRoomDto> getMyDealChatRoom(Long userId) {
        Member member = memberService.verifyMember(userId);
        List<DealChatRoom> dealChatRoomList = dealChatRepository.findBySellerOrBuyer(member, member);
        List<ChatRoomDto> response = dealChatRoomList.stream()
                .map(
                        c -> chatRoomMapper.dealChatToChatRoomDto(c, c.getBuyer().getMemberId(),
                                c.getSeller().getMemberId(),
                                messageRepository.countByRoomNameAndIsRead(c.getRoomName(), 0L))
                ).collect(Collectors.toList());
        return response;
    }

    public List<ChatRoomDto> getMyExpertChatRoom(Long userId) {
        Member member = memberService.verifyMember(userId);
        List<ExpertChatRoom> expertChatRoomList = expertChatRepository.findBySellerOrBuyer(member, member);
        List<ChatRoomDto> response = expertChatRoomList.stream().map(
                c -> chatRoomMapper.expertChatToChatRoomDto(c, c.getBuyer().getMemberId(), c.getSeller().getMemberId(),
                        messageRepository.countByRoomNameAndIsRead(c.getRoomName(), 0L))
        ).collect(Collectors.toList());
        return response;
    }

    public List<ChatRoomMessageDto> getMessageFromRoom(String roomName) {

        List<ChatMessage> messages = messageRepository.findByRoomName(roomName);
        List<ChatRoomMessageDto> response = new ArrayList<>();
        messages.stream()
                .forEach( m -> {
                    m.readMessage();
                    Member member = m.getSender();
                    ChatRoomMessageDto mDto = chatRoomMapper.messageToMessageResponse(m,
                            memberMapper.memberToCommunityMemberDto(member,
                                    imageService.findImageByMember(member)));
                    response.add(mDto);
                });
        return response;
    }


    public void sendMessage(WebSocketSession session, ChatMessageDto message) {
        try {
            synchronized (session) {
                session.sendMessage(new TextMessage(objectMapper.writeValueAsString(message)));
            }
        } catch (IOException e) {
            log.error(e.getMessage(), e);
        }
    }

    public void saveMessage(ChatMessageDto message, Long isRead) {
        Member member = memberService.verifyMember(message.getSenderId());
        ChatMessage chatMessage = chatRoomMapper.messageDtoToChatMessage(message, member, isRead);
        messageRepository.save(chatMessage);
    }
}
