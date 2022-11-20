package com.kittyhiker.sikjipsa.community.service;

import com.kittyhiker.sikjipsa.community.dto.CommentResponseDto;
import com.kittyhiker.sikjipsa.community.enitity.Comment;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.community.mapper.CommentMapper;
import com.kittyhiker.sikjipsa.community.repository.CommentRepository;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final CommentMapper mapper;
    private final CommunityService communityService;
    private final MemberService memberService;


    public CommentResponseDto postComment(Long communityId, Long memberId, String content) {
        Community community = communityService.verifiedCommunity(communityId);
        Member member = memberService.verifyMember(memberId);

        Comment newComment = Comment.builder().community(community).member(member)
                .content(content).depth(0).parent(0L).build();
        Comment savedComment = commentRepository.save(newComment);

        return mapper.commentToResponseDto(savedComment);
    }

    public CommentResponseDto postComment(Long communityId, Long memberId, Long commentId, String content) {
        Community community = communityService.verifiedCommunity(communityId);
        Member member = memberService.verifyMember(memberId);

        Comment newComment = Comment.builder().community(community).member(member)
                .content(content).depth(1).parent(commentId).build();
        Comment savedComment = commentRepository.save(newComment);

        return mapper.commentToResponseDto(savedComment);
    }

    public CommentResponseDto patchComment(Long commentId, String content) {
        Comment comment = verifiedComment(commentId);
        comment.modifyComment(content);
        Comment savedComment = commentRepository.save(comment);
        return mapper.commentToResponseDto(savedComment);
    }

    public void deleteComment(Long commentId) {
        Comment comment = verifiedComment(commentId);
        if (comment.getDepth()==0) {
            comment.deleteComment();
        } else {
            commentRepository.delete(comment);
        }
    }

    public Comment verifiedComment(Long commentId) {
        return commentRepository.findById(commentId).orElseThrow(()-> new IllegalArgumentException("NOT FOUND COMMENT"));
    }


}
