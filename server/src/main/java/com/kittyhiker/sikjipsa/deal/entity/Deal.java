package com.kittyhiker.sikjipsa.deal.entity;

import com.kittyhiker.sikjipsa.caring.entity.AreaTag;
import com.kittyhiker.sikjipsa.entity.AuditingEntity;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.plant.entity.Image;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Deal extends AuditingEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "deal_id")
	private Long id;

	private String title;

	private String content;

	private Long view;

	private Long price;

	private Long likes;

	private int category;

	private int state;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToMany(mappedBy = "deal")
	private List<MemberLikeDeal> memberLikeDeals = new ArrayList<>();

	@OneToMany(mappedBy = "deal")
	private List<MemberReview> memberReviews = new ArrayList<>();

	@OneToMany(mappedBy = "deal")
	private List<DealChat> dealChats = new ArrayList<>();

	@OneToMany(mappedBy = "deal")
	private List<AreaTag> areaTags = new ArrayList<>();

	@OneToMany(mappedBy = "deal")
	private List<Image> images = new ArrayList<>();
}
