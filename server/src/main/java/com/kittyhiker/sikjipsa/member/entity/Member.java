package com.kittyhiker.sikjipsa.member.entity;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.caring.entity.ExpertReview;
import com.kittyhiker.sikjipsa.caring.entity.MemberLikeExpert;
import com.kittyhiker.sikjipsa.community.enitity.Comment;
import com.kittyhiker.sikjipsa.community.enitity.Community;
import com.kittyhiker.sikjipsa.community.enitity.CommunityLike;
import com.kittyhiker.sikjipsa.deal.entity.Deal;
import com.kittyhiker.sikjipsa.deal.entity.DealReview;
import com.kittyhiker.sikjipsa.deal.entity.MemberLikeDeal;
import com.kittyhiker.sikjipsa.entity.AuditingEntity;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.plant.entity.Plant;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Member extends AuditingEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_id")
	private Long memberId;

	private String email;

	private String password;

	private String nickname;

	private String roles;

	@OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
	private MemberProfile memberProfile;

	@OneToOne(mappedBy = "member")
	private Image image;

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

	@OneToMany(mappedBy = "seller")
	private List<DealReview> dealReviews = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<Plant> plants = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<Community> communities = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<CommunityLike> communityLikes = new ArrayList<>();

	@OneToMany(mappedBy = "member")
	private List<Comment> comments = new ArrayList<>();

	@OneToOne(mappedBy = "member", cascade = CascadeType.ALL)
	private MemberInformation memberInformation;

	@OneToOne(mappedBy = "member")
	private Token token;

	public List<String> getRolesToList() {
		return Arrays.stream(this.roles.split(",")).collect(Collectors.toList());
	}

	public void addRole(String roles) {
		this.roles = roles;
	}

	public void encryptingPassword(PasswordEncoder passwordEncoder) {
		this.password = passwordEncoder.encode(this.getPassword());
	}

	public void likeDeal(MemberLikeDeal likeDeal) {
		this.memberLikeDeals.add(likeDeal);
	}

	// MemberProfile
	public void setNickname(String nickname) {
		this.nickname = nickname;
	}

	public void setMemberProfile(MemberProfile memberProfile) {
		this.memberProfile = memberProfile;
		if (memberProfile != null) {
			memberProfile.setMember(this);
		}
	}

	public void setImage(Image image) {
		this.image = image;
	}

	public void setMemberInformation(MemberInformation memberInformation) {
		this.memberInformation = memberInformation;
		if (memberInformation != null) {
			memberInformation.setMember(this);
		}
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public void setPassword(String password) {
		this.password = password;
	}
}
