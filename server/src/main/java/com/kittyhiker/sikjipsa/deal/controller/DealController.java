package com.kittyhiker.sikjipsa.deal.controller;

import com.kittyhiker.sikjipsa.deal.dto.DealPostDto;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.service.DealService;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/shopping")
@Validated
public class DealController {

    private final DealService dealService;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping
    public ResponseEntity postDeal(@RequestBody DealPostDto dealPostDto,
                                   @RequestHeader("Authorization") String token) {
        DealResponseDto response = dealService.postDeal(dealPostDto, jwtTokenizer.getUserIdFromToken(token));
        return new ResponseEntity(response, HttpStatus.CREATED);
    }
}
