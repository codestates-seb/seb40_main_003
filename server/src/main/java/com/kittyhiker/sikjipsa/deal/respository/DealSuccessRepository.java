package com.kittyhiker.sikjipsa.deal.respository;

import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.entity.DealSuccess;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface DealSuccessRepository extends JpaRepository<DealSuccess, Long> {
    Optional<DealSuccess> findByDealAndBuyer(Deal deal, Member buyer);
}
