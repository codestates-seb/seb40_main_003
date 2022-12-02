package com.kittyhiker.sikjipsa.caring.mapper;

import com.kittyhiker.sikjipsa.caring.dto.*;
import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface ExpertMapper {

	ExpertProfile toExpert(ExpertProfileDto expertProfileDto);

	ExpertProfileResponseDto toExpertResponseDto(ExpertProfile expertProfile);

	List<ExpertProfileResponseDtos> toExpertResponseDtos(List<ExpertProfile> expertProfiles);

	List<ExpertSuccessResponseDtos> toExpertSuccessResponseDtos(List<ExpertProfile> expertProfiles);

	ExpertProfileDto2 toIsExpertDto(ExpertProfile response);
}
