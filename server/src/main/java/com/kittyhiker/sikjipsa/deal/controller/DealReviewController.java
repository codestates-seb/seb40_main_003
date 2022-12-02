package com.kittyhiker.sikjipsa.deal.controller;

import com.kittyhiker.sikjipsa.deal.dto.*;
import com.kittyhiker.sikjipsa.deal.service.DealReviewService;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/deal/success")
public class DealReviewController {

    private final DealReviewService dealReviewService;
    private final JwtTokenizer jwtTokenizer;

    /**
     * 거래 성공
     */
    @PostMapping
    public ResponseEntity postDeal(@RequestBody DealSuccessRequestDto successRequestDto) throws IOException {
        DealSuccessResponseDto dealSuccessResponseDto = dealReviewService.dealSuccess(successRequestDto);
        return new ResponseEntity(dealSuccessResponseDto, HttpStatus.CREATED);
    }


    /**
     * 리뷰 조회
     */
    @GetMapping("/reviews")
    public ResponseEntity getDealReviews(@RequestHeader("Authorization") String token) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        List<DealReviewResponseDto> myReview = dealReviewService.getMyReview(userId);
        return new ResponseEntity(myReview, HttpStatus.OK);
    }

    /**
     * 리뷰 등록
     */
    @PostMapping("/reviews")
    public ResponseEntity postDealReviews(@RequestHeader("Authorization") String token,
                                          @RequestBody DealReviewRequestDto requestDto) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        DealReviewResponseDto dealReviewResponseDto = dealReviewService.postReview(userId, requestDto);
        return new ResponseEntity(dealReviewResponseDto, HttpStatus.CREATED);
    }

    /**
     * 리뷰 수정
     */
    @PatchMapping("/reviews/{review-id}")
    public ResponseEntity patchDealReviews(@RequestHeader("Authorization") String token,
                                          @PathVariable("{review-id}") Long reviewId,
                                          @RequestBody DealReviewRequestDto requestDto) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        DealReviewResponseDto dealReviewResponseDto = dealReviewService.patchReview(userId, reviewId, requestDto);
        return new ResponseEntity(dealReviewResponseDto, HttpStatus.CREATED);
    }


    /**
     * 리뷰 삭제
     */
    @DeleteMapping("/reviews/{review-id}")
    public ResponseEntity deleteDealReviews(@PathVariable("review-id") Long reviewId) {

        dealReviewService.deleteReview(reviewId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
