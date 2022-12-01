package com.kittyhiker.sikjipsa.chatting.repository;

import com.kittyhiker.sikjipsa.chatting.entity.ChatRoom;
import com.kittyhiker.sikjipsa.chatting.entity.DealChatRoom;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DealChatRepository extends JpaRepository<DealChatRoom, Long> {

    boolean existsByDealAndBuyer(Deal deal, Member buyer);
    Optional<DealChatRoom> findByDealAndBuyer(Deal deal, Member buyer);
    Optional<DealChatRoom> findByRoomName(String roomName);
    List<DealChatRoom> findBySellerOrBuyer(Member Seller, Member Buyer);
}
