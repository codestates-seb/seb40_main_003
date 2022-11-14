package com.kittyhiker.sikjipsa.deal.service;

import com.kittyhiker.sikjipsa.deal.dto.DealPagingDto;
import com.kittyhiker.sikjipsa.deal.dto.DealPostDto;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.dto.PageInfo;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.mapper.DealMapper;
import com.kittyhiker.sikjipsa.deal.respository.DealRepository;
import com.kittyhiker.sikjipsa.deal.respository.DealReviewRepository;
import com.kittyhiker.sikjipsa.deal.respository.LikeDealRepository;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

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
        Deal findDeal = verifiedDeal(dealId);
        findDeal.updateDeal(dealPatchDto);
        dealRepository.save(findDeal);
        return mapper.dealToDealResponseDto(findDeal);
    }

    public ResponseEntity getDealList(int page, int size) {
        Page<Deal> dealList = dealRepository.findAll(PageRequest.of(page, size, Sort.by("createdAt").descending()));
        PageInfo pageInfo = new PageInfo(page, size, (int) dealList.getTotalElements(), dealList.getTotalPages());
        return new ResponseEntity(new DealPagingDto<>(dealList, pageInfo), HttpStatus.OK);
    }

    public DealResponseDto getDealDetail(Long dealId) {
        Deal findDeal = verifiedDeal(dealId);
        return mapper.dealToDealResponseDto(findDeal);
    }

    public void removeDeal(Long dealId) {
        Deal findDeal = verifiedDeal(dealId);
        dealRepository.delete(findDeal);
    }

    public Deal verifiedDeal(Long dealId) {
        return dealRepository.findById(dealId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND DEAL"));
    }

}
