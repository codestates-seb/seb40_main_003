package com.kittyhiker.sikjipsa.member.repository;

import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.entity.MemberInformation;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberInfoRepository extends JpaRepository<MemberInformation, Long> {
	Optional<MemberInformation> findByMember(Member member);
}
