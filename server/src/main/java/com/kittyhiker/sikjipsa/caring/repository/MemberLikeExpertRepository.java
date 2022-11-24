package com.kittyhiker.sikjipsa.caring.repository;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.caring.entity.MemberLikeExpert;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberLikeExpertRepository extends JpaRepository<MemberLikeExpert, Long> {
	Optional<MemberLikeExpert> findByMemberAndExpertProfile(Member member, ExpertProfile expertProfile);

}