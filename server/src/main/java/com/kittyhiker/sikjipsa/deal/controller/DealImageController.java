package com.kittyhiker.sikjipsa.deal.controller;

import com.kittyhiker.sikjipsa.deal.dto.DealPostDto;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.service.DealImageService;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@RequiredArgsConstructor
public class DealImageController {

    private final DealImageService imageService;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping("/deal/image")
    public ResponseEntity postDeal(@RequestParam(name = "images", required = false) List<MultipartFile> images,
                                   @RequestHeader("Authorization") String token) throws IOException {
        List<String> response = imageService.postImage(images);
        return new ResponseEntity(response, HttpStatus.CREATED);
    }

}
