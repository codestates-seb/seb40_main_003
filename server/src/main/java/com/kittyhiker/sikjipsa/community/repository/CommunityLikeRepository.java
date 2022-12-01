package com.kittyhiker.sikjipsa.community.repository;

import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.community.enitity.CommunityLike;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CommunityLikeRepository extends JpaRepository<CommunityLike, Long> {

    Optional<CommunityLike> findByMemberAndCommunity(Member member, Community community);
}
