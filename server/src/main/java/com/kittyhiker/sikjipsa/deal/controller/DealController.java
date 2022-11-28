package com.kittyhiker.sikjipsa.deal.controller;

import com.kittyhiker.sikjipsa.deal.dto.DealPagingDto;
import com.kittyhiker.sikjipsa.deal.dto.DealPostDto;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.dto.LikeDealResponseDto;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.service.DealService;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
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
    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity postDeal(@RequestPart @Valid DealPostDto dealPostDto,
                                   @RequestPart(required = false) List<MultipartFile> images,
                                   @RequestHeader("Authorization") String token) throws IOException {
        DealResponseDto response = dealService.postDeal(dealPostDto, images, jwtTokenizer.getUserIdFromToken(token));
        return new ResponseEntity(response, HttpStatus.CREATED);
    }

    /**
     * 거래글 수정
     */
    @PatchMapping(value = "/{deal-id}",
            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ResponseEntity patchDeal(@PathVariable("deal-id") Long dealId,
                                    @RequestPart @Valid DealPostDto dealPatchDto,
                                    @RequestPart(required = false) List<MultipartFile> images) throws IOException {
        DealResponseDto response = dealService.patchDeal(dealId, images, dealPatchDto);
        return new ResponseEntity(response, HttpStatus.OK);
    }

    /**
     * 거래글 리스트 조회
     */
    @GetMapping
    public ResponseEntity getDealList(@RequestParam(required = false) String keyword,
                                      @Positive @RequestParam int page,
                                      @Positive @RequestParam int size) {

        DealPagingDto<List> response;
        if (keyword==null) {
            response = dealService.getDealList(page-1, size);
        } else {
            response = dealService.getDealList(keyword, page-1, size);
        }

        return new ResponseEntity(response, HttpStatus.OK);
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
     * 거래글 삭제
     */
    @DeleteMapping("/{deal-id}")
    public ResponseEntity deleteDeal(@PathVariable("deal-id") Long dealId) {
        dealService.removeDeal(dealId);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }
}
