package com.kittyhiker.sikjipsa.deal.service;

import com.kittyhiker.sikjipsa.deal.dto.DealPostDto;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.mapper.DealMapper;
import com.kittyhiker.sikjipsa.deal.respository.DealRepository;
import com.kittyhiker.sikjipsa.deal.respository.DealReviewRepository;
import com.kittyhiker.sikjipsa.deal.respository.LikeDealRepository;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class DealService {

    private final DealRepository dealRepository;
    private final DealMapper mapper;
    private final MemberRepository memberRepository;
    private final DealReviewRepository reviewRepository;
    private final LikeDealRepository likeDealRepository;

    public DealResponseDto postDeal(DealPostDto dealPostDto, Long userId) {
        Deal deal = mapper.dealPostDtoToDeal(dealPostDto);
        Member findMember = memberRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND MEMBER"));
        deal.setMember(findMember);
        dealRepository.save(deal);
        return mapper.dealToDealResponseDto(deal);
    }

    public DealResponseDto patchDeal(Long dealId, DealPostDto dealPatchDto) {
        Deal findDeal = dealRepository.findById(dealId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND DEAL"));
        findDeal.updateDeal(dealPatchDto);
        dealRepository.save(findDeal);
        return mapper.dealToDealResponseDto(findDeal);
    }


}
