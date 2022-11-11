package com.kittyhiker.sikjipsa.member.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Token {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "token_id")
	private Long id;

	private String tokenValue;

	@OneToOne
	@JoinColumn(name = "member_id")
	private Member member;

}
