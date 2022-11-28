package com.kittyhiker.sikjipsa.community.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.kittyhiker.sikjipsa.community.dto.CommentResponseDto;
import com.kittyhiker.sikjipsa.community.dto.CommunityPagingDto;
import com.kittyhiker.sikjipsa.community.dto.CommunityPostDto;
import com.kittyhiker.sikjipsa.community.dto.CommunityResponseDto;
import com.kittyhiker.sikjipsa.community.enitity.Comment;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.community.enitity.CommunityLike;
import com.kittyhiker.sikjipsa.community.mapper.CommentMapper;
import com.kittyhiker.sikjipsa.community.mapper.CommunityMapper;
import com.kittyhiker.sikjipsa.community.repository.CommunityLikeRepository;
import com.kittyhiker.sikjipsa.community.repository.CommunityRepository;
import com.kittyhiker.sikjipsa.deal.dto.PageInfo;
import com.kittyhiker.sikjipsa.exception.BusinessLogicException;
import com.kittyhiker.sikjipsa.exception.ExceptionCode;
import com.kittyhiker.sikjipsa.image.dto.SavedImageDto;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.image.service.ImageService;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.mapper.MemberMapper;
import com.kittyhiker.sikjipsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
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
@Slf4j
@RequiredArgsConstructor
public class CommunityService {

