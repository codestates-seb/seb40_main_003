package com.kittyhiker.sikjipsa.plant.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.util.List;
@Getter
@AllArgsConstructor
public class MultiListResponseDto<T> {
	private List<T> data;
}
