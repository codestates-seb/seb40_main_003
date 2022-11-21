package com.kittyhiker.sikjipsa.deal.entity;

import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class MemberReview {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_review_id")
	private Long id;

	private String content;

	@ManyToOne
	@JoinColumn(name = "deal_id")
	private Deal deal;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member; // 구매자
}