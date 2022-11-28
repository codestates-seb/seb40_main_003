package com.kittyhiker.sikjipsa.caring.repository;

import com.kittyhiker.sikjipsa.caring.entity.ExpertReview;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository

public interface ExpertReviewRepository extends JpaRepository<ExpertReview, Long> {
}
