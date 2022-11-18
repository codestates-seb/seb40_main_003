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

        List<String> responseImages=new ArrayList<>();
//        String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";
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
                                    .imgName(fileName).deal(deal).imgUrl(filePath).build();
                            imageService.postImage(newImage);
                            responseImages.add(filePath);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
            );
        }

        Deal savedDeal = dealRepository.save(deal);
        return mapper.dealToDealResponseDto(savedDeal, responseImages);
    }

    public DealResponseDto patchDeal(Long dealId, List<MultipartFile> images, DealPostDto dealPatchDto) throws IOException {

        Deal findDeal = verifiedDeal(dealId);

        List<String> responseImages=new ArrayList<>();
//        String projectPath = System.getProperty("user.dir") + "\\src\\main\\resources\\static\\files";
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

    public ResponseEntity getDealList(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Deal> dealList = dealRepository.findByTitleContaining(keyword, pageable);
        PageInfo pageInfo = new PageInfo(page, size, (int) dealList.getTotalElements(), dealList.getTotalPages());
        return new ResponseEntity(new DealPagingDto<>(dealList, pageInfo), HttpStatus.OK);
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
