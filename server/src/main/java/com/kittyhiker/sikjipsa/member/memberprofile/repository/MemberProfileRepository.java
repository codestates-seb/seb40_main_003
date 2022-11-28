package com.kittyhiker.sikjipsa.member.memberprofile.repository;

import com.kittyhiker.sikjipsa.member.entity.MemberProfile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface MemberProfileRepository extends JpaRepository<MemberProfile, Long> {
}
