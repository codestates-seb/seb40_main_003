package com.kittyhiker.sikjipsa.community.mapper;

import com.kittyhiker.sikjipsa.community.dto.CommentResponseDto;
import com.kittyhiker.sikjipsa.community.enitity.Comment;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface CommentMapper {

    CommentResponseDto commentToResponseDto(Comment comment);
}
