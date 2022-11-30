package com.kittyhiker.sikjipsa.chatting.repository;

import com.kittyhiker.sikjipsa.chatting.entity.ChatRoom;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ChatRoomRepository extends JpaRepository<ChatRoom, Long> {

    boolean existsByDealAndSender(Deal deal, Member sender);
    Optional<ChatRoom> findByDealAndSender(Deal deal, Member sender);
    Optional<ChatRoom> findByRoomName(String roomName);
}
