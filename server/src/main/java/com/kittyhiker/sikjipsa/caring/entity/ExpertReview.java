package com.kittyhiker.sikjipsa.caring.entity;

import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class ExpertReview {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "expert_review_id")
	private Long expertSuccessId;

	private String content;

	public void setExpertProfile(ExpertProfile expertProfile) {
		this.expertProfile = expertProfile;
		if (!expertProfile.getExpertReviews().contains(this)) {
			expertProfile.getExpertReviews().add(this);
		}
	}

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "expert_profile_id")
	private ExpertProfile expertProfile;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;
}
