package com.kittyhiker.sikjipsa.deal.mapper;

import com.kittyhiker.sikjipsa.deal.dto.*;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.entity.DealReview;
import com.kittyhiker.sikjipsa.deal.entity.DealSuccess;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import com.kittyhiker.sikjipsa.member.entity.Member;
import org.mapstruct.Mapper;
import org.mapstruct.Mapping;

import java.util.List;

@Mapper(componentModel = "spring")
public interface DealMapper {
    Deal dealPostDtoToDeal(DealPostDto dealPostDto);

    @Mapping(source = "memberResponse", target = "member")
    DealResponseDto dealToDealResponseDto(Deal deal, List<String> images, MemberResponseDto memberResponse);
//    List<DealResponseDto> dealListToResponseList(List<Deal> dealList);

    ReviewDealResponse dealToReviewDealDto(Deal deal, List<String> images);

    DealSuccess successRequestToDealSuccess(Deal deal, Member buyer, Member seller);
    DealSuccessResponseDto dealSuccessToResponseDto(DealSuccess dealSuccess, Long dealId, Long buyerId);

    DealReviewResponseDto dealReviewToReviewResponseDto(DealReview dealReview,
                                                        ReviewDealResponse deal,
                                                        MemberResponseDto buyerMember);

    DealReview postReviewToDealReview(DealReviewRequestDto requestDto, Deal deal, Member buyer, Member seller);
}
