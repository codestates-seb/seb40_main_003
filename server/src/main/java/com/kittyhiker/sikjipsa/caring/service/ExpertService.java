package com.kittyhiker.sikjipsa.caring.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.caring.entity.ExpertReview;
import com.kittyhiker.sikjipsa.caring.entity.MemberLikeExpert;
import com.kittyhiker.sikjipsa.caring.repository.*;
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

//	@Value("${com.sikjipsa.upload.path}")
//	private String uploadPath;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final AmazonS3 amazonS3;

	public ExpertProfile postExpert(ExpertProfile expertProfile, MultipartFile multipartFile, Long memberId) {
		verifyExists(memberId);

		expertProfile.setMember(memberRepository.getReferenceById(memberId));

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

	public ExpertProfile patchExpert(ExpertProfile expertProfile, MultipartFile multipartFile) {
		ExpertProfile findExpertProfile = findVerifiedExpert(expertProfile.getExpertId());

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

	public void deleteExpert(Long expertId) {
		ExpertProfile expertProfile = findVerifiedExpert(expertId);

		techTagRepository.deleteAll(expertProfile.getTechTags());
		areaTagRepository.deleteAll(expertProfile.getAreaTags());
		expertReviewRepository.deleteAll(expertProfile.getExpertReviews());
		// TODO
		memberLikeExpertRepository.deleteAll(expertProfile.getMemberLikeExperts());
		imageRepository.delete(expertProfile.getImage());
		expertRepository.delete(expertProfile);
	}

	private void verifyExists(Long memberId) {
		Optional<ExpertProfile> expertProfile = expertRepository.findByMember_MemberId(memberId);
		if (expertProfile.isPresent()) {
			throw new BusinessLogicException(ExceptionCode.EXPERT_PROFILE_EXISTS);
		}
	}

	private ExpertProfile findVerifiedExpert(Long expertId) {
		Optional<ExpertProfile> optionalExpertProfile = expertRepository.findById(expertId);
		ExpertProfile expertProfile = optionalExpertProfile.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.EXPERT_PROFILE_NOT_FOUND));
		return expertProfile;
	}

	// 전문가 찜
	public MemberLikeExpert postExpertLike(MemberLikeExpert memberLikeExpert, Long memberId, Long expertId) {
		ExpertProfile expertProfile = findVerifiedExpert(expertId);
		Member member = memberRepository.getReferenceById(memberId);
		// 좋아요가 존재하는가?
		boolean isEmpty = memberLikeExpertRepository.findByMemberAndExpertProfile(member, expertProfile).isEmpty();
		if (isEmpty) {
			expertProfile.setLikes(expertProfile.getLikes() + 1L);
			memberLikeExpert.setMember(memberRepository.getReferenceById(1L));
			memberLikeExpert.setExpertProfile(expertRepository.getReferenceById(expertId));
		} else {
			throw new BusinessLogicException(ExceptionCode.EXPERT_LIKE_EXISTS);
		}
		return memberLikeExpertRepository.save(memberLikeExpert);
	}

	public Page<MemberLikeExpert> getExpertLikes(int page, int size) {
		return memberLikeExpertRepository.findAll(PageRequest.of(page, size, Sort.by("memberLikeExpertId").descending()));
	}

	public void deleteExpertLike(Long expertId, Long memberLikeExpertId, Long memberId) {
		ExpertProfile expertProfile = findVerifiedExpert(expertId);
		Member member = memberRepository.getReferenceById(memberId);
		boolean isEmpty = memberLikeExpertRepository.findByMemberAndExpertProfile(member, expertProfile).isEmpty();
		if (!isEmpty) {
			expertProfile.setLikes(expertProfile.getLikes() - 1L);

			MemberLikeExpert memberLikeExpert = findVerifiedExpertLike(memberLikeExpertId);
			memberLikeExpertRepository.delete(memberLikeExpert);
		}
	}

	private MemberLikeExpert findVerifiedExpertLike(Long memberLikeExpertId) {
		Optional<MemberLikeExpert> optionalMemberLikeExpert = memberLikeExpertRepository.findById(memberLikeExpertId);
		MemberLikeExpert memberLikeExpert = optionalMemberLikeExpert.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.MEMBER_LIKE_EXPERT_NOT_FOUND));
		return memberLikeExpert;
	}

	public ExpertReview postExpertSuccess(ExpertReview expertReview, Long expertId, Long memberId) {
		Member member = memberRepository.getReferenceById(memberId);
		expertReview.setMember(member);

		ExpertProfile expertProfile = expertRepository.getReferenceById(expertId);
		expertReview.setExpertProfile(expertProfile);
		return expertReviewRepository.save(expertReview);
	}

//	public Page<ExpertProfile> getExpertSuccess(int page, int size) {
//		return expertRepository.findAll(PageRequest.of(page, size, Sort.by("expertId").descending()));
//	}
}
