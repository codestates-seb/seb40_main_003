package com.kittyhiker.sikjipsa.member.entity;

import lombok.*;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberProfile {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_profile_id")
	private Long id;

	public MemberProfile(String content, Member member) {
		this.content = content;
		this.member = member;
	}

	private String content;

	public void setMember(Member member) {
		this.member = member;
		if (!member.getMemberProfile().equals(this)) {
			member.setMemberProfile(this);
		}
	}

	@OneToOne
	@JoinColumn(name = "member_id")
	private Member member;

}
