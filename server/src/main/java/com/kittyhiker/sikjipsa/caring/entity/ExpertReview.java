package com.kittyhiker.sikjipsa.caring.entity;

import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ExpertReview {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "expert_review_id")
	private Long id;

	private String content;

	@ManyToOne
	@JoinColumn(name = "expert_profile_id")
	private ExpertProfile expertProfile;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;
}
