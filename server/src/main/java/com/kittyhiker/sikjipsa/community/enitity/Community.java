package com.kittyhiker.sikjipsa.community.enitity;

import com.kittyhiker.sikjipsa.entity.AuditingEntity;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.plant.entity.Image;
import lombok.Getter;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
public class Community extends AuditingEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "community_id")
	private Long id;

	private String title;

	private String content;

	private int category;

	private Long view;

	private Long likes;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToMany(mappedBy = "community")
	private List<CommunityLike> communityLikes = new ArrayList<>();

	@OneToMany(mappedBy = "community")
	private List<Comment> comments = new ArrayList<>();

	@OneToMany(mappedBy = "community")
	private List<Image> images = new ArrayList<>();
}
