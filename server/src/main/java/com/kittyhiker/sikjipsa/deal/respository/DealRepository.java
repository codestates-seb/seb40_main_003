package com.kittyhiker.sikjipsa.deal.respository;

import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface DealRepository extends JpaRepository<Deal, Long> {

    Page<Deal> findByTitleContaining(String keyword, Pageable pageable);
    List<Deal> findByMember(Member seller);
}
