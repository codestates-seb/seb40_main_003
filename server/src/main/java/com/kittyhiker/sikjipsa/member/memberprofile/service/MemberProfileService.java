package com.kittyhiker.sikjipsa.member.memberprofile.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.mapper.DealMapper;
import com.kittyhiker.sikjipsa.exception.BusinessLogicException;
import com.kittyhiker.sikjipsa.exception.ExceptionCode;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.image.repository.ImageRepository;
import com.kittyhiker.sikjipsa.image.service.ImageService;
import com.kittyhiker.sikjipsa.member.dto.CommunityMemberResponse;
import com.kittyhiker.sikjipsa.member.dto.MemberResponseDto;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.entity.MemberInformation;
import com.kittyhiker.sikjipsa.member.memberprofile.dto.ProfileResponseDto;
import com.kittyhiker.sikjipsa.member.memberprofile.mapper.MemberProfileMapper;
import com.kittyhiker.sikjipsa.member.memberprofile.repository.MemberProfileRepository;
import com.kittyhiker.sikjipsa.member.repository.MemberInfoRepository;
import com.kittyhiker.sikjipsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.*;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberProfileService {
	private final MemberProfileRepository memberProfileRepository;
	private final MemberInfoRepository memberInfoRepository;
	private final MemberRepository memberRepository;
	private final ImageRepository imageRepository;
	private final ImageService imageService;
	private final DealMapper dealMapper;
	private final MemberProfileMapper memberProfileMapper;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final AmazonS3 amazonS3;

	public ProfileResponseDto getProfile(Long memberId) {
		Member verifiedMember = findVerifiedMember(memberId);
		List<DealResponseDto> response = new ArrayList<>();
		verifiedMember.getDeals().stream().forEach(
				deal -> {
					List<Image> images = imageService.findImage(deal);
					List<String> responseImage = images.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
					Member dealMember = deal.getMember();
					CommunityMemberResponse responseMember = CommunityMemberResponse.builder()
							.memberId(dealMember.getMemberId())
							.nickname(dealMember.getNickname())
							.image(imageService.findImageByMember(dealMember)).build();
					DealResponseDto dealResponseDto = dealMapper.dealToDealResponseDto(deal, responseImage, responseMember);
					if (Objects.equals(dealResponseDto.getMember().getMemberId(), dealMember.getMemberId())) {
						response.add(dealResponseDto);
					}
				}
		);
		ProfileResponseDto profileResponseDto = memberProfileMapper.toProfileResponseDto(verifiedMember);
		profileResponseDto.setDeals(response);
		return profileResponseDto;
	}

	public ProfileResponseDto patchProfile(Member member, MultipartFile multipartFile, Long memberId, Long token) {
		Member findMemberByToken = findVerifiedMember(token);
		Member findMember = findVerifiedMember(memberId);

		if (findMember != findMemberByToken) {
			throw new BusinessLogicException(ExceptionCode.MEMBER_FORBIDDEN);
		}

//		Optional.ofNullable(member.getPassword())
//				.ifPresent(findMember::setPassword);
//
//		Optional.ofNullable(member.getEmail())
//				.ifPresent(findMember::setEmail);

		Optional.ofNullable(member.getNickname())
				.ifPresent(findMember::setNickname);

		Optional.ofNullable(member.getMemberProfile())
				.ifPresent(memberProfile -> {
					memberProfileRepository.delete(findMember.getMemberProfile());
					findMember.setMemberProfile(memberProfile);
				});

		if (findMember.getMemberInformation() != null) {
			Optional.ofNullable(member.getMemberInformation())
					.ifPresent(memberInformation -> {
						MemberInformation memberInfo = findVerifiedMemberInfo(findMember);
						memberInfo.setAddress(memberInformation.getAddress());
						findMember.setMemberInformation(memberInfo);
					});
		}

		if (multipartFile != null) {
			if (findMember.getImage() != null) {
				imageRepository.delete(findMember.getImage());
			}

			String originalName = multipartFile.getOriginalFilename();
			String uuid = UUID.randomUUID().toString();
			String fileName = uuid + "_" + originalName;
			try {
				ObjectMetadata objectMetadata = new ObjectMetadata();
				objectMetadata.setContentLength(multipartFile.getSize());
				amazonS3.putObject(bucket, fileName, multipartFile.getInputStream(), objectMetadata);
				String filePath = amazonS3.getUrl(bucket, fileName).toString();

				Image image = new Image(fileName, originalName, filePath, "empty", findMember);
				findMember.setImage(image);
				imageRepository.save(image);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		List<DealResponseDto> response = new ArrayList<>();
		findMember.getDeals().stream().forEach(
				deal -> {
					List<Image> images = imageService.findImage(deal);
					List<String> responseImage = images.stream().map(i -> i.getImgUrl()).collect(Collectors.toList());
					Member dealMember = deal.getMember();
					CommunityMemberResponse responseMember = CommunityMemberResponse.builder()
							.memberId(dealMember.getMemberId())
							.nickname(dealMember.getNickname())
							.image(imageService.findImageByMember(dealMember)).build();
					DealResponseDto dealResponseDto = dealMapper.dealToDealResponseDto(deal, responseImage, responseMember);
					if (Objects.equals(dealResponseDto.getMember().getMemberId(), dealMember.getMemberId())) {
						response.add(dealResponseDto);
					}
				}
		);
		ProfileResponseDto profileResponseDto = memberProfileMapper.toProfileResponseDto(findMember);
		profileResponseDto.setDeals(response);

		return profileResponseDto;
	}

	private Member findVerifiedMember(Long memberId) {
		Optional<Member> optionalMember = memberRepository.findById(memberId);
		Member member = optionalMember.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
		return member;
	}

	private MemberInformation findVerifiedMemberInfo(Member member) {
		Optional<MemberInformation> optionalMemberInfo = memberInfoRepository.findByMember(member);
		MemberInformation memberInfo = optionalMemberInfo.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.MEMBER_INFO_NOT_FOUND));
		return memberInfo;
	}
}
