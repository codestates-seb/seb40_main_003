package com.kittyhiker.sikjipsa.chatting.repository;

import com.kittyhiker.sikjipsa.chatting.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepository extends JpaRepository<ChatMessage, Long> {

    List<ChatMessage> findByRoomName(String roomName);
    Long countByRoomNameAndReceiverIdAndIsRead(String roomName, Long receiverId, Long isRead);
    Long countByReceiverIdAndIsRead(Long receiverId, Long isRead);
}
