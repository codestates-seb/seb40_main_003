package com.kittyhiker.sikjipsa.deal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class LikeDealResponseDto {
    Long likeDealId;
    Long dealId;
    Long memberId;
    int likeNum;
}
