package com.kittyhiker.sikjipsa.image.entity;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.member.entity.MemberProfile;
import com.kittyhiker.sikjipsa.plant.entity.Plant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Image {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "image_id")
    private Long id;

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

    @OneToOne
    @JoinColumn(name = "member_profile_id")
    private MemberProfile memberProfile;

    public void setDeal(Deal deal) {
        this.deal = deal;
    }

    public void setCommunity(Community community) {
        this.community = community;
    }

    public void setExpertProfile (ExpertProfile expertProfile) {
        this.expertProfile = expertProfile;
    }

    public void setPlant (Plant plant) {
        this.plant = plant;
    }

    public void setMemberProfile (MemberProfile memberProfile) {
        this.memberProfile = memberProfile;
    }
}
