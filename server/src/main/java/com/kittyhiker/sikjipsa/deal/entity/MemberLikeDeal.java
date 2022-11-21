package com.kittyhiker.sikjipsa.deal.entity;

import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
@Builder
public class MemberLikeDeal {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_like_deal_id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "deal_id")
	private Deal deal;

	@ManyToOne
	@JoinColumn(name="member_id")
	private Member member;
}