    private final CommunityRepository communityRepository;
    private final CommunityLikeRepository communityLikeRepository;
    private final CommunityMapper mapper;
    private final MemberMapper memberMapper;
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
            images.stream().forEach(
                    (image) -> {
                        SavedImageDto savedImageDto = imageService.savedImageToS3(image);
                        Image newImage = Image.builder().originalName(savedImageDto.getOriginalFileName())
                                .imgName(savedImageDto.getFileName()).community(savedCommunity)
                                .imgUrl(savedImageDto.getFilePath()).build();
                        imageService.postImage(newImage);
                        responseImages.add(savedImageDto.getFilePath());
                    }
            );
        }

        MemberResponseDto responseMember = memberMapper
                .memberToMemberResponseDto(findMember, imageService.findImage(findMember));

        return mapper.communityToResponseDto(savedCommunity, responseImages, responseMember, 0L);
    }

    public CommunityResponseDto patchCommunity(Long communityId, List<MultipartFile> images, CommunityPostDto patchDto) throws IOException {

        Community findCommunity = verifiedCommunity(communityId);
        List<Image> findImage = imageService.findImage(findCommunity);
        List<String> responseImages=new ArrayList<>();
        if (images == null) {
            List<String> deleteImage = findImage.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
            deleteImage.stream().forEach(
                    img -> imageService.deleteImageFromS3(img)
            );
        } else {
            images.stream().forEach(
                    (image) -> {
                        SavedImageDto savedImageDto = imageService.savedImageToS3(image);
                        Image newImage = Image.builder().originalName(savedImageDto.getOriginalFileName())
                                .imgName(savedImageDto.getFileName()).community(findCommunity)
                                .imgUrl(savedImageDto.getFilePath()).build();
                        imageService.postImage(newImage);
                        responseImages.add(savedImageDto.getFilePath());
                    }
            );
        }

        findCommunity.update(patchDto);
        Community saved = communityRepository.save(findCommunity);
        Member findMember = saved.getMember();

        MemberResponseDto responseMember = memberMapper
                .memberToMemberResponseDto(findMember, imageService.findImage(findMember));

        return mapper.communityToResponseDto(saved, responseImages,
                responseMember, commentService.getCommentNum(saved));
    }

    public CommunityPagingDto<List> getPostList(int page, int size) {
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Community> communityList = communityRepository.findAll(pageable);
        List<CommunityResponseDto> response = new ArrayList<>();
        communityList.stream().forEach(
                c -> {
                    List<Image> images = imageService.findImage(c);
                    List<String> responseImage = images.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());

                    Member findMember = c.getMember();
                    MemberResponseDto responseMember = memberMapper
                            .memberToMemberResponseDto(findMember, imageService.findImage(findMember));
                    CommunityResponseDto communityResponseDto =
                            mapper.communityToResponseDto(c, responseImage,
                                    responseMember, commentService.getCommentNum(c));
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

                    Member findMember = c.getMember();
                    MemberResponseDto responseMember = memberMapper
                            .memberToMemberResponseDto(findMember, imageService.findImage(findMember));

                    CommunityResponseDto communityResponse = mapper
                            .communityToResponseDto(c, responseImage,
                                    responseMember, commentService.getCommentNum(c));
                    response.add(communityResponse);
                }
        );

        PageInfo pageInfo = new PageInfo(page, size, (int) communityList.getTotalElements(), communityList.getTotalPages());
        return new CommunityPagingDto<>(response, pageInfo);
    }

    public CommunityPagingDto<List> getMyPost(Long memberId, int page, int size) {
        Member writer = verifiedMember(memberId);
        Pageable pageable = PageRequest.of(page, size, Sort.by("createdAt").descending());
        Page<Community> myCommunity = communityRepository.findByMember(writer, pageable);

        List<CommunityResponseDto> response = new ArrayList<>();
        myCommunity.stream().forEach(
                c -> {
                    List<Image> images = imageService.findImage(c);
                    List<String> responseImage = images.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());

                    Member findMember = c.getMember();
                    MemberResponseDto responseMember = memberMapper
                            .memberToMemberResponseDto(findMember, imageService.findImage(findMember));

                    CommunityResponseDto communityResponse = mapper
                            .communityToResponseDto(c, responseImage,
                                    responseMember, commentService.getCommentNum(c));
                    response.add(communityResponse);
                }
        );

        PageInfo pageInfo = new PageInfo(page, size, (int) myCommunity.getTotalElements(), myCommunity.getTotalPages());
        return new CommunityPagingDto<>(response, pageInfo);
    }


    public CommunityResponseDto getCommunityDetail(Long communityId) {
        Community findCommunity = verifiedCommunity(communityId);
        findCommunity.updateView();
        Community savedCommunity = communityRepository.save(findCommunity);

        List<CommentResponseDto> comments = commentService.getComments(savedCommunity);

        List<Image> image = imageService.findImage(findCommunity);
        List<String> responseImage = image.stream().map(img -> img.getImgUrl()).collect(Collectors.toList());

        Member findMember = savedCommunity.getMember();
        MemberResponseDto responseMember = memberMapper
                .memberToMemberResponseDto(findMember, imageService.findImage(findMember));

        return mapper.communityToResponseDto(findCommunity, responseImage, responseMember,
                comments, commentService.getCommentNum(findCommunity));
    }

    public void likeCommunity(Long communityId, Long userId) {
        Community community = verifiedCommunity(communityId);
        Member member = verifiedMember(userId);
        if (communityLikeRepository.findByMemberAndCommunity(member, community).isPresent()) {
            throw new BusinessLogicException(ExceptionCode.ALREADY_LIKE);
        }
        community.updateLike();
        Community savedCommunity = communityRepository.save(community);
        CommunityLike like = CommunityLike.builder().community(savedCommunity).member(member).build();
        communityLikeRepository.save(like);
    }

    public void cancelLikeCommunity(Long communityId, Long userId) {
        Community community = verifiedCommunity(communityId);
        Member member = verifiedMember(userId);
        CommunityLike likeCommunity = communityLikeRepository.findByMemberAndCommunity(member, community)
                .orElseThrow(() -> new BusinessLogicException(ExceptionCode.NOT_FOUND_LIKE_POST));
        communityLikeRepository.delete(likeCommunity);
        community.cancelLike();
        communityRepository.save(community);
    }


    public void removeCommunityPost(Long communityId) {
        Community findCommunity = verifiedCommunity(communityId);
        communityRepository.delete(findCommunity);
    }

    public Community verifiedCommunity(Long communityId) {
        return communityRepository.findById(communityId).orElseThrow(()
                -> new BusinessLogicException(ExceptionCode.NOT_FOUND_COMMUNITY));
    }

    public Member verifiedMember(Long memberId) {
        return memberRepository.findById(memberId).orElseThrow(()
                -> new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
    }
}
