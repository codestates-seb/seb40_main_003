package com.kittyhiker.sikjipsa.member.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class MemberInfo {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_info_id")
	private Long id;

	private String name;

	private String phone;

	private String birth;

	private int gender;

	private String address;

	@OneToOne
	@JoinColumn(name = "member_id")
	private Member member;
}
