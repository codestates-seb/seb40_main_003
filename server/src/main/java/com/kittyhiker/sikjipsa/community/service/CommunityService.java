package com.kittyhiker.sikjipsa.community.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.kittyhiker.sikjipsa.community.dto.CommentResponseDto;
import com.kittyhiker.sikjipsa.community.dto.CommunityPagingDto;
import com.kittyhiker.sikjipsa.community.dto.CommunityPostDto;
import com.kittyhiker.sikjipsa.community.dto.CommunityResponseDto;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.community.enitity.CommunityLike;
import com.kittyhiker.sikjipsa.community.mapper.CommunityMapper;
import com.kittyhiker.sikjipsa.community.repository.CommunityLikeRepository;
import com.kittyhiker.sikjipsa.community.repository.CommunityRepository;
import com.kittyhiker.sikjipsa.deal.dto.PageInfo;
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
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final CommunityLikeRepository communityLikeRepository;
    private final CommunityMapper mapper;
    private final ImageService imageService;
    private final CommentService commentService;
    private final MemberRepository memberRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;

    public CommunityResponseDto postCommunity(CommunityPostDto postDto, List<MultipartFile> images, Long userId) throws IOException {

        Community community = mapper.communityPostDtoToCommunity(postDto);
        Member findMember = verifiedMember(userId);
        community.setMember(findMember);
        Community savedCommunity = communityRepository.save(community);

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
                                    .imgName(fileName).community(savedCommunity).imgUrl(filePath).build();
                            imageService.postImage(newImage);
                            responseImages.add(filePath);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
            );
        }

        return mapper.communityToResponseDto(community, responseImages);
    }

    public CommunityResponseDto patchCommunity(Long communityId, List<MultipartFile> images, CommunityPostDto patchDto) throws IOException {

        Community findCommunity = verifiedCommunity(communityId);
        List<Image> findImage = imageService.findImage(findCommunity);
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
                                    .imgName(fileName).community(findCommunity).imgUrl(filePath).build();
                            imageService.postImage(newImage);
                            responseImages.add(filePath);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
            );
        }

        findCommunity.update(patchDto);
        communityRepository.save(findCommunity);
        return mapper.communityToResponseDto(findCommunity, responseImages);
    }

    public CommunityPagingDto<List> getPostList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Community> communityList = communityRepository.findAll(pageable);
        List<CommunityResponseDto> response = new ArrayList<>();
        communityList.stream().forEach(
                c -> {
                    List<Image> images = imageService.findImage(c);
                    List<String> responseImage = images.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
                    CommunityResponseDto communityResponseDto = mapper.communityToResponseDto(c, responseImage);
                    response.add(communityResponseDto);
                }
        );

        PageInfo pageInfo = new PageInfo(page, size, (int) communityList.getTotalElements(), communityList.getTotalPages());
        return new CommunityPagingDto<List>(response, pageInfo);
    }

    public CommunityPagingDto<List> getPostList(String keyword, int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Community> communityList = communityRepository.findByTitleContaining(keyword, pageable);

        List<CommunityResponseDto> response = new ArrayList<>();
        communityList.stream().forEach(
                c -> {
                    List<Image> images = imageService.findImage(c);
                    List<String> responseImage = images.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
                    CommunityResponseDto communityResponse = mapper.communityToResponseDto(c, responseImage);
                    response.add(communityResponse);
                }
        );

        PageInfo pageInfo = new PageInfo(page, size, (int) communityList.getTotalElements(), communityList.getTotalPages());
        return new CommunityPagingDto<>(response, pageInfo);
    }

    public CommunityResponseDto getCommunityDetail(Long communityId) {
        Community findCommunity = verifiedCommunity(communityId);
        findCommunity.updateView();
        communityRepository.save(findCommunity);

        List<CommentResponseDto> comments = commentService.getComments(communityId);

        List<Image> image = imageService.findImage(findCommunity);
        List<String> responseImage = image.stream().map(img -> img.getImgUrl()).collect(Collectors.toList());

        return mapper.communityToResponseDto(findCommunity, responseImage, comments);
    }

    public void likeCommunity(Long communityId, Long userId) {
        Community community = verifiedCommunity(communityId);
        Member member = verifiedMember(userId);
        if (communityLikeRepository.findByMemberAndCommunity(community, member).isPresent()) {
            throw new IllegalArgumentException("ALREADY LIKE");
        }

        CommunityLike like = CommunityLike.builder().community(community).member(member).build();
        communityLikeRepository.save(like);
    }

    public void cancelLikeCommunity(Long communityId, Long userId) {
        Community community = verifiedCommunity(communityId);
        Member member = verifiedMember(userId);
        CommunityLike likeCommunity = communityLikeRepository.findByMemberAndCommunity(community, member)
                .orElseThrow(() -> new IllegalArgumentException("NOT FOUND LIKE POST"));
        communityLikeRepository.delete(likeCommunity);
    }


    public void removeCommunityPost(Long communityId) {
        Community findCommunity = verifiedCommunity(communityId);
        communityRepository.delete(findCommunity);
    }

    public Community verifiedCommunity(Long communityId) {
        return communityRepository.findById(communityId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND COMMUNITY POST"));
    }

    public Member verifiedMember(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND MEMBER"));
    }
}
