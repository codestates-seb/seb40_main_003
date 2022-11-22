package com.kittyhiker.sikjipsa.deal.service;

import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.kittyhiker.sikjipsa.deal.dto.DealPostDto;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.image.service.ImageService;
import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class DealImageService {

    private final ImageService imageService;
    @Value("${cloud.aws.s3.bucket}")
    private String bucket;
    private final AmazonS3 amazonS3;

    public List<String> postImage(List<MultipartFile> images) throws IOException {

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
                                    .imgName(fileName).imgUrl(filePath).build();
                            imageService.postImage(newImage);
                            responseImages.add(filePath);
                        } catch (IOException e) {
                            e.printStackTrace();
                        }
                    }
            );
        }

        return responseImages;
    }
}
