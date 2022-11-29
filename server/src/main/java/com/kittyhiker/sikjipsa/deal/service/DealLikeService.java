package com.kittyhiker.sikjipsa.deal.service;

import com.kittyhiker.sikjipsa.deal.dto.DealPagingDto;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.dto.LikeDealResponseDto;
import com.kittyhiker.sikjipsa.deal.dto.PageInfo;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.entity.MemberLikeDeal;
import com.kittyhiker.sikjipsa.deal.mapper.DealMapper;
import com.kittyhiker.sikjipsa.deal.respository.DealRepository;
import com.kittyhiker.sikjipsa.deal.respository.LikeDealRepository;
import com.kittyhiker.sikjipsa.exception.BusinessLogicException;
import com.kittyhiker.sikjipsa.exception.ExceptionCode;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.image.service.ImageService;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
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
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class DealLikeService {

    private final MemberRepository memberRepository;
    private final DealRepository dealRepository;
    private final ImageService imageService;
    private final DealMapper mapper;
    private final LikeDealRepository likeDealRepository;

    public DealPagingDto getLikeDealList(Long userId, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Member member = verifiedMember(userId);
        Page<MemberLikeDeal> likeDeal = likeDealRepository.findByMember(member, pageable);
        List<DealResponseDto> dealList = new ArrayList<>();
        likeDeal.stream().forEach(
                like -> {
                    List<Image> image = imageService.findImage(like.getDeal());
                    List<String> imageUrlList = image.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());

                    MemberResponseDto responseMember = MemberResponseDto.builder().memberId(member.getMemberId())
                            .nickname(member.getNickname())
                            .image(imageService.findImage(member)).build();

                    DealResponseDto dealResponseDto = mapper.dealToDealResponseDto(like.getDeal(), imageUrlList, responseMember);
                    dealList.add(dealResponseDto);
                }
        );

        PageInfo pageInfo = new PageInfo(page, size, (int) likeDeal.getTotalElements(), likeDeal.getTotalPages());
        return new DealPagingDto<>(dealList, pageInfo);
    }


    public LikeDealResponseDto likeDeal(Long userId, Long dealId) {
        Member findMember = verifiedMember(userId);
        Deal findDeal = verifiedDeal(dealId);
        MemberLikeDeal likeDeal = MemberLikeDeal.builder()
                .member(findMember)
                .deal(findDeal).build();
        MemberLikeDeal savedLike = likeDealRepository.save(likeDeal);
        findDeal.likeDeal();
        findMember.likeDeal(savedLike);
        memberRepository.save(findMember);
        return LikeDealResponseDto.builder().memberId(userId)
                .dealId(dealId)
                .likeDealId(savedLike.getId()).build();
    }

    public void cancelLikeDeal (Long userId, Long dealId) {
        Member member = verifiedMember(userId);
        Deal deal = verifiedDeal(dealId);
        MemberLikeDeal likeDeal = likeDealRepository.findByMemberAndDeal(member, deal).orElseThrow(()
                -> new BusinessLogicException(ExceptionCode.NOT_FOUND_LIKE_POST));
        likeDealRepository.delete(likeDeal);
    }

    public Member verifiedMember(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(()
                -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }

    public Deal verifiedDeal(Long dealId) {
        return dealRepository.findById(dealId).orElseThrow(()
                -> new BusinessLogicException(ExceptionCode.NOT_FOUND_DEAL));
    }
}
