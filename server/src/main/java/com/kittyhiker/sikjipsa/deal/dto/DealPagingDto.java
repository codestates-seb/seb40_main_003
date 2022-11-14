package com.kittyhiker.sikjipsa.deal.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

@Getter
@AllArgsConstructor
public class DealPagingDto<T> {

    private T data;
    private PageInfo pageInfo;
}
