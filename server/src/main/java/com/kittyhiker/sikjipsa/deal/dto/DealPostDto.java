package com.kittyhiker.sikjipsa.deal.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class DealPostDto {

    String title;
    String content;
    int price;
    int category;
    int area;
//    private String filename;
//    private String filepath;
    MultipartFile image;

}
