package com.kittyhiker.sikjipsa.deal.respository;

import com.kittyhiker.sikjipsa.deal.entity.MemberLikeDeal;
import org.springframework.data.jpa.repository.JpaRepository;

public interface LikeDealRepository extends JpaRepository<MemberLikeDeal, Long> {
}
