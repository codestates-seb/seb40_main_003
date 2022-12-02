package com.kittyhiker.sikjipsa.address.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;

@Getter
@AllArgsConstructor
public class MultiListDto<T> {
	private List<T> dongs;
}
