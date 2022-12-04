package com.kittyhiker.sikjipsa.address.controller;

import com.kittyhiker.sikjipsa.address.dto.MultiListDto;
import com.kittyhiker.sikjipsa.address.entity.Dong;
import com.kittyhiker.sikjipsa.address.mapper.DongMapper;
import com.kittyhiker.sikjipsa.address.service.DongService;
import com.kittyhiker.sikjipsa.plant.dto.MultiListResponseDto;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/address")
@RequiredArgsConstructor
public class DongController {
	private final DongService dongService;
	private final DongMapper dongMapper;

	@GetMapping
	public ResponseEntity getDongs(@RequestParam String gugun) {
		List<Dong> dongs = dongService.getDongs(gugun);
		return new ResponseEntity(new MultiListDto<>(dongMapper.toDongResponseDtos(dongs)), HttpStatus.OK);
	}

}