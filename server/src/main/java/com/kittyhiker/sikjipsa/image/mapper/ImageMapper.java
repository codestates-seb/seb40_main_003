package com.kittyhiker.sikjipsa.image.mapper;

import com.kittyhiker.sikjipsa.image.dto.ImageDto2;
import com.kittyhiker.sikjipsa.image.entity.Image;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ImageMapper {
	ImageDto2 toImageDto(Image image);
}
