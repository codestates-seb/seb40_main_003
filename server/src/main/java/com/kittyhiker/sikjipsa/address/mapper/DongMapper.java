package com.kittyhiker.sikjipsa.address.mapper;

import com.kittyhiker.sikjipsa.address.dto.DongResponseDto;
import com.kittyhiker.sikjipsa.address.entity.Dong;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DongMapper {
	DongResponseDto toDongResponseDto(Dong dong);
	List<DongResponseDto> toDongResponseDtos(List<Dong> dongs);
}
