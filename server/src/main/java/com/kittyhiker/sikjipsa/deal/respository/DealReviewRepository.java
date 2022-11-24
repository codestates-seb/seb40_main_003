package com.kittyhiker.sikjipsa.deal.respository;

import com.kittyhiker.sikjipsa.deal.entity.MemberReview;
import org.springframework.data.jpa.repository.JpaRepository;

public interface DealReviewRepository extends JpaRepository<MemberReview, Long> {
}
