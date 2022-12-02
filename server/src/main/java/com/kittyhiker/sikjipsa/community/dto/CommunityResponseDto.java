package com.kittyhiker.sikjipsa.community.dto;

import com.kittyhiker.sikjipsa.member.dto.CommunityMemberResponse;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class CommunityResponseDto {

    private Long communityId;
    private String title;
    private String content;
    private int view;
    private int likeNum;
    private Long commentNum;
    private LocalDateTime createdAt;
    private LocalDateTime modifiedAt;

    List<String> images;
    List<CommentResponseDto> comments;
    CommunityMemberResponse member;
}
