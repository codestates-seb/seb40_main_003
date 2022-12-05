package com.kittyhiker.sikjipsa.chatting.mapper;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.chatting.dto.*;
import com.kittyhiker.sikjipsa.chatting.entity.ChatMessage;
import com.kittyhiker.sikjipsa.chatting.entity.DealChatRoom;
import com.kittyhiker.sikjipsa.chatting.entity.ExpertChatRoom;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.member.dto.CommunityMemberResponse;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChatRoomMapper {

    ChatDealInfo dealToChatDealInfo(Deal deal, List<String> images);

    ChatExpertInfo expertToChatExpertInfo(ExpertProfile expertProfile);

    ChatRoomDto dealChatToChatRoomDto(DealChatRoom dealChatRoom,
                                      ChatDealInfo dealInfo, Long buyerId, Long sellerId, Long notReadNum);
    ChatRoomDto2 expertChatToChatRoomDto(ExpertChatRoom expertChatRoom, ChatExpertInfo expertInfo,
                                         Long buyerId, Long sellerId, Long notReadNum);

    ChatMessage messageDtoToChatMessage(ChatMessageDto messageDto, Member sender, Long receiverId, Long isRead);
    DealChatMessageDto messageToDealMessageDto(List<MessageResponseDto> messageInfo, ChatDealInfo chatDealInfo);
    ExpertChatMessageDto messageToExpertMessageDto(List<MessageResponseDto> messageInfo, ChatExpertInfo chatExpertInfo);
    MessageResponseDto messageToMessageResponseDto(ChatMessage message, CommunityMemberResponse messageSender);

    DealChatMessageDto messageToDealMessageDto(ChatMessage message, CommunityMemberResponse messageSender,
                                                ChatDealInfo chatDealInfo);
    ExpertChatMessageDto messageToExpertMessageDto(ChatMessage message, CommunityMemberResponse messageSender,
                                               ChatExpertInfo chatExpertInfo);
}
