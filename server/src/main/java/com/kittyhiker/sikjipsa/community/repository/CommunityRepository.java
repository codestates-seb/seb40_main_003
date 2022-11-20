package com.kittyhiker.sikjipsa.community.repository;

import com.kittyhiker.sikjipsa.community.enitity.Community;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommunityRepository extends JpaRepository<Community, Long> {

    Page<Community> findByTitleContaining(String keyword, Pageable pageable);
}
