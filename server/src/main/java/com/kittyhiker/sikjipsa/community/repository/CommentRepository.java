package com.kittyhiker.sikjipsa.community.repository;

import com.kittyhiker.sikjipsa.community.enitity.Comment;
import org.springframework.data.jpa.repository.JpaRepository;

public interface CommentRepository extends JpaRepository<Comment, Long> {
}
