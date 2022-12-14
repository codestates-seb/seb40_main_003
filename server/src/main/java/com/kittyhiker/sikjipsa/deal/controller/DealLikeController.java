package com.kittyhiker.sikjipsa.deal.controller;

import com.kittyhiker.sikjipsa.deal.dto.DealPagingDto;
import com.kittyhiker.sikjipsa.deal.dto.LikeDealResponseDto;
import com.kittyhiker.sikjipsa.deal.service.DealLikeService;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.constraints.Positive;

@RestController
@RequiredArgsConstructor
@RequestMapping("/deal/like")
@Validated
public class DealLikeController {

    private final DealLikeService dealLikeService;
    private final JwtTokenizer jwtTokenizer;


    /**
     * 찜목록 조회
     */
    @GetMapping
    public ResponseEntity getLikeDealList(@RequestParam @Positive int page,
                                          @RequestParam @Positive int size,
                                          @RequestHeader("Authorization") String token) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        DealPagingDto likeDealList = dealLikeService.getLikeDealList(userId, page-1, size);
        return new ResponseEntity(likeDealList, HttpStatus.OK);
    }

    /**
     * 거래글 좋아요(찜)
     */
    @PostMapping("/{deal-id}")
    public ResponseEntity likeDeal(@PathVariable("deal-id") Long dealId,
                                   @RequestHeader("Authorization") String token) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        LikeDealResponseDto response = dealLikeService.likeDeal(userId, dealId);
        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    @GetMapping("{deal-id}")
    public ResponseEntity isAlreadyLike(@PathVariable("deal-id") Long dealId,
                                        @RequestHeader("Authorization") String token) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        Boolean alreadyLike = dealLikeService.isAlreadyLike(userId, dealId);
        return new ResponseEntity(alreadyLike, HttpStatus.OK);
    }

    /**
     * 찜 취소
     */
    @DeleteMapping("/{deal-id}")
    public ResponseEntity cancelLikeDeal(@PathVariable(("deal-id")) Long dealId,
                                         @RequestHeader("Authorization") String token) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        dealLikeService.cancelLikeDeal(userId, dealId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

}
