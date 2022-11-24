package com.kittyhiker.sikjipsa.community.dto;

import com.kittyhiker.sikjipsa.deal.dto.PageInfo;
import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class CommunityPagingDto<T> {
    private T data;
    private PageInfo pageInfo;
}
