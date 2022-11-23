package com.kittyhiker.sikjipsa.deal.mapper;

import com.kittyhiker.sikjipsa.deal.dto.DealPostDto;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DealMapper {
    Deal dealPostDtoToDeal(DealPostDto dealPostDto);
    DealResponseDto dealToDealResponseDto(Deal deal, List<String> images, MemberResponseDto memberResponse);
//    List<DealResponseDto> dealListToResponseList(List<Deal> dealList);
}
