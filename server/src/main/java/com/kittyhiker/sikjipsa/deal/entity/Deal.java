package com.kittyhiker.sikjipsa.deal.entity;

import com.kittyhiker.sikjipsa.caring.entity.AreaTag;
import com.kittyhiker.sikjipsa.deal.dto.DealPostDto;
import com.kittyhiker.sikjipsa.entity.AuditingEntity;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.member.entity.Member;
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

	private int view=0;

	private int price;

	private int likes=0;

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

	public void likeDeal(MemberLikeDeal likeDeal) {
		likes+=1;
		this.memberLikeDeals.add(likeDeal);
	}

	public void setMember(Member member){
		this.member = member;
	}

	public void updateView() {
		this.view+=1;
	}

	public void updateDeal(DealPostDto dealPostDto) {
		this.title = dealPostDto.getTitle();
		this.content = dealPostDto.getContent();
		this.price = dealPostDto.getPrice();
		this.category = dealPostDto.getCategory();
	}
}
