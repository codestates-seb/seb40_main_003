package com.kittyhiker.sikjipsa.image.service;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.image.repository.ImageRepository;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.entity.MemberProfile;
import com.kittyhiker.sikjipsa.plant.entity.Plant;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ImageService {

    private final ImageRepository imageRepository;

    public void postImage(Image image) {
        imageRepository.save(image);
    }

    public Image findImage(ExpertProfile expertProfile) {
        Image image = imageRepository.findByExpertProfile(expertProfile).orElseThrow(()
                -> new IllegalArgumentException("NOT FOUND IMAGE"));
        return image;
    }

    public Image findImage(Member member) {
        Image image = imageRepository.findByMember(member).orElseThrow(()
                -> new IllegalArgumentException("NOT FOUND IMAGE"));
        return image;
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
