package com.kittyhiker.sikjipsa.caring.repository;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.caring.entity.ExpertSuccess;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ExpertSuccessRepository extends JpaRepository<ExpertSuccess, Long> {
	Optional<ExpertSuccess> findByExpertProfileAndBuyer(ExpertProfile expertProfile, Member member);
}
