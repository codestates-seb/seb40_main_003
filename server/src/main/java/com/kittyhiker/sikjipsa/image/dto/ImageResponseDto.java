package com.kittyhiker.sikjipsa.image.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ImageResponseDto {

    Long imageId;
    String imagePath;
}
