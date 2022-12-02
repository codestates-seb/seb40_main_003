package com.kittyhiker.sikjipsa.chatting.mapper;

import com.kittyhiker.sikjipsa.chatting.dto.ChatDealInfo;
import com.kittyhiker.sikjipsa.chatting.dto.ChatMessageDto;
import com.kittyhiker.sikjipsa.chatting.dto.ChatRoomDto;
import com.kittyhiker.sikjipsa.chatting.dto.ChatRoomMessageDto;
import com.kittyhiker.sikjipsa.chatting.entity.ChatMessage;
import com.kittyhiker.sikjipsa.chatting.entity.DealChatRoom;
import com.kittyhiker.sikjipsa.chatting.entity.ExpertChatRoom;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.member.dto.CommunityMemberResponse;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ChatRoomMapper {

    ChatDealInfo dealToChatDealInfo(Deal deal, List<String> images);

    ChatRoomDto dealChatToChatRoomDto(DealChatRoom dealChatRoom,
                                      ChatDealInfo dealInfo, Long buyerId, Long sellerId, Long notReadNum);
    ChatRoomDto expertChatToChatRoomDto(ExpertChatRoom expertChatRoom, Long buyerId, Long sellerId, Long notReadNum);
    ChatMessage messageDtoToChatMessage(ChatMessageDto messageDto, Member sender, Long receiverId, Long isRead);
    ChatRoomMessageDto messageToMessageResponse(ChatMessage message, CommunityMemberResponse messageSender);
}
