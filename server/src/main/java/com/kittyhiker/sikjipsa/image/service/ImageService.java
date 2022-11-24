package com.kittyhiker.sikjipsa.image.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.DeleteObjectRequest;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.image.dto.SavedImageDto;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.image.repository.ImageRepository;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.entity.MemberProfile;
import com.kittyhiker.sikjipsa.plant.entity.Plant;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;

    public SavedImageDto savedImageToS3(MultipartFile image) {
        UUID uuid = UUID.randomUUID();
        String originalFilename = image.getOriginalFilename();
        String fileName = uuid + "_" + originalFilename;
        String filePath="";
        try {
            ObjectMetadata objMeta = new ObjectMetadata();
            objMeta.setContentLength(image.getSize());
            amazonS3.putObject(bucket, fileName, image.getInputStream(), objMeta);
            filePath = amazonS3.getUrl(bucket, fileName).toString();
        } catch (IOException e) {
            e.printStackTrace();
        }
        return SavedImageDto.builder().originalFileName(originalFilename).fileName(fileName).filePath(filePath).build();
    }

    public void deleteImageFromS3(String imagePath) {
        imageRepository.deleteByImgUrl(imagePath);
        amazonS3.deleteObject(new DeleteObjectRequest(bucket, imagePath));
    }

    public void postImage(Image image) {
        imageRepository.save(image);
    }

    public Image findImage(ExpertProfile expertProfile) {
        Image image = imageRepository.findByExpertProfile(expertProfile).orElseThrow(()
                -> new IllegalArgumentException("NOT FOUND IMAGE"));
        return image;
    }

//    public Image findImage(Member member) {
//        Image image = imageRepository.findByMember(member).orElseThrow(()
//                -> new IllegalArgumentException("NOT FOUND IMAGE"));
//        return image;
//    }
    public String findImage(Member member) {
        Optional<Image> image = imageRepository.findByMember(member);
        if (image.isPresent()) return image.get().getImgUrl();
        else return "";
    }


    public Image findImage(Plant plant) {
        Image image = imageRepository.findByPlant(plant).orElseThrow(()
                -> new IllegalArgumentException("NOT FOUND IMAGE"));
        return image;
    }

    public List<Image> findImage(Community community) {
        List<Image> imageList = imageRepository.findAllByCommunity(community);
        return imageList;
    }

    public List<Image> findImage(Deal deal) {
        List<Image> imageList = imageRepository.findAllByDeal(deal);
        return imageList;
    }

}
