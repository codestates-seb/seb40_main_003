package com.kittyhiker.sikjipsa.caring.entity;

import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.plant.entity.Image;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
public class ExpertProfile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "expert_profile_id")
	private Long id;

	private String simpleContent;

	private String detailContent;

	private int useNum;

	private int price;

	private Long likes;

	private String address;

	private String extra;

	@OneToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToOne(mappedBy = "expertProfile")
	private Image image;

	@OneToMany(mappedBy = "expertProfile")
	private List<MemberLikeExpert> memberLikeExperts = new ArrayList<>();

	@OneToMany(mappedBy = "expertProfile")
	private List<ExpertReview> expertReviews = new ArrayList<>();

	@OneToMany(mappedBy = "expertProfile")
	private List<TechTag> techTags = new ArrayList<>();

	@OneToMany(mappedBy = "expertProfile")
	private List<AreaTag> AreaTags = new ArrayList<>();

	@OneToMany(mappedBy = "expertProfile")
	private List<ExpertChat> expertChats = new ArrayList<>();

}
