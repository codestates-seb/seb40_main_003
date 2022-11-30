package com.kittyhiker.sikjipsa.chatting.mapper;

import com.kittyhiker.sikjipsa.chatting.dto.ChatMessageDto;
import com.kittyhiker.sikjipsa.chatting.dto.ChatRoomDto;
import com.kittyhiker.sikjipsa.chatting.entity.ChatMessage;
import com.kittyhiker.sikjipsa.chatting.entity.ChatRoom;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChatRoomMapper {

    ChatRoomDto chatRoomToChatRoomDto(ChatRoom chatRoom);

    ChatMessage messageDtoToChatMessage(ChatMessageDto messageDto, Member sender);
}
