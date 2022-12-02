package com.kittyhiker.sikjipsa.community.enitity;

import com.kittyhiker.sikjipsa.entity.AuditingEntity;
import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Comment extends AuditingEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "comment_id")
	private Long commentId;

	@Column(length = 1500)
	private String content;

	private int isModified=0;

	private int isDeleted=0;

	private int depth;

	private Long parent;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@ManyToOne
	@JoinColumn(name = "community_id")
	private Community community;

	public void modifyComment(String content) {
		this.content = content;
		this.isModified = 1;
	}

	public void deleteComment() {
		this.content = "삭제된 댓글입니다";
		this.isDeleted = 1;
	}
}
