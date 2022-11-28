package com.kittyhiker.sikjipsa.plant.mapper;

import com.kittyhiker.sikjipsa.plant.dto.PlantDto;
import com.kittyhiker.sikjipsa.plant.dto.PlantResponseDto;
import com.kittyhiker.sikjipsa.plant.entity.Plant;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlantMapper {
	Plant toPlant(PlantDto plantDto);

	PlantResponseDto toPlantResponseDto(Plant response);

	List<PlantResponseDto> toPlantResponseDtos(List<Plant> plants);
}
