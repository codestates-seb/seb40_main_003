package com.kittyhiker.sikjipsa.community.repository;

import com.kittyhiker.sikjipsa.community.enitity.Comment;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    List<Comment> findAllByCommunity(Community community);
}
