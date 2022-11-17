package com.kittyhiker.sikjipsa.deal.controller;

import com.kittyhiker.sikjipsa.deal.dto.DealPostDto;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.dto.LikeDealResponseDto;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.service.DealService;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/deal")
@Validated
public class DealController {

    private final DealService dealService;
    private final JwtTokenizer jwtTokenizer;

    /**
     * 거래글 등록
     */
    @PostMapping
    public ResponseEntity postDeal(@RequestBody DealPostDto dealPostDto,
                                   @RequestHeader("Authorization") String token) throws IOException {
        DealResponseDto response = dealService.postDeal(dealPostDto, jwtTokenizer.getUserIdFromToken(token));
        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    /**
     * 거래글 수정
     */
    @PatchMapping("/{deal-id}")
    public ResponseEntity patchDeal(@PathVariable("deal-id") Long dealId,
                                    @RequestBody DealPostDto dealPatchDto) throws IOException {
        DealResponseDto response = dealService.patchDeal(dealId, dealPatchDto);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * 거래글 전체 조회
     */
    @GetMapping
    public ResponseEntity getDealList(@Positive @RequestParam int page, @Positive @RequestParam int size) {
        return dealService.getDealList(page, size);
    }

    /**
     * 거래글 상세 조회
     */
    @GetMapping("/{deal-id}")
    public ResponseEntity getDealDetail(@PathVariable("deal-id") Long dealId) {
        DealResponseDto dealDetail = dealService.getDealDetail(dealId);
        return new ResponseEntity(dealDetail, HttpStatus.OK);
    }

    /**
     * 거래글 좋아요(찜)
     */
    @PostMapping("/{deal-id}/like")
    public ResponseEntity likeDeal(@PathVariable("deal-id") Long dealId,
                                   @RequestHeader("Authorization") String token) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        LikeDealResponseDto response = dealService.likeDeal(userId, dealId);
        return new ResponseEntity(response, HttpStatus.CREATED);
    }


    /**
     * 거래글 삭제
     */
    @DeleteMapping("/{deal-id}")
    public ResponseEntity deleteDeal(@PathVariable("deal-id") Long dealId) {
        dealService.removeDeal(dealId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
