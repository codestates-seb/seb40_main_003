package com.kittyhiker.sikjipsa.community.mapper;

import com.kittyhiker.sikjipsa.community.dto.CommentResponseDto;
import com.kittyhiker.sikjipsa.community.dto.CommunityPostDto;
import com.kittyhiker.sikjipsa.community.dto.CommunityResponseDto;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import org.mapstruct.Mapper;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommunityMapper {

    Community communityPostDtoToCommunity(CommunityPostDto postDto);
    CommunityResponseDto communityToResponseDto(Community community, List<String> images);
    CommunityResponseDto communityToResponseDto(Community community, List<String> images, List<CommentResponseDto> comments);
}
