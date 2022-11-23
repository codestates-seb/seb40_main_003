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
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.image.service.ImageService;
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
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class DealService {

    private final DealRepository dealRepository;
    private final DealMapper mapper;
    private final ImageService imageService;
    private final MemberRepository memberRepository;
    private final DealReviewRepository reviewRepository;
    private final LikeDealRepository likeDealRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;

    public DealResponseDto postDeal(DealPostDto dealPostDto, List<MultipartFile> images, Long userId) throws IOException {

        Deal deal = mapper.dealPostDtoToDeal(dealPostDto);
        Member findMember = memberRepository.findById(userId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND MEMBER"));
        deal.setMember(findMember);
        Deal savedDeal = dealRepository.save(deal);

        List<String> responseImages=new ArrayList<>();
        if (images!=null) {
            UUID uuid = UUID.randomUUID();
            images.stream().forEach(
                    (image) -> {
                        String originalFilename = image.getOriginalFilename();
                        String fileName = uuid+"_"+ originalFilename;
                        try {
                            ObjectMetadata objMeta = new ObjectMetadata();
                            objMeta.setContentLength(image.getSize());
                            amazonS3.putObject(bucket, fileName, image.getInputStream(), objMeta);
                            String filePath = amazonS3.getUrl(bucket, originalFilename).toString();
                            Image newImage = Image.builder().originalName(originalFilename)
                                    .imgName(fileName).deal(savedDeal).imgUrl(filePath).build();
                            imageService.postImage(newImage);
                            responseImages.add(filePath);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
            );
        }

        return mapper.dealToDealResponseDto(savedDeal, responseImages);
    }

    public DealResponseDto patchDeal(Long dealId, List<MultipartFile> images, DealPostDto dealPatchDto) throws IOException {

        Deal findDeal = verifiedDeal(dealId);
        List<Image> findImage = imageService.findImage(findDeal);
        List<String> responseImages;
        if (images == null) {
            responseImages=findImage.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
        } else {
            responseImages = new ArrayList<>();
            UUID uuid = UUID.randomUUID();
            images.stream().forEach(
                    (image) -> {
                        String originalFilename = image.getOriginalFilename();
                        String fileName = uuid+"_"+ originalFilename;
                        try {
                            ObjectMetadata objMeta = new ObjectMetadata();
                            objMeta.setContentLength(image.getSize());
                            amazonS3.putObject(bucket, fileName, image.getInputStream(), objMeta);
                            String filePath = amazonS3.getUrl(bucket, originalFilename).toString();
                            Image newImage = Image.builder().originalName(originalFilename)
                                    .imgName(fileName).deal(findDeal).imgUrl(filePath).build();
                            imageService.postImage(newImage);
                            responseImages.add(filePath);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
            );
        }

        findDeal.updateDeal(dealPatchDto);
        dealRepository.save(findDeal);
        return mapper.dealToDealResponseDto(findDeal, responseImages);
    }

    public DealPagingDto<List> getDealList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Deal> dealList = dealRepository.findAll(pageable);
        List<DealResponseDto> response = new ArrayList<>();
        dealList.stream().forEach(
                deal -> {
                    List<Image> images = imageService.findImage(deal);
                    List<String> responseImage = images.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
                    DealResponseDto dealResponseDto = mapper.dealToDealResponseDto(deal, responseImage);
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
                    DealResponseDto dealResponseDto = mapper.dealToDealResponseDto(deal, responseImage);
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

        return mapper.dealToDealResponseDto(findDeal, responseImage);
    }


    public void removeDeal(Long dealId) {
        Deal findDeal = verifiedDeal(dealId);
        dealRepository.delete(findDeal);
    }

    public Deal verifiedDeal(Long dealId) {
        return dealRepository.findById(dealId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND DEAL"));
    }

}
