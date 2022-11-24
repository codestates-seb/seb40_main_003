package com.kittyhiker.sikjipsa.community.mapper;

import com.kittyhiker.sikjipsa.community.dto.CommentResponseDto;
import com.kittyhiker.sikjipsa.community.dto.CommunityPostDto;
import com.kittyhiker.sikjipsa.community.dto.CommunityResponseDto;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface CommunityMapper {

    Community communityPostDtoToCommunity(CommunityPostDto postDto);
    @Mapping(source = "memberResponse", target = "member")
    CommunityResponseDto communityToResponseDto(Community community, List<String> images,
                                                MemberResponseDto memberResponse, Long commentNum);
    @Mapping(source = "memberResponse", target = "member")
    CommunityResponseDto communityToResponseDto(Community community, List<String> images,
                                                MemberResponseDto memberResponse,
                                                List<CommentResponseDto> comments, Long commentNum);
}
