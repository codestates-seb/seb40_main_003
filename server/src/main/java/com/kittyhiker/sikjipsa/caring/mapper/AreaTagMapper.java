package com.kittyhiker.sikjipsa.caring.mapper;

import com.kittyhiker.sikjipsa.caring.dto.AreaTagDto;
import com.kittyhiker.sikjipsa.caring.entity.AreaTag;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")

public interface AreaTagMapper {
	AreaTag toAreaTag(AreaTagDto areaTagDto);

	AreaTagDto toAreaTagDto(AreaTag areaTag);
}
