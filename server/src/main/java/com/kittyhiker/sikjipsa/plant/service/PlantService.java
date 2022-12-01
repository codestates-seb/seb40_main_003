package com.kittyhiker.sikjipsa.plant.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.kittyhiker.sikjipsa.exception.BusinessLogicException;
import com.kittyhiker.sikjipsa.exception.ExceptionCode;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.image.repository.ImageRepository;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.repository.MemberRepository;
import com.kittyhiker.sikjipsa.plant.entity.Plant;
import com.kittyhiker.sikjipsa.plant.repository.PlantRepository;
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
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@Transactional
@RequiredArgsConstructor
public class PlantService {
	private final PlantRepository plantRepository;
	private final MemberRepository memberRepository;
	private final ImageRepository imageRepository;

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final AmazonS3 amazonS3;


	public Plant postPlant(Plant plant, MultipartFile multipartFile, Long memberId) {
		Member member = findVerifiedMember(memberId);
		plant.setMember(member);

		if (multipartFile != null) {
			String originalName = multipartFile.getOriginalFilename();
			String uuid = UUID.randomUUID().toString();
			String fileName = uuid + "_" + originalName;
			try {
				ObjectMetadata objectMetadata = new ObjectMetadata();
				objectMetadata.setContentLength(multipartFile.getSize());
				amazonS3.putObject(bucket, fileName, multipartFile.getInputStream(), objectMetadata);
				String filePath = amazonS3.getUrl(bucket, fileName).toString();

				Image image = new Image(fileName, originalName, filePath, "empty", plant);
				plant.setImage(image);
				imageRepository.save(image);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return plantRepository.save(plant);
	}

	public Plant patchPlant(Plant plant, MultipartFile multipartFile, Long plantId, Long memberId) {
		Member member = findVerifiedMember(memberId);
		Plant findPlant = findVerifiedPlant(plantId);

		if (findPlant.getMember() != member) {
			throw new BusinessLogicException(ExceptionCode.MEMBER_FORBIDDEN);
		}

		Optional.ofNullable(plant.getName())
				.ifPresent(findPlant::setName);

		Optional.ofNullable(plant.getType())
				.ifPresent(findPlant::setType);

		Optional.of(plant.getYears())
				.ifPresent(findPlant::setYears);

		if (multipartFile != null) {
			if (findPlant.getImage() != null) {
				imageRepository.delete(findPlant.getImage());
			}

			String originalName = multipartFile.getOriginalFilename();
			String uuid = UUID.randomUUID().toString();
			String fileName = uuid + "_" + originalName;
			try {
				ObjectMetadata objectMetadata = new ObjectMetadata();
				objectMetadata.setContentLength(multipartFile.getSize());
				amazonS3.putObject(bucket, fileName, multipartFile.getInputStream(), objectMetadata);
				String filePath = amazonS3.getUrl(bucket, originalName).toString();

				Image image = new Image(fileName, originalName, filePath, "empty", findPlant);
				findPlant.setImage(image);
				imageRepository.save(image);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
		return findPlant;
	}

	public List<Plant> getPlants(Long memberId) {
		return plantRepository.findAllByMember_MemberIdOrderByPlantIdDesc(memberId);
	}

	public void deletePlant(Long plantId, Long memberId) {
		Member member = findVerifiedMember(memberId);
		Plant findPlant = findVerifiedPlant(plantId);

		if (findPlant.getMember() != member) {
			throw new BusinessLogicException(ExceptionCode.MEMBER_FORBIDDEN);
		}

		imageRepository.delete(findPlant.getImage());
		plantRepository.delete(findPlant);
	}

	private Member findVerifiedMember(Long memberId) {
		Optional<Member> optionalMember = memberRepository.findById(memberId);
		Member member = optionalMember.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.MEMBER_NOT_FOUND));
		return member;
	}

	private Plant findVerifiedPlant(Long plantId) {
		Optional<Plant> optionalPlant = plantRepository.findById(plantId);
		Plant plant = optionalPlant.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.PLANT_NOT_FOUND));
		return plant;
	}
}
