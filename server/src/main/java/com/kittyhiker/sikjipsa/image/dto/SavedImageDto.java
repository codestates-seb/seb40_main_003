package com.kittyhiker.sikjipsa.image.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Builder
@Getter
@NoArgsConstructor
@AllArgsConstructor
public class SavedImageDto {
    String originalFileName;
    String fileName;
    String filePath;

}
