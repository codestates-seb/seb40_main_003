package com.kittyhiker.sikjipsa.image.repository;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.member.entity.MemberProfile;
import com.kittyhiker.sikjipsa.plant.entity.Plant;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface ImageRepository extends JpaRepository<Image, Long> {
    Optional<Image> findByMemberProfile(MemberProfile memberProfile);
    Optional<Image> findByExpertProfile(ExpertProfile expertProfile);
    Optional<Image> findByPlant(Plant plant);
    List<Image> findAllByDeal(Deal deal);
    List<Image> findAllByCommunity(Community community);
}
