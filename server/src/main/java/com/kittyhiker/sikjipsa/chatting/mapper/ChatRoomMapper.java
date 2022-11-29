package com.kittyhiker.sikjipsa.chatting.mapper;

import com.kittyhiker.sikjipsa.chatting.dto.ChatRoomDto;
import com.kittyhiker.sikjipsa.chatting.entity.ChatRoom;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ChatRoomMapper {

    ChatRoomDto chatRoomToChatRoomDto(ChatRoom chatRoom);
}
