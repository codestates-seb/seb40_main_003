package com.kittyhiker.sikjipsa.deal.entity;

import com.kittyhiker.sikjipsa.entity.AuditingEntity;
import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

@Entity
@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class MemberLikeDeal extends AuditingEntity {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "member_like_deal_id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "deal_id")
	private Deal deal;

	@ManyToOne
	@JoinColumn(name="member_id")
	private Member member;
}
