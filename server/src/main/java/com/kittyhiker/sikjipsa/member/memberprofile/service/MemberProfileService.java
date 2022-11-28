package com.kittyhiker.sikjipsa.member.memberprofile.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.kittyhiker.sikjipsa.exception.BusinessLogicException;
import com.kittyhiker.sikjipsa.exception.ExceptionCode;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.image.repository.ImageRepository;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.memberprofile.repository.MemberProfileRepository;
import com.kittyhiker.sikjipsa.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import net.coobird.thumbnailator.Thumbnailator;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.io.File;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class MemberProfileService {
	private final MemberProfileRepository memberProfileRepository;
	private final MemberRepository memberRepository;
	private final ImageRepository imageRepository;
//	@Value("${com.sikjipsa.upload.path}")
//	private String uploadPath;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final AmazonS3 amazonS3;

	public Member getProfile(Long memberId) {
		Member member = findVerifiedMember(memberId);
		return member;
	}

	private Member findVerifiedMember(Long memberId) {
		Optional<Member> optionalMember = memberRepository.findById(memberId);
		Member member = optionalMember.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
		return member;
	}

	public Member patchProfile(Member member, MultipartFile multipartFile) {
		Optional<Member> optionalMember = memberRepository.findById(member.getMemberId());
		Member findMember = optionalMember.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));

		Optional.ofNullable(member.getNickname())
				.ifPresent(findMember::setNickname);

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

		return findMember;
	}
}
