package com.kittyhiker.sikjipsa.member.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class MemberProfile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_profile_id")
	private Long id;

	private String content;

	@OneToOne
	@JoinColumn(name = "member_id")
	private Member member;

}
