package com.kittyhiker.sikjipsa.caring.mapper;

import com.kittyhiker.sikjipsa.caring.dto.TechTagDto;
import com.kittyhiker.sikjipsa.caring.entity.TechTag;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface TechTagMapper {
	TechTag toTechTag(TechTagDto techTagDto);

	TechTagDto toTechTagDto(TechTag techTag);

//	List<TechTagDto> toTechTagDtos(List<TechTag> techTags);
//
//	List<TechTag> toTechTags(List<TechTagDto> techTagDtos);


}
