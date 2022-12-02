package com.kittyhiker.sikjipsa.deal.entity;

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
public class DealReview {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "deal_review_id")
	private Long dealReviewid;

	@Column(name = "content")
	private String reviewContent;

	@OneToOne
	@JoinColumn(name = "deal_id")
	private Deal deal;

	@ManyToOne
	@JoinColumn(name = "buyer_id")
	private Member buyer; // 구매자

	@ManyToOne
	@JoinColumn(name = "seller_id")
	private Member seller;


	public void patchDealReview(String content) {
		this.reviewContent = content;
	}
}