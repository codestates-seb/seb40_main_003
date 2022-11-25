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
//	@Value("${com.sikjipsa.upload.path}")// import 시에 springframework로 시작하는 value, 설정 정보를 읽어 변수의 값으로 사용
//	private String uploadPath;// 나중에 파일을 업로드하는 경로로 사용

	@Value("${cloud.aws.s3.bucket}")
	private String bucket;
	private final AmazonS3 amazonS3;


	public Plant postPlant(Plant plant, MultipartFile multipartFile, Long memberId) {
		Member member = memberRepository.findById(memberId).orElseThrow(() -> new IllegalArgumentException("NOT FOUND MEMBER"));
		plant.setMember(member);

		if (multipartFile != null) {
			String originalName = multipartFile.getOriginalFilename();
			String uuid = UUID.randomUUID().toString();
//			Path path = Paths.get(uploadPath, uuid + "_" + originalName);
			String fileName = uuid + "_" + originalName;
			try {
//				multipartFile.transferTo(path);
//				if (Files.probeContentType(path).startsWith("image")) {
//					File thumbFile = new File(uploadPath, "s_" + uuid + "_" + originalName);
//					Thumbnailator.createThumbnail(path.toFile(), thumbFile, 200, 200);
//				}
				ObjectMetadata objectMetadata = new ObjectMetadata();
				objectMetadata.setContentLength(multipartFile.getSize());
				amazonS3.putObject(bucket, fileName, multipartFile.getInputStream(), objectMetadata);
				String filePath = amazonS3.getUrl(bucket, originalName).toString();

				Image image = new Image(fileName, originalName, filePath, "empty", plant);
				plant.setImage(image);
				imageRepository.save(image);
			} catch (IOException e) {
				e.printStackTrace();
			}
		}

		return plantRepository.save(plant);
	}

	public Plant patchPlant(Plant plant, MultipartFile multipartFile) {
		Plant findPlant = findVerifiedPlant(plant.getPlantId());

		Optional.ofNullable(plant.getName())
				.ifPresent(findPlant::setName);

		Optional.ofNullable(plant.getType())
				.ifPresent(findPlant::setType);

		Optional.of(plant.getDays())
				.ifPresent(findPlant::setDays);

		if (multipartFile != null) {
			if (findPlant.getImage() != null) {
				imageRepository.delete(findPlant.getImage());
			}

			String originalName = multipartFile.getOriginalFilename();
			String uuid = UUID.randomUUID().toString();
//			Path path = Paths.get(uploadPath, uuid + "_" + originalName);
			String fileName = uuid + "_" + originalName;
			try {
//				multipartFile.transferTo(path);
//				if (Files.probeContentType(path).startsWith("image")) {
//					File thumbFile = new File(uploadPath, "s_" + uuid + "_" + originalName);
//					Thumbnailator.createThumbnail(path.toFile(), thumbFile, 200, 200);
//				}
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

	private Plant findVerifiedPlant(Long id) {
		Optional<Plant> optionalPlant = plantRepository.findById(id);
		Plant plant = optionalPlant.orElseThrow(() ->
				new BusinessLogicException(ExceptionCode.PLANT_NOT_FOUND));
		return plant;
	}

	public List<Plant> getPlants() {
		return plantRepository.findAllByOrderByPlantIdDesc();
	}

	public void deletePlant(Long plantId) {
		Plant plant = findVerifiedPlant(plantId);
		imageRepository.delete(plant.getImage());
		plantRepository.delete(plant);
	}
}
