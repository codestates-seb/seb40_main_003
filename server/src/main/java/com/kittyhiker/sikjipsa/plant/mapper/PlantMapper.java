package com.kittyhiker.sikjipsa.plant.mapper;

import com.kittyhiker.sikjipsa.member.memberprofile.dto.PlantResponseDto2;
import com.kittyhiker.sikjipsa.plant.dto.PlantDto;
import com.kittyhiker.sikjipsa.plant.dto.PlantResponseDto;
import com.kittyhiker.sikjipsa.plant.entity.Plant;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface PlantMapper {
	Plant toPlant(PlantDto plantDto);
	PlantResponseDto toPlantResponseDto(Plant response);

	List<PlantResponseDto> toPlantResponseDtos(List<Plant> plants);

	// memberProfile
	@Mapping(target = "plantName", source = "name")
	@Mapping(target = "plantAge", source = "years")
	@Mapping(target = "plantType", source = "type")
	@Mapping(target = "plantPhoto", source = "image")
	PlantResponseDto2 toPlantResponseDto2(Plant plant);
}
