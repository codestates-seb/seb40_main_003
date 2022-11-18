package com.kittyhiker.sikjipsa.deal.service;

import com.kittyhiker.sikjipsa.deal.dto.DealPagingDto;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.dto.LikeDealResponseDto;
import com.kittyhiker.sikjipsa.deal.dto.PageInfo;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.entity.MemberLikeDeal;
import com.kittyhiker.sikjipsa.deal.respository.DealRepository;
import com.kittyhiker.sikjipsa.deal.respository.LikeDealRepository;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DealLikeService {

    private final MemberRepository memberRepository;
    private final DealRepository dealRepository;
    private final LikeDealRepository likeDealRepository;

    public DealPagingDto getLikeDealList(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Member member = verifiedMember(userId);
        Page<MemberLikeDeal> likeDeal = likeDealRepository.findByMember(member, pageable);
        List<Deal> collect = likeDeal.stream().map(like -> dealRepository.findByMemberLikeDeals(like))
                .collect(Collectors.toList());

        PageInfo pageInfo = new PageInfo(page, size, (int) likeDeal.getTotalElements(), likeDeal.getTotalPages());
        return new DealPagingDto<>(collect, pageInfo);
    }


    public LikeDealResponseDto likeDeal(Long userId, Long dealId) {
        Member findMember = memberRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND MEMBER"));
        Deal findDeal = verifiedDeal(dealId);
        MemberLikeDeal likeDeal = MemberLikeDeal.builder()
                .member(findMember)
                .deal(findDeal).build();
        MemberLikeDeal savedLike = likeDealRepository.save(likeDeal);
        findDeal.likeDeal(savedLike);
        findMember.likeDeal(savedLike);
        memberRepository.save(findMember);
        return LikeDealResponseDto.builder().memberId(userId)
                .dealId(dealId)
                .likeDealId(savedLike.getId()).build();
    }

    public Member verifiedMember(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND MEMBER"));
    }

    public Deal verifiedDeal(Long dealId) {
        return dealRepository.findById(dealId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND DEAL"));
    }

}
