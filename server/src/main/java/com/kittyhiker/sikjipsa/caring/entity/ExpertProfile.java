package com.kittyhiker.sikjipsa.caring.entity;

import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
public class ExpertProfile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "expert_profile_id")
	private Long expertId;

	private String name;

	private int age;

	private int gender;

	private String simpleContent;

	private String detailContent;

	private int useNum;

	private String price;

	private Long likes;

	private Long view;

	private String address;

	private String extra;

	@OneToOne//(cascade = CascadeType.ALL)
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToOne(mappedBy = "expertProfile")
	private Image image;

	@OneToMany(mappedBy = "expertProfile")
	private List<MemberLikeExpert> memberLikeExperts = new ArrayList<>();

	public void setExpertReviews(List<ExpertReview> expertReviews) {
		this.expertReviews = expertReviews;
		if (expertReviews != null) {
			for (ExpertReview expertReview : expertReviews) {
				expertReview.setExpertProfile(this);
			}
		}
	}

	@OneToMany(mappedBy = "expertProfile")
	private List<ExpertReview> expertReviews = new ArrayList<>();

	public void setTechTags(List<TechTag> techTags) {
		this.techTags = techTags;
		if (techTags != null) {
			for (TechTag techTag : techTags) {
				techTag.setExpertProfile(this);
			}
		}
	}

	@OneToMany(mappedBy = "expertProfile", cascade = CascadeType.ALL)
	private List<TechTag> techTags = new ArrayList<>();

	public void setAreaTags(List<AreaTag> areaTags) {
		this.areaTags = areaTags;
		if (areaTags != null) {
			for (AreaTag areaTag : areaTags) {
				areaTag.setExpertProfile(this);
			}
		}
	}

	@OneToMany(mappedBy = "expertProfile", cascade = CascadeType.ALL)
	private List<AreaTag> areaTags = new ArrayList<>();

	@OneToMany(mappedBy = "expertProfile")
	private List<ExpertChat> expertChats = new ArrayList<>();

}
