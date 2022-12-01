package com.kittyhiker.sikjipsa.deal.service;

import com.kittyhiker.sikjipsa.deal.dto.*;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.entity.DealReview;
import com.kittyhiker.sikjipsa.deal.entity.DealSuccess;
import com.kittyhiker.sikjipsa.deal.mapper.DealMapper;
import com.kittyhiker.sikjipsa.deal.respository.DealReviewRepository;
import com.kittyhiker.sikjipsa.deal.respository.DealSuccessRepository;
import com.kittyhiker.sikjipsa.exception.BusinessLogicException;
import com.kittyhiker.sikjipsa.exception.ExceptionCode;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.image.service.ImageService;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.mapper.MemberMapper;
import com.kittyhiker.sikjipsa.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DealReviewService {

    private final DealSuccessRepository dealSuccessRepository;
    private final DealReviewRepository dealReviewRepository;
    private final DealService dealService;
    private final ImageService imageService;
    private final MemberService memberService;
    private final MemberMapper memberMapper;
    private final DealMapper mapper;

    public DealSuccessResponseDto dealSuccess(DealSuccessRequestDto requestDto) {
        Deal deal = dealService.verifiedDeal(requestDto.getDealId());
        Member member = memberService.verifyMember(requestDto.getBuyerId());
        if (dealSuccessRepository.findByDealAndBuyer(deal, member).isPresent()) {
            throw new BusinessLogicException(ExceptionCode.ALREAD_SUCCESS_STATE);
        }
        deal.updateState();

        DealSuccess dealSuccess = mapper.successRequestToDealSuccess(deal, member, deal.getMember());
        DealSuccess savedSuccess = dealSuccessRepository.save(dealSuccess);
        return mapper.dealSuccessToResponseDto(savedSuccess,
                requestDto.getDealId(), requestDto.getBuyerId());
    }

    public List<DealReviewResponseDto> getMyReview(Long userId) {
        Member member = memberService.verifyMember(userId);
        List<DealReview> dealReviewList = dealReviewRepository.findBySeller(member);
        List<DealReviewResponseDto> response = new ArrayList<>();
        dealReviewList.stream()
                .forEach(
                        review -> {
                            Deal deal = review.getDeal();
                            List<Image> images = imageService.findImage(deal);
                            List<String> responseImage = images.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
                            ReviewDealResponse dealResponseDto = mapper.dealToReviewDealDto(deal, responseImage);
                            MemberResponseDto memberResponse = memberMapper.memberToMemberResponseDto(member,
                                    imageService.findImage(member));
                            DealReviewResponseDto reviewResponse = mapper
                                    .dealReviewToReviewResponseDto(review, dealResponseDto, memberResponse);
                            response.add(reviewResponse);
                        }
                );
        return response;
    }

    public DealReviewResponseDto postReview(Long userId, DealReviewRequestDto requestDto) {
        Member buyer = memberService.verifyMember(userId);
        Deal deal = dealService.verifiedDeal(requestDto.getDealId());

        dealSuccessRepository.findByDealAndBuyer(deal, buyer).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.NOT_SUCCESS_STATE));

        if (dealReviewRepository.findByDealAndBuyer(deal, buyer).isPresent()) {
            throw new BusinessLogicException(ExceptionCode.ALREAD_WRITE_DEAL_REVIEW);
        }

        List<Image> dealImage = imageService.findImage(deal);
        List<String> images = dealImage.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
        ReviewDealResponse dealResponseDto = mapper.dealToReviewDealDto(deal, images);

        DealReview dealReview = mapper.postReviewToDealReview(requestDto, deal, buyer, deal.getMember());
        DealReview savedReview = dealReviewRepository.save(dealReview);
        return mapper.dealReviewToReviewResponseDto(savedReview,
                dealResponseDto,
                memberMapper.memberToMemberResponseDto(buyer, imageService.findImage(buyer)));
    }

    public DealReviewResponseDto patchReview(Long userId, Long reviewId, DealReviewRequestDto requestDto) {
        DealReview dealReview = verifiedReview(reviewId);
        dealReview.patchDealReview(requestDto.getReviewContent());
        DealReview savedReview = dealReviewRepository.save(dealReview);

        Member buyer = savedReview.getBuyer();
        Deal deal = savedReview.getDeal();

        List<Image> images = imageService.findImage(deal);
        List<String> responseImage = images.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
        ReviewDealResponse dealResponseDto = mapper.dealToReviewDealDto(deal, responseImage);

        return mapper.dealReviewToReviewResponseDto(savedReview,
                dealResponseDto,
                memberMapper.memberToMemberResponseDto(buyer, imageService.findImage(buyer)));
    }

    public void deleteReview(Long reviewId) {
        DealReview dealReview = verifiedReview(reviewId);
        dealReviewRepository.delete(dealReview);
    }

    public DealReview verifiedReview(Long reviewId) {
        return dealReviewRepository.findById(reviewId).orElseThrow(() ->
                new BusinessLogicException(ExceptionCode.NOT_FOUND_DEAL_REVIEW));
    }
}
