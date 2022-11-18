package com.kittyhiker.sikjipsa.deal.mapper;

import com.kittyhiker.sikjipsa.deal.dto.DealPostDto;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DealMapper {
    Deal dealPostDtoToDeal(DealPostDto dealPostDto);
    DealResponseDto dealToDealResponseDto(Deal deal, List<String> images);
//    List<DealResponseDto> dealListToResponseList(List<Deal> dealList);
}
