package com.kittyhiker.sikjipsa.community.service;

import com.kittyhiker.sikjipsa.community.dto.CommentResponseDto;
import com.kittyhiker.sikjipsa.community.enitity.Comment;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.community.mapper.CommentMapper;
import com.kittyhiker.sikjipsa.community.repository.CommentRepository;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.mapper.MemberMapper;
import com.kittyhiker.sikjipsa.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final CommentMapper mapper;
    private final MemberMapper memberMapper;
    private final CommunityService communityService;
    private final MemberService memberService;


    public CommentResponseDto postComment(Long communityId, Long memberId, String content) {
        Community community = communityService.verifiedCommunity(communityId);
        Member member = memberService.verifyMember(memberId);

        Comment newComment = Comment.builder().community(community).member(member)
                .content(content).depth(0).parent(0L).build();
        Comment savedComment = commentRepository.save(newComment);

        return mapper.commentToResponseDto(savedComment,
                memberMapper.memberToMemberResponseDto(member, member.getImage().getImgUrl()));
    }

    public CommentResponseDto postComment(Long communityId, Long memberId, Long commentId, String content) {
        Community community = communityService.verifiedCommunity(communityId);
        Member member = memberService.verifyMember(memberId);

        Comment newComment = Comment.builder().community(community).member(member)
                .content(content).depth(1).parent(commentId).build();
        Comment savedComment = commentRepository.save(newComment);

        return mapper.commentToResponseDto(savedComment,
                memberMapper.memberToMemberResponseDto(member, member.getImage().getImgUrl()));
    }

    public CommentResponseDto patchComment(Long commentId, String content) {
        Comment comment = verifiedComment(commentId);
        comment.modifyComment(content);
        Comment savedComment = commentRepository.save(comment);
        return mapper.commentToResponseDto(savedComment,
                memberMapper.memberToMemberResponseDto(savedComment.getMember(),
                        savedComment.getMember().getImage().getImgUrl()));
    }

    public void deleteComment(Long commentId) {
        Comment comment = verifiedComment(commentId);
        if (comment.getDepth()==0) {
            comment.deleteComment();
        } else {
            commentRepository.delete(comment);
        }
    }

    public List<CommentResponseDto> getComments(Long communityId) {
        Community community = communityService.verifiedCommunity(communityId);
        List<Comment> commentList = commentRepository.findAllByCommunity(community);
        List<CommentResponseDto> comments = commentList.stream().map(
                c -> mapper.commentToResponseDto(c,
                            memberMapper.memberToMemberResponseDto(c.getMember(), c.getMember().getImage().getImgUrl()))
        ).collect(Collectors.toList());
        return comments;
    }

    public Comment verifiedComment(Long commentId) {
        return commentRepository.findById(commentId).orElseThrow(()-> new IllegalArgumentException("NOT FOUND COMMENT"));
    }

}
