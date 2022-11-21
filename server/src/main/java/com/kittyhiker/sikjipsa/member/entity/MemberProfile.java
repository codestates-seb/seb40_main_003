package com.kittyhiker.sikjipsa.member.entity;


import com.kittyhiker.sikjipsa.image.entity.Image;
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

	@OneToOne(mappedBy = "memberProfile")
	private Image image;
}
