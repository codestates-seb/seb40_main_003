package com.kittyhiker.sikjipsa.deal.respository;

import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.entity.MemberLikeDeal;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;


public interface DealRepository extends JpaRepository<Deal, Long> {

    Page<Deal> findByTitleContaining(String keyword, Pageable pageable);
    Deal findByMemberLikeDeals(MemberLikeDeal memberLikeDeal);
}
