package com.kittyhiker.sikjipsa.caring.entity;

import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class MemberLikeExpert {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_like_expert_id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne
	@JoinColumn(name = "expert_profile_id")
	private ExpertProfile expertProfile;
}
