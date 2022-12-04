package com.kittyhiker.sikjipsa.community.service;

import com.kittyhiker.sikjipsa.community.dto.CommentResponseDto;
import com.kittyhiker.sikjipsa.community.enitity.Comment;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.community.mapper.CommentMapper;
import com.kittyhiker.sikjipsa.community.repository.CommentRepository;
import com.kittyhiker.sikjipsa.community.repository.CommunityRepository;
import com.kittyhiker.sikjipsa.exception.BusinessLogicException;
import com.kittyhiker.sikjipsa.exception.ExceptionCode;
import com.kittyhiker.sikjipsa.image.service.ImageService;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.mapper.MemberMapper;
import com.kittyhiker.sikjipsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommentService {

    private final CommentRepository commentRepository;
    private final ImageService imageService;
    private final CommentMapper mapper;
    private final MemberMapper memberMapper;
    private final CommunityRepository communityRepository;
    private final MemberRepository memberRepository;

    public CommentResponseDto postComment(Long communityId, Long memberId, String content) {
        Community community = verifiedCommunity(communityId);
        Member member = verifiedMember(memberId);

        Comment newComment = Comment.builder().community(community).member(member)
                .content(content).depth(0).parent(0L).build();
        Comment savedComment = commentRepository.save(newComment);

        return mapper.commentToResponseDto(savedComment,
                memberMapper.memberToCommunityMemberDto(member, imageService.findImageByMember(member)));
    }

    public CommentResponseDto postComment(Long communityId, Long memberId, Long commentId, String content) {
        Community community = verifiedCommunity(communityId);
        Member member = verifiedMember(memberId);

        Comment newComment = Comment.builder().community(community).member(member)
                .content(content).depth(1).parent(commentId).build();
        Comment savedComment = commentRepository.save(newComment);

        return mapper.commentToResponseDto(savedComment,
                memberMapper.memberToCommunityMemberDto(member, imageService.findImageByMember(member)));
    }

    public CommentResponseDto patchComment(Long commentId, String content) {
        Comment comment = verifiedComment(commentId);
        comment.modifyComment(content);
        Comment savedComment = commentRepository.save(comment);

        return mapper.commentToResponseDto(savedComment,
                memberMapper.memberToCommunityMemberDto(savedComment.getMember(),
                        imageService.findImageByMember(savedComment.getMember())));
    }

    public void deleteComment(Long commentId) {
        Comment comment = verifiedComment(commentId);

        if (comment.getDepth()==0) {
            //최상위 댓글
            if (commentRepository.existsByParent(commentId)) {
                //대댓글 존재
                comment.deleteComment();
                commentRepository.save(comment);
            } else {
                commentRepository.delete(comment);
            }
        } else {
            //대댓글
            commentRepository.delete(comment);
            Long parentId = comment.getParent();
            Comment parentComment = verifiedComment(parentId);
            if (parentComment.getIsDeleted()==1 && !commentRepository.existsByParent(parentId)) {
                //대댓글 부모 지워진 상태
                commentRepository.delete(parentComment);
            }
        }
    }

    public void sudoDeleteComment(Long commentId) {
        Comment comment = verifiedComment(commentId);
        commentRepository.delete(comment);
    }

    public List<CommentResponseDto> getComments(Community community) {
        List<Comment> commentList = commentRepository.findAllByCommunity(community);
        List<CommentResponseDto> comments = commentList.stream().map(
                c -> mapper.commentToResponseDto(c,
                            memberMapper.memberToCommunityMemberDto(c.getMember(),
                                    imageService.findImageByMember(c.getMember())))
        ).collect(Collectors.toList());
        return comments;
    }

    public Comment verifiedComment(Long commentId) {
        return commentRepository.findById(commentId).orElseThrow(()
                -> new BusinessLogicException(ExceptionCode.NOT_FOUND_COMMENT));
    }

    public Community verifiedCommunity(Long communityId) {
        return communityRepository.findById(communityId).orElseThrow(()
                -> new BusinessLogicException(ExceptionCode.NOT_FOUND_COMMUNITY));
    }

    public Member verifiedMember(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(()
                -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Long getCommentNum(Community community) {
        Long aLong = commentRepository.countByCommunity(community);
        return aLong;
    }

}
