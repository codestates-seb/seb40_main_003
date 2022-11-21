package com.kittyhiker.sikjipsa.community.enitity;

import com.kittyhiker.sikjipsa.community.dto.CommunityPostDto;
import com.kittyhiker.sikjipsa.entity.AuditingEntity;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Community extends AuditingEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "community_id")
	private Long id;

	private String title;

	private String content;

//	private int category=1;

	private int view=0;

	private int likes=0;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

//	@OneToMany(mappedBy = "community")
//	private List<CommunityLike> communityLikes = new ArrayList<>();

//	@OneToMany(mappedBy = "community")
//	private List<Comment> comments = new ArrayList<>();

//	@OneToMany(mappedBy = "community")
//	private List<Image> images = new ArrayList<>();

	public void setMember(Member member) {
		this.member = member;
	}

	public void update(CommunityPostDto patchDto) {
		this.title = patchDto.getTitle();
		this.content = patchDto.getContent();
	}

	public void updateView() {
		this.view+=1;
	}
}
