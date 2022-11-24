package com.kittyhiker.sikjipsa.caring.mapper;

import com.kittyhiker.sikjipsa.caring.dto.ExpertReviewDto;
import com.kittyhiker.sikjipsa.caring.dto.ExpertReviewResponseDto;
import com.kittyhiker.sikjipsa.caring.entity.ExpertReview;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ExpertReviewMapper {
	ExpertReview toExpertReview(ExpertReviewDto expertReviewDto);

	ExpertReviewDto toExpertReviewDto(ExpertReview expertReview);

	ExpertReview toReview(ExpertReviewDto expertReviewDto);

	ExpertReviewResponseDto toExpertReviewResponseDto(ExpertReview response);
}
