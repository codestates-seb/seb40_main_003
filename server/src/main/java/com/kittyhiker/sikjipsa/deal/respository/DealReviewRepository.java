package com.kittyhiker.sikjipsa.deal.respository;

import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.entity.DealReview;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface DealReviewRepository extends JpaRepository<DealReview, Long> {

    List<DealReview> findBySeller(Member seller);
    Optional<DealReview> findByDealAndBuyer(Deal deal, Member buyer);
}
