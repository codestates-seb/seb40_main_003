package com.kittyhiker.sikjipsa.deal.dto;

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
public class DealReviewResponseDto {

    private Long dealReviewid;
    private ReviewDealResponse deal;
    private CommunityMemberResponse buyerMember;
    private String reviewContent;
}
