package com.kittyhiker.sikjipsa.chatting.mapper;

import com.kittyhiker.sikjipsa.chatting.dto.ChatMessageDto;
import com.kittyhiker.sikjipsa.chatting.dto.ChatRoomDto;
import com.kittyhiker.sikjipsa.chatting.dto.ChatRoomMessageDto;
import com.kittyhiker.sikjipsa.chatting.entity.ChatMessage;
import com.kittyhiker.sikjipsa.chatting.entity.DealChatRoom;
import com.kittyhiker.sikjipsa.chatting.entity.ExpertChatRoom;
import com.kittyhiker.sikjipsa.member.dto.CommunityMemberResponse;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChatRoomMapper {

    ChatRoomDto dealChatToChatRoomDto(DealChatRoom dealChatRoom, Long buyerId, Long sellerId, Long notReadNum);
    ChatRoomDto expertChatToChatRoomDto(ExpertChatRoom expertChatRoom, Long buyerId, Long sellerId, Long notReadNum);
    ChatMessage messageDtoToChatMessage(ChatMessageDto messageDto, Member sender, Long isRead);
    ChatRoomMessageDto messageToMessageResponse(ChatMessage message, CommunityMemberResponse messageSender);
}
