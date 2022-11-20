package com.kittyhiker.sikjipsa.community.dto;

import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommentResponseDto {

    private Long commentId;
    private String content;

    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;
    private int isModified;
    private int isDeleted;
    private int depth;
    private Long parent;
    private MemberResponseDto member;

}
