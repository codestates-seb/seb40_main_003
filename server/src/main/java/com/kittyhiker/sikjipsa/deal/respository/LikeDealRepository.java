package com.kittyhiker.sikjipsa.deal.respository;

import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.entity.MemberLikeDeal;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface LikeDealRepository extends JpaRepository<MemberLikeDeal, Long> {

    Page<MemberLikeDeal> findByMember(Member member, Pageable pageable);
    Optional<MemberLikeDeal> findByMemberAndDeal(Member member, Deal deal);
    boolean existsByDealAndMember(Deal deal, Member member);
}
