package com.kittyhiker.sikjipsa.chatting.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.caring.service.ExpertService;
import com.kittyhiker.sikjipsa.chatting.dto.*;
import com.kittyhiker.sikjipsa.chatting.entity.ChatMessage;
import com.kittyhiker.sikjipsa.chatting.entity.DealChatRoom;
import com.kittyhiker.sikjipsa.chatting.entity.ExpertChatRoom;
import com.kittyhiker.sikjipsa.chatting.mapper.ChatRoomMapper;
import com.kittyhiker.sikjipsa.chatting.repository.DealChatRepository;
import com.kittyhiker.sikjipsa.chatting.repository.ExpertChatRepository;
import com.kittyhiker.sikjipsa.chatting.repository.MessageRepository;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.mapper.DealMapper;
import com.kittyhiker.sikjipsa.deal.service.DealService;
import com.kittyhiker.sikjipsa.exception.BusinessLogicException;
import com.kittyhiker.sikjipsa.exception.ExceptionCode;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.image.service.ImageService;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.mapper.MemberMapper;
import com.kittyhiker.sikjipsa.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;

import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
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
        Deal deal = dealChatRoom.getDeal();
        List<Image> image = imageService.findImage(deal);
        List<String> images = image.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
        ChatRoomDto chatRoomDto = chatRoomMapper.dealChatToChatRoomDto(dealChatRoom,
                chatRoomMapper.dealToChatDealInfo(deal, images),
                dealChatRoom.getBuyer().getMemberId(),
                dealChatRoom.getSeller().getMemberId(),
                messageRepository.countByRoomNameAndReceiverIdAndIsRead(roomName,
                        dealChatRoom.getBuyer().getMemberId(),0L));
        return chatRoomDto;
    }

    public ChatRoomDto2 findExpertRoomByName(String roomName) {
        ExpertChatRoom expertChatRoom = expertChatRepository.findByRoomName(roomName).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.NOT_FOUND_CHATROOM));
        ExpertProfile expertProfile = expertChatRoom.getExpertProfile();
        ChatRoomDto2 chatRoomDto = chatRoomMapper.expertChatToChatRoomDto(expertChatRoom,
                chatRoomMapper.expertToChatExpertInfo(expertProfile),
                expertChatRoom.getBuyer().getMemberId(),
                expertChatRoom.getSeller().getMemberId(),
                messageRepository.countByRoomNameAndReceiverIdAndIsRead(roomName,
                        expertChatRoom.getBuyer().getMemberId(), 0L));
        return chatRoomDto;
    }

    public ChatRoomDto createDealRoom(Long userId, Long dealId) {
        String randomId = UUID.randomUUID().toString();
        Deal deal = dealService.verifiedDeal(dealId);
        List<Image> image = imageService.findImage(deal);
        List<String> images = image.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
        Long sellerId = deal.getMember().getMemberId();
        Member member = memberService.verifyMember(userId);
        if (dealChatRepository.existsByDealAndBuyer(deal, member)) {
            DealChatRoom dealChatRoom = dealChatRepository.findByDealAndBuyer(deal, member)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_CHATROOM));
            ChatRoomDto response = chatRoomMapper
                    .dealChatToChatRoomDto(dealChatRoom,
                            chatRoomMapper.dealToChatDealInfo(deal, images),
                            dealChatRoom.getBuyer().getMemberId(),
                            dealChatRoom.getSeller().getMemberId(),
                            messageRepository.countByRoomNameAndReceiverIdAndIsRead(dealChatRoom.getRoomName(),
                                    dealChatRoom.getBuyer().getMemberId(), 0L));
            return response;
        } else {
            DealChatRoom newDealChat = DealChatRoom.builder()
                    .roomName(randomId)
                    .deal(deal)
                    .buyer(member)
                    .seller(deal.getMember()).build();

            DealChatRoom savedDealChat = dealChatRepository.save(newDealChat);
            ChatRoomDto chatRoomDto = chatRoomMapper
                    .dealChatToChatRoomDto(savedDealChat,
                            chatRoomMapper.dealToChatDealInfo(deal, images),
                            savedDealChat.getBuyer().getMemberId(),sellerId, 0L);
            return chatRoomDto;
        }
    }

    public ChatRoomDto2 createExpertRoom(Long userId, Long expertId) {
        String randomId = UUID.randomUUID().toString();
        ExpertProfile expertProfile = expertService.findVerifiedExpert(expertId);
        Long sellerId = expertProfile.getMember().getMemberId();
        Member member = memberService.verifyMember(userId);
        if (expertChatRepository.existsByExpertProfileAndBuyer(expertProfile, member)) {
            ExpertChatRoom expertChatRoom = expertChatRepository.findByExpertProfileAndBuyer(expertProfile, member)
                    .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_CHATROOM));
            expertChatRoom.updateState(); // TODO
            ChatRoomDto2 response = chatRoomMapper.expertChatToChatRoomDto(expertChatRoom,
                    chatRoomMapper.expertToChatExpertInfo(expertProfile),
                    expertChatRoom.getBuyer().getMemberId(),
                    expertChatRoom.getSeller().getMemberId(),
                    messageRepository.countByRoomNameAndReceiverIdAndIsRead(expertChatRoom.getRoomName(),
                            userId,0L));
            return response;
        } else {
            ExpertChatRoom newExpertChat = ExpertChatRoom.builder()
                    .roomName(randomId)
                    .expertProfile(expertProfile)
                    .buyer(member)
                    .seller(expertProfile.getMember()).build();
            ExpertChatRoom savedExpertChat = expertChatRepository.save(newExpertChat);
            ChatRoomDto2 chatRoomDto = chatRoomMapper.expertChatToChatRoomDto(
                    savedExpertChat, chatRoomMapper.expertToChatExpertInfo(expertProfile),
                    savedExpertChat.getBuyer().getMemberId(), sellerId, 0L);
            return chatRoomDto;
        }
    }


    public List<ChatRoomDto> getMyDealChatRoom(Long userId) {
        Member member = memberService.verifyMember(userId);
        List<DealChatRoom> dealChatRoomList = dealChatRepository.findBySellerOrBuyer(member, member);
        List<ChatRoomDto> response = dealChatRoomList.stream()
                .map(
                        c -> chatRoomMapper.dealChatToChatRoomDto(c,
                                chatRoomMapper.dealToChatDealInfo(c.getDeal(),
                                        imageService.findImage(c.getDeal()).stream().map(
                                                i -> i.getImgUrl()
                                        ).collect(Collectors.toList())),
                                c.getBuyer().getMemberId(),
                                c.getSeller().getMemberId(),
                                messageRepository.countByRoomNameAndReceiverIdAndIsRead(c.getRoomName(), userId,0L))
                ).collect(Collectors.toList());
        return response;
    }

    public List<ChatRoomDto2> getMyExpertChatRoom(Long userId) {
        Member member = memberService.verifyMember(userId);
        List<ExpertChatRoom> expertChatRoomList = expertChatRepository.findBySellerOrBuyer(member, member);
        List<ChatRoomDto2> response = expertChatRoomList.stream().map(
                c -> chatRoomMapper.expertChatToChatRoomDto(c,
                        chatRoomMapper.expertToChatExpertInfo(c.getExpertProfile()),
                        c.getBuyer().getMemberId(),
                        c.getSeller().getMemberId(),
                        messageRepository.countByRoomNameAndReceiverIdAndIsRead(c.getRoomName(), userId,0L))
        ).collect(Collectors.toList());
        return response;
    }


    public ExpertChatMessageDto getMessageFromExpertRoom(String roomName) {
        ChatRoomDto2 expertRoom = findExpertRoomByName(roomName);
        ChatExpertInfo expertInfo = expertRoom.getExpertInfo();
        List<MessageResponseDto> messages = getMessageFromRoomName(roomName);
        ExpertChatMessageDto expertChatMessageDto = chatRoomMapper.messageToExpertMessageDto(messages, expertInfo);
        return expertChatMessageDto;
    }

    public DealChatMessageDto getMessageFromDealRoom(String roomName) {
        ChatRoomDto dealRoom = findDealRoomByName(roomName);
        ChatDealInfo dealInfo = dealRoom.getDealInfo();
        List<MessageResponseDto> messages = getMessageFromRoomName(roomName);
        DealChatMessageDto dealChatMessageDto = chatRoomMapper.messageToDealMessageDto(messages, dealInfo);
        return dealChatMessageDto;
    }

    public List<MessageResponseDto> getMessageFromRoomName(String roomName) {
        List<ChatMessage> messages = messageRepository.findByRoomName(roomName);
        List<MessageResponseDto> response = new ArrayList<>();
        messages.stream()
                .forEach(
                        m -> {
                            m.readMessage();
                            ChatMessage savedMessage = messageRepository.save(m);
                            Member sender = savedMessage.getSender();
                            MessageResponseDto mDto = chatRoomMapper.messageToMessageResponseDto(savedMessage,
                                    memberMapper.memberToCommunityMemberDto(sender,
                                            imageService.findImageByMember(sender)));
                            response.add(mDto);
                        }
                );
        return response;
    }

    public List<ExpertChatMessageDto> getExpertMessageFromRoom(String roomName, ChatExpertInfo chatExpertInfo) {
        List<ChatMessage> messages = messageRepository.findByRoomName(roomName);
        List<ExpertChatMessageDto> response = new ArrayList<>();
        messages.stream()
                .forEach( m -> {
                    m.readMessage();
                    ChatMessage savedMessage = messageRepository.save(m);
                    Member member = savedMessage.getSender();
                    ExpertChatMessageDto mDto = chatRoomMapper.messageToExpertMessageDto(savedMessage,
                            memberMapper.memberToCommunityMemberDto(member,
                                    imageService.findImageByMember(member)), chatExpertInfo);
                    response.add(mDto);
                });
        return response;
    }

    public List<DealChatMessageDto> getDealMessageFromRoom(String roomName, ChatDealInfo dealInfo) {
        List<ChatMessage> messages = messageRepository.findByRoomName(roomName);
        List<DealChatMessageDto> response = new ArrayList<>();
        messages.stream()
                .forEach( m -> {
                    m.readMessage();
                    ChatMessage savedMessage = messageRepository.save(m);
                    Member member = savedMessage.getSender();
                    DealChatMessageDto mDto = chatRoomMapper.messageToDealMessageDto(savedMessage,
                            memberMapper.memberToCommunityMemberDto(member,
                                    imageService.findImageByMember(member)), dealInfo);
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

    public void saveDealMessage(ChatMessageDto message, Long isRead) {
        Member member = memberService.verifyMember(message.getSenderId());
        ChatRoomDto dealRoomByName = findDealRoomByName(message.getRoomName());
        Long receiverId;
        if (dealRoomByName.getBuyerId()==member.getMemberId()) receiverId= dealRoomByName.getSellerId();
        else receiverId=dealRoomByName.getBuyerId();
        ChatMessage chatMessage = chatRoomMapper.messageDtoToChatMessage(message, member, receiverId, isRead);
        messageRepository.save(chatMessage);
    }

    public void saveExpertMessage(ChatMessageDto message, Long isRead) {
        Member member = memberService.verifyMember(message.getSenderId());
        ChatRoomDto2 expertRoomByName = findExpertRoomByName(message.getRoomName());
        Long receiverId;
        if (expertRoomByName.getBuyerId()==member.getMemberId()) receiverId= expertRoomByName.getSellerId();
        else receiverId=expertRoomByName.getBuyerId();
        ChatMessage chatMessage = chatRoomMapper.messageDtoToChatMessage(message, member, receiverId, isRead);
        messageRepository.save(chatMessage);
    }
}
