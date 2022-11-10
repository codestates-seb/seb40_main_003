package com.kittyhiker.sikjipsa.member.entity;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.caring.entity.ExpertReview;
import com.kittyhiker.sikjipsa.caring.entity.MemberLikeExpert;
import com.kittyhiker.sikjipsa.community.enitity.Comment;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.community.enitity.CommunityLike;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.entity.MemberLikeDeal;
import com.kittyhiker.sikjipsa.deal.entity.MemberReview;
import com.kittyhiker.sikjipsa.plant.entity.Plant;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
//@Builder
//@NoArgsConstructor
//@AllArgsConstructor
public class Member {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Long id;

	private String email;

	private String password;

	private String role;

	@OneToOne(mappedBy = "member")
	private MemberProfile memberProfile;

	@OneToOne(mappedBy = "member")
	private ExpertProfile expertProfile;

	@OneToMany(mappedBy = "member")
	private List<MemberLikeExpert> memberLikeExperts = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<ExpertReview> expertReviews = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<Deal> deals = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<MemberLikeDeal> memberLikeDeals = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<MemberReview> memberReviews = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<Plant> plants = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<Community> communities = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<CommunityLike> communityLikes = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<Comment> comments = new ArrayList<>();

	@OneToOne(mappedBy = "member")
	private MemberInfo memberInfo;

	@OneToOne(mappedBy = "member")
	private Token token;
}
