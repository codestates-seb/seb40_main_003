package com.kittyhiker.sikjipsa.chatting.repository;

import com.kittyhiker.sikjipsa.chatting.entity.ChatMessage;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MessageRepository extends JpaRepository<ChatMessage, Long> {
}
