package com.kittyhiker.sikjipsa.community.controller;

import com.kittyhiker.sikjipsa.community.dto.CommentResponseDto;
import com.kittyhiker.sikjipsa.community.service.CommentService;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/community")
public class CommentController {

    private final CommentService commentService;
    private final JwtTokenizer jwtTokenizer;

    /**
     * 댓글 등록
     */
    @PostMapping("/{community-id}/comment")
    public ResponseEntity postComment(@RequestBody String content,
                                      @PathVariable("community-id") Long communityId,
                                      @RequestHeader("Authorization") String token){
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        CommentResponseDto response = commentService.postComment(communityId, userId, content);
        return new ResponseEntity(response, HttpStatus.CREATED);
    }


    /**
     * 댓글 수정
     */
    @PatchMapping("/{community-id}/comment/{comment-id}")
    public ResponseEntity postComment(@RequestBody String content,
                                      @PathVariable("comment-id") Long commentId){
        CommentResponseDto response = commentService.patchComment(commentId, content);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * 댓글 삭제
     */
    @DeleteMapping("/{community-id}/comment/{comment-id}")
    public ResponseEntity postComment(@PathVariable("comment-id") Long commentId){
        commentService.deleteComment(commentId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    /**
     * 대댓글 등록
     */
    @PostMapping("/{community-id}/comment/{comment-id}")
    public ResponseEntity postComment(@RequestBody String content,
                                      @PathVariable("community-id") Long communityId,
                                      @PathVariable("comment-id") Long commentId,
                                      @RequestHeader("Authorization") String token){
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        CommentResponseDto response = commentService.postComment(communityId, userId, commentId, content);
        return new ResponseEntity(response, HttpStatus.CREATED);
    }

}
