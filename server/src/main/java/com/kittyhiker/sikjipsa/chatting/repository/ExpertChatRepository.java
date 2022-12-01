package com.kittyhiker.sikjipsa.chatting.repository;


import com.kittyhiker.sikjipsa.chatting.entity.DealChatRoom;
import com.kittyhiker.sikjipsa.chatting.entity.ExpertChatRoom;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExpertChatRepository extends JpaRepository<ExpertChatRoom, Long> {

    Optional<ExpertChatRoom> findByRoomName(String roomName);
}
