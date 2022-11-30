package com.kittyhiker.sikjipsa.plant.controller;

import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import com.kittyhiker.sikjipsa.plant.dto.MultiListResponseDto;
import com.kittyhiker.sikjipsa.plant.dto.PlantDto;
import com.kittyhiker.sikjipsa.plant.entity.Plant;
import com.kittyhiker.sikjipsa.plant.mapper.PlantMapper;
import com.kittyhiker.sikjipsa.plant.service.PlantService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/plants")
@RequiredArgsConstructor
public class PlantController {
	private final PlantService plantService;
	private final PlantMapper plantMapper;
	private final JwtTokenizer jwtTokenizer;


	@PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity postPlant(@Valid @RequestPart PlantDto plantDto,
									@RequestPart MultipartFile multipartFile,
									@RequestHeader("Authorization") String token) {
		Plant plant = plantMapper.toPlant(plantDto);
		Plant response = plantService.postPlant(plant, multipartFile, jwtTokenizer.getUserIdFromToken(token));
		return new ResponseEntity(plantMapper.toPlantResponseDto(response), HttpStatus.CREATED);
	}

	@PatchMapping(value = "/{plant-id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity patchPlant(@PathVariable("plant-id") @Positive Long plantId,
									 @Valid @RequestPart PlantDto plantDto,
									 @RequestPart(required = false) MultipartFile multipartFile,
									 @RequestHeader("Authorization") String token) {
		Plant plant = plantMapper.toPlant(plantDto);
		Plant response = plantService.patchPlant(plant, multipartFile, plantId, jwtTokenizer.getUserIdFromToken(token));

		return new ResponseEntity(plantMapper.toPlantResponseDto(response), HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity getPlants(@RequestHeader("Authorization") String token) {
		List<Plant> plants = plantService.getPlants(jwtTokenizer.getUserIdFromToken(token));
		return new ResponseEntity(new MultiListResponseDto<>(plantMapper.toPlantResponseDtos(plants)), HttpStatus.OK);
	}

	@DeleteMapping("/{plant-id}")
	public ResponseEntity deletePlant(@PathVariable("plant-id") @Positive Long plantId,
									  @RequestHeader("Authorization") String token) {
		plantService.deletePlant(plantId, jwtTokenizer.getUserIdFromToken(token));
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}
}
