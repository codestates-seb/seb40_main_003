package com.kittyhiker.sikjipsa.image.entity;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.plant.entity.Plant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Builder
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long imageId;

    private String imgName;

    private String originalName;

    private String imgUrl;

    private String isRepImg;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "deal_id")
    private Deal deal;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "community_id")
    private Community community;

    @OneToOne
    @JoinColumn(name = "expert_profile_id")
    private ExpertProfile expertProfile;

    @OneToOne
    @JoinColumn(name = "plant_id")
    private Plant plant;

//    @OneToOne
//    @JoinColumn(name = "member_profile_id")
//    private MemberProfile memberProfile;

    @OneToOne
    @JoinColumn(name = "member_id")
    private Member member;

    public Image(String imgName, String originalName, String imgUrl, String isRepImg, Plant plant) {
        this.imgName = imgName;
        this.originalName = originalName;
        this.imgUrl = imgUrl;
        this.isRepImg = isRepImg;
        this.plant = plant;
    }

    public Image(String imgName, String originalName, String imgUrl, String isRepImg, Member member) {
        this.imgName = imgName;
        this.originalName = originalName;
        this.imgUrl = imgUrl;
        this.isRepImg = isRepImg;
        this.member = member;
    }

    public Image(String imgName, String originalName, String imgUrl, String isRepImg, ExpertProfile expertProfile) {
        this.imgName = imgName;
        this.originalName = originalName;
        this.imgUrl = imgUrl;
        this.isRepImg = isRepImg;
        this.expertProfile = expertProfile;
    }
}
