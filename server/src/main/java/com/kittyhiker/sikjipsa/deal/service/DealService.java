package com.kittyhiker.sikjipsa.deal.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.kittyhiker.sikjipsa.deal.dto.*;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.entity.MemberLikeDeal;
import com.kittyhiker.sikjipsa.deal.mapper.DealMapper;
import com.kittyhiker.sikjipsa.deal.respository.DealRepository;
import com.kittyhiker.sikjipsa.deal.respository.DealReviewRepository;
import com.kittyhiker.sikjipsa.deal.respository.LikeDealRepository;
import com.kittyhiker.sikjipsa.exception.BusinessLogicException;
import com.kittyhiker.sikjipsa.exception.ExceptionCode;
import com.kittyhiker.sikjipsa.image.dto.SavedImageDto;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.image.service.ImageService;
import com.kittyhiker.sikjipsa.member.dto.CommunityMemberResponse;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class DealService {

    private final DealRepository dealRepository;
    private final DealMapper mapper;
    private final ImageService imageService;
    private final MemberRepository memberRepository;
    private final DealReviewRepository reviewRepository;
    private final LikeDealRepository likeDealRepository;

    public DealResponseDto postDeal(DealPostDto dealPostDto, List<MultipartFile> images, Long userId) throws IOException {

        Deal deal = mapper.dealPostDtoToDeal(dealPostDto);
        Member findMember = memberRepository.findById(userId).orElseThrow(()
                -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
        deal.setMember(findMember);
        Deal savedDeal = dealRepository.save(deal);

        List<String> responseImages=new ArrayList<>();
        if (images!=null) {
            images.stream().forEach(
                    (image) -> {
                        SavedImageDto savedImageDto = imageService.savedImageToS3(image);
                        Image newImage = Image.builder().originalName(savedImageDto.getOriginalFileName())
                                .imgName(savedImageDto.getFileName()).deal(savedDeal)
                                .imgUrl(savedImageDto.getFilePath()).build();
                        imageService.postImage(newImage);
                        responseImages.add(savedImageDto.getFilePath());
                    }
            );
        }
        CommunityMemberResponse responseMember = CommunityMemberResponse
                .builder().memberId(findMember.getMemberId())
                .nickname(findMember.getNickname())
                .image(imageService.findImageByMember(findMember)).build();
        return mapper.dealToDealResponseDto(savedDeal, responseImages, responseMember);
    }

    public DealResponseDto patchDeal(Long dealId, List<MultipartFile> images, DealPostDto dealPatchDto) throws IOException {

        Deal findDeal = verifiedDeal(dealId);
        List<Image> findImage = imageService.findImage(findDeal);
        List<String> responseImages;
        List<String> alreadySavedImage
                = findImage.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
        if (images == null) {
            responseImages=alreadySavedImage;
        } else {
            responseImages=new ArrayList<>();
            alreadySavedImage.stream().forEach(
                    i -> imageService.deleteImageFromS3(i)
            );
            images.stream().forEach(
                    (image) -> {
                        SavedImageDto savedImageDto = imageService.savedImageToS3(image);
                        Image newImage = Image.builder().originalName(savedImageDto.getOriginalFileName())
                                .imgName(savedImageDto.getFileName()).deal(findDeal)
                                .imgUrl(savedImageDto.getFilePath()).build();
                        imageService.postImage(newImage);
                        responseImages.add(savedImageDto.getFilePath());
                    }
            );
        }

        findDeal.updateDeal(dealPatchDto);
        dealRepository.save(findDeal);
        Member findMember = findDeal.getMember();
        CommunityMemberResponse responseMember = CommunityMemberResponse.builder()
                .memberId(findMember.getMemberId())
                .nickname(findMember.getNickname())
                .image(imageService.findImageByMember(findMember)).build();
        return mapper.dealToDealResponseDto(findDeal, responseImages, responseMember);
    }

    public DealPagingDto<List> getDealList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Deal> dealList = dealRepository.findAll(pageable);
        List<DealResponseDto> response = new ArrayList<>();
        dealList.stream().forEach(
                deal -> {
                    List<Image> images = imageService.findImage(deal);
                    List<String> responseImage = images.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
                    Member dealMember = deal.getMember();
                    CommunityMemberResponse responseMember = CommunityMemberResponse.builder()
                            .memberId(dealMember.getMemberId())
                            .nickname(dealMember.getNickname())
                            .image(imageService.findImageByMember(dealMember)).build();

                    DealResponseDto dealResponseDto = mapper.dealToDealResponseDto(deal, responseImage, responseMember);
                    response.add(dealResponseDto);
                }
        );

        PageInfo pageInfo = new PageInfo(page, size, (int) dealList.getTotalElements(), dealList.getTotalPages());
        return new DealPagingDto<List>(response, pageInfo);
    }

    public DealPagingDto<List> getDealList(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Deal> dealList = dealRepository.findByTitleContaining(keyword, pageable);
        List<DealResponseDto> response = new ArrayList<>();
        dealList.stream().forEach(
                deal -> {
                    List<Image> images = imageService.findImage(deal);
                    List<String> responseImage = images.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
                    Member dealMember = deal.getMember();
                    CommunityMemberResponse responseMember = CommunityMemberResponse.builder()
                            .memberId(dealMember.getMemberId())
                            .nickname(dealMember.getNickname())
                            .image(imageService.findImageByMember(dealMember)).build();
                    DealResponseDto dealResponseDto = mapper.dealToDealResponseDto(deal, responseImage, responseMember);
                    response.add(dealResponseDto);
                }
        );

        PageInfo pageInfo = new PageInfo(page, size, (int) dealList.getTotalElements(), dealList.getTotalPages());
        return new DealPagingDto<List>(response, pageInfo);
    }

    public DealResponseDto getDealDetail(Long dealId) {
        Deal findDeal = verifiedDeal(dealId);
        findDeal.updateView();
        dealRepository.save(findDeal);
        List<Image> image = imageService.findImage(findDeal);
        List<String> responseImage = image.stream().map(img -> img.getImgUrl()).collect(Collectors.toList());

        Member dealMember = findDeal.getMember();
        CommunityMemberResponse responseMember = CommunityMemberResponse.builder()
                .memberId(dealMember.getMemberId())
                .nickname(dealMember.getNickname())
                .image(imageService.findImageByMember(dealMember)).build();

        return mapper.dealToDealResponseDto(findDeal, responseImage, responseMember);
    }


    public void removeDeal(Long dealId) {
        Deal findDeal = verifiedDeal(dealId);
        List<Image> images = imageService.findImage(findDeal);
        images.stream().forEach(
                i -> imageService.deleteImageFromS3(i.getImgUrl())
        );
        dealRepository.delete(findDeal);
    }

    public Deal verifiedDeal(Long dealId) {
        return dealRepository.findById(dealId).orElseThrow(()
                -> new BusinessLogicException(ExceptionCode.NOT_FOUND_DEAL));
    }

    public List<Deal> findMyDeal(Member member) {
        return dealRepository.findByMember(member);
    }

}
