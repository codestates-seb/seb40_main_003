package com.kittyhiker.sikjipsa.deal.service;

import com.kittyhiker.sikjipsa.deal.dto.*;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.entity.MemberLikeDeal;
import com.kittyhiker.sikjipsa.deal.mapper.DealMapper;
import com.kittyhiker.sikjipsa.deal.respository.DealRepository;
import com.kittyhiker.sikjipsa.deal.respository.DealReviewRepository;
import com.kittyhiker.sikjipsa.deal.respository.LikeDealRepository;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.image.service.ImageService;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DealService {

    private final DealRepository dealRepository;
    private final DealMapper mapper;
    private final ImageService imageService;
    private final MemberRepository memberRepository;
    private final DealReviewRepository reviewRepository;
    private final LikeDealRepository likeDealRepository;

    public DealResponseDto postDeal(DealPostDto dealPostDto, Long userId) throws IOException {

        String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";
        UUID uuid = UUID.randomUUID();
        MultipartFile file = dealPostDto.getImage();
        String fileName = uuid + "_" + file.getOriginalFilename();
        File saveFile = new File(projectPath, fileName); //빈껍데기 생성 (경로, 파일이름)
        file.transferTo(saveFile);

        Deal deal = mapper.dealPostDtoToDeal(dealPostDto);
        Member findMember = memberRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND MEMBER"));
        deal.setMember(findMember);
        dealRepository.save(deal);

        //이미지저장
        Image image = Image.builder().originalName(file.getOriginalFilename()).imgName(fileName).deal(deal).imgUrl(projectPath).build();
        imageService.postImage(image);
        return mapper.dealToDealResponseDto(deal);
    }

    public DealResponseDto patchDeal(Long dealId, DealPostDto dealPatchDto) throws IOException {

        String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";
        UUID uuid = UUID.randomUUID();
        MultipartFile file = dealPatchDto.getImage();
        String fileName = uuid + "_" + file.getOriginalFilename();
        File saveFile = new File(projectPath, fileName); //빈껍데기 생성 (경로, 파일이름)
        file.transferTo(saveFile);

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
        findDeal.updateView();
        dealRepository.save(findDeal);
        return mapper.dealToDealResponseDto(findDeal);
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
                .likeNum(findDeal.getLikes())
                .likeDealId(savedLike.getId()).build();
    }

    public void removeDeal(Long dealId) {
        Deal findDeal = verifiedDeal(dealId);
        dealRepository.delete(findDeal);
    }

    public Deal verifiedDeal(Long dealId) {
        return dealRepository.findById(dealId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND DEAL"));
    }

}
