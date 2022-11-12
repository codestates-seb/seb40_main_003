package com.kittyhiker.sikjipsa.plant.entity;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.member.entity.MemberProfile;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Image {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "image_id")
	private Long id;

	private String imgName;

	private String oriName;

	private String imgUrl;

	private String isRepImg;

	@ManyToOne
	@JoinColumn(name = "deal_id")
	private Deal deal;

	@ManyToOne
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
}
