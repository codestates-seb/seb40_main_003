package com.kittyhiker.sikjipsa.community.enitity;

import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class CommunityLike {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "community_like_id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "community_id")
	private Community community;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

}
