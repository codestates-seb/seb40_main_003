package com.kittyhiker.sikjipsa.caring.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.kittyhiker.sikjipsa.caring.dto.ExpertSuccessDto;
import com.kittyhiker.sikjipsa.caring.dto.ExpertSuccessResponseDto;
import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.caring.entity.ExpertReview;
import com.kittyhiker.sikjipsa.caring.entity.ExpertSuccess;
import com.kittyhiker.sikjipsa.caring.entity.MemberLikeExpert;
import com.kittyhiker.sikjipsa.caring.mapper.ExpertSuccessMapper;
import com.kittyhiker.sikjipsa.caring.repository.*;
import com.kittyhiker.sikjipsa.chatting.entity.ExpertChatRoom;
import com.kittyhiker.sikjipsa.chatting.repository.ExpertChatRepository;
import com.kittyhiker.sikjipsa.exception.BusinessLogicException;
import com.kittyhiker.sikjipsa.exception.ExceptionCode;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.image.repository.ImageRepository;
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

import javax.transaction.Transactional;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class ExpertService {
	private final ExpertRepository expertRepository;
	private final MemberRepository memberRepository;
	private final MemberLikeExpertRepository memberLikeExpertRepository;
	private final ImageRepository imageRepository;
	private final TechTagRepository techTagRepository;
	private final AreaTagRepository areaTagRepository;
	private final ExpertReviewRepository expertReviewRepository;
	private final ExpertSuccessRepository expertSuccessRepository;
	private final ExpertSuccessMapper expertSuccessMapper;
	private final ExpertChatRepository expertChatRepository;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final AmazonS3 amazonS3;

	public ExpertProfile postExpert(ExpertProfile expertProfile, MultipartFile multipartFile, Long memberId) {
		verifyExpert(memberId);
		Member findMember = findVerifiedMember(memberId);
		findMember.addRole("ROLE_USER, ROLE_EXPERT");

		expertProfile.setMember(findMember);

		if (multipartFile != null) {
			String originalName = multipartFile.getOriginalFilename();
			String uuid = UUID.randomUUID().toString();
			String fileName = uuid + "_" + originalName;
			try {
				ObjectMetadata objectMetadata = new ObjectMetadata();
				objectMetadata.setContentLength(multipartFile.getSize());
				amazonS3.putObject(bucket, fileName, multipartFile.getInputStream(), objectMetadata);
				String filePath = amazonS3.getUrl(bucket, fileName).toString();

				Image image = new Image(fileName, originalName, filePath, "empty", expertProfile);
				expertProfile.setImage(image);
				imageRepository.save(image);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		expertProfile.setView(0L);
		expertProfile.setLikes(0L);
		return expertRepository.save(expertProfile);
	}

	public ExpertProfile patchExpert(ExpertProfile expertProfile, MultipartFile multipartFile, Long expertId, Long memberId) {
		Member member = findVerifiedMember(memberId);
		ExpertProfile findExpertProfile = findVerifiedExpert(expertId);

		if (findExpertProfile.getMember() != member) {
			throw new BusinessLogicException(ExceptionCode.MEMBER_FORBIDDEN);
		}

		Optional.ofNullable(expertProfile.getName())
				.ifPresent(findExpertProfile::setName);

		Optional.of(expertProfile.getAge())
				.ifPresent(findExpertProfile::setAge);

		Optional.of(expertProfile.getGender())
				.ifPresent(findExpertProfile::setGender);

		Optional.ofNullable(expertProfile.getSimpleContent())
				.ifPresent(findExpertProfile::setSimpleContent);

		Optional.ofNullable(expertProfile.getDetailContent())
				.ifPresent(findExpertProfile::setDetailContent);

		Optional.of(expertProfile.getPrice())
				.ifPresent(findExpertProfile::setPrice);

		Optional.ofNullable(expertProfile.getExtra())
				.ifPresent(findExpertProfile::setExtra);

		Optional.ofNullable(expertProfile.getAddress())
				.ifPresent(findExpertProfile::setAddress);

		Optional.ofNullable(expertProfile.getDetailContent())
				.ifPresent(findExpertProfile::setDetailContent);

		// 기술 태그 변경
		Optional.ofNullable(expertProfile.getTechTags())
				.ifPresent(techTags -> {
					techTagRepository.deleteAll(findExpertProfile.getTechTags());
					findExpertProfile.setTechTags(techTags);
				});

		// 지역 태그 변경
		Optional.ofNullable(expertProfile.getAreaTags())
				.ifPresent(areaTags -> {
					areaTagRepository.deleteAll(findExpertProfile.getAreaTags());
					findExpertProfile.setAreaTags(areaTags);
				});

		if (multipartFile != null) {
			if (findExpertProfile.getImage() != null) {
				imageRepository.delete(findExpertProfile.getImage());
			}

			String originalName = multipartFile.getOriginalFilename();
			String uuid = UUID.randomUUID().toString();
			String fileName = uuid + "_" + originalName;
			try {
				ObjectMetadata objectMetadata = new ObjectMetadata();
				objectMetadata.setContentLength(multipartFile.getSize());
				amazonS3.putObject(bucket, fileName, multipartFile.getInputStream(), objectMetadata);
				String filePath = amazonS3.getUrl(bucket, fileName).toString();

				Image image = new Image(fileName, originalName, filePath, "empty", findExpertProfile);
				findExpertProfile.setImage(image);
				imageRepository.save(image);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return findExpertProfile;
	}

	public ExpertProfile getIsExpert(Long memberId) {
		Optional<ExpertProfile> optionalExpertProfile = expertRepository.findByMember_MemberId(memberId);
		return optionalExpertProfile.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.EXPERT_PROFILE_NOT_FOUND));
	}

	public ExpertProfile getExpert(Long expertId) {
		ExpertProfile expertProfile = findVerifiedExpert(expertId);
		expertProfile.setView(expertProfile.getView() + 1L);
		return expertProfile;
	}

	public Page<ExpertProfile> getExperts(int page, int size) {
		return expertRepository.findAll(PageRequest.of(page, size, Sort.by("expertId").descending()));
	}

	public Page<ExpertProfile> getExpertsByKeyword(String keyword, int page, int size) {
		Pageable pageable = PageRequest.of(page, size, Sort.by("expertId").descending());
		Page<ExpertProfile> expertProfiles = expertRepository.findByTechTags_TechTagNameContaining(keyword, pageable);
		return expertProfiles;
	}

	public Page<ExpertProfile> getExpertsByArea(String area, int page, int size) {
		Pageable pageable = PageRequest.of(page, size, Sort.by("expertId").descending());
		Page<ExpertProfile> expertProfiles = expertRepository.findByAreaTags_AreaTagNameContaining(area, pageable);
		return expertProfiles;
	}

	public Page<ExpertProfile> getExpertsByKeywordAndArea(String keyword, String area, int page, int size) {
		Pageable pageable = PageRequest.of(page, size, Sort.by("expertId").descending());
		Page<ExpertProfile> expertProfiles = expertRepository.findByTechTags_TechTagNameContainingAndAreaTags_AreaTagNameContaining(keyword, area, pageable);
		return expertProfiles;
	}

	public void deleteExpert(Long expertId, Long memberId) {
		Member member = findVerifiedMember(memberId);
		ExpertProfile findExpertProfile = findVerifiedExpert(expertId);

		if (findExpertProfile.getMember() != member) {
			throw new BusinessLogicException(ExceptionCode.MEMBER_FORBIDDEN);
		}

		techTagRepository.deleteAll(findExpertProfile.getTechTags());
		areaTagRepository.deleteAll(findExpertProfile.getAreaTags());
		expertReviewRepository.deleteAll(findExpertProfile.getExpertReviews());
		memberLikeExpertRepository.deleteAll(findExpertProfile.getMemberLikeExperts());
		imageRepository.delete(findExpertProfile.getImage());
		expertRepository.delete(findExpertProfile);
	}

	// 전문가 찜
	public MemberLikeExpert postExpertLike(MemberLikeExpert memberLikeExpert, Long memberId, Long expertId) {
		ExpertProfile expertProfile = findVerifiedExpert(expertId);
		Member member = findVerifiedMember(memberId);
		// 좋아요가 존재하는가?
		boolean isEmpty = memberLikeExpertRepository.findByMemberAndExpertProfile(member, expertProfile).isEmpty();
		if (isEmpty) {
			expertProfile.setLikes(expertProfile.getLikes() + 1L);
			memberLikeExpert.setMember(member);
			memberLikeExpert.setExpertProfile(expertProfile);
			return memberLikeExpertRepository.save(memberLikeExpert);
		} else {
			throw new BusinessLogicException(ExceptionCode.EXPERT_LIKE_EXISTS);
		}
	}

	public Page<MemberLikeExpert> getExpertLikes(int page, int size, Long memberId) {
		verifyMember(memberId);
		return memberLikeExpertRepository.findAllByMember_MemberId(
				memberId, PageRequest.of(page, size, Sort.by("memberLikeExpertId").descending()));
	}

	public Boolean getIsExpertLike(Long expertId, Long memberId) {
		ExpertProfile expertProfile = findVerifiedExpert(expertId);
		Member member = findVerifiedMember(memberId);
		return memberLikeExpertRepository.existsByExpertProfileAndMember(expertProfile, member);
	}

	public void deleteExpertLike(Long expertId, Long memberLikeExpertId, Long memberId) {
		ExpertProfile expertProfile = findVerifiedExpert(expertId);
		Member member = findVerifiedMember(memberId);
		boolean isEmpty = memberLikeExpertRepository.findByMemberAndExpertProfile(member, expertProfile).isEmpty();
		if (!isEmpty) {
			expertProfile.setLikes(expertProfile.getLikes() - 1L);
			MemberLikeExpert memberLikeExpert = findVerifiedExpertLike(memberLikeExpertId);
			memberLikeExpertRepository.delete(memberLikeExpert);
		} else {
			throw new BusinessLogicException(ExceptionCode.EXPERT_LIKE_NOT_FOUND);
		}
	}

	public ExpertReview postExpertReview(ExpertReview expertReview, Long expertId, Long memberId) {
		Member member = findVerifiedMember(memberId);
		expertReview.setMember(member);

		ExpertProfile expertProfile = findVerifiedExpert(expertId);
		expertReview.setExpertProfile(expertProfile);
		return expertReviewRepository.save(expertReview);
	}

	public Page<ExpertProfile> getExpertSuccess(int page, int size, Long memberId) {
		Pageable pageable = PageRequest.of(page, size, Sort.by("expertReviews_expertReviewId").descending());
		return expertRepository.findAllByExpertReviews_Member_MemberId(memberId, pageable);
	}

	public ExpertSuccessResponseDto postExpertSuccess(ExpertSuccessDto expertSuccessDto) {
		ExpertProfile expertProfile = findVerifiedExpert(expertSuccessDto.getExpertId());
		Member member = findVerifiedMember(expertSuccessDto.getBuyerId());
		if (expertSuccessRepository.findByExpertProfileAndBuyer(expertProfile, member).isPresent()) {
			throw new BusinessLogicException(ExceptionCode.ALREADY_SUCCESS_STATE);
		}
		ExpertChatRoom expertChatRoom = findVerifiedExpertChatRoom(expertProfile, member);
		expertChatRoom.updateState();
		expertProfile.setUseNum(expertProfile.getUseNum() + 1);
		ExpertSuccess expertSuccess = expertSuccessMapper.toExpertSuccess(expertProfile, member, expertProfile.getMember());
		ExpertSuccess savedSuccess = expertSuccessRepository.save(expertSuccess);
		return expertSuccessMapper.toExpertSuccessResponseDto(savedSuccess, expertSuccessDto.getExpertId(), expertSuccessDto.getBuyerId());
	}

	private void verifyExpert(Long memberId) {
		Optional<ExpertProfile> expertProfile = expertRepository.findByMember_MemberId(memberId);
		if (expertProfile.isPresent()) {
			throw new BusinessLogicException(ExceptionCode.EXPERT_PROFILE_EXISTS);
		}
	}

	private void verifyMember(Long memberId) {
		Optional<Member> optionalMember = memberRepository.findById(memberId);
		if (optionalMember.isEmpty()) {
			throw new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND);
		}
	}

	public ExpertProfile findVerifiedExpert(Long expertId) {
		Optional<ExpertProfile> optionalExpertProfile = expertRepository.findById(expertId);
		ExpertProfile expertProfile = optionalExpertProfile.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.EXPERT_PROFILE_NOT_FOUND));
		return expertProfile;
	}

	private Member findVerifiedMember(Long memberId) {
		Optional<Member> optionalMember = memberRepository.findById(memberId);
		Member member = optionalMember.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
		return member;
	}

	private MemberLikeExpert findVerifiedExpertLike(Long memberLikeExpertId) {
		Optional<MemberLikeExpert> optionalMemberLikeExpert = memberLikeExpertRepository.findById(memberLikeExpertId);
		MemberLikeExpert memberLikeExpert = optionalMemberLikeExpert.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.MEMBER_LIKE_EXPERT_NOT_FOUND));
		return memberLikeExpert;
	}

	private ExpertChatRoom findVerifiedExpertChatRoom(ExpertProfile expertProfile, Member member) {
		Optional<ExpertChatRoom> optionalExpertChatRoom = expertChatRepository.findByExpertProfileAndBuyer(expertProfile, member);
		ExpertChatRoom expertChatRoom = optionalExpertChatRoom.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.EXPERT_CHAT_ROOM_NOT_FOUND));
		return expertChatRoom;
	}
}
