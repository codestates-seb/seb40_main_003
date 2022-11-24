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
public class DealChatRoom {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "deal_chat_id")
	private Long id;

	@ManyToOne
	@JoinColumn(name = "buyer_id")
	private Member buyer;

	@ManyToOne
	@JoinColumn(name = "seller_id")
	private Member seller;

	@ManyToOne
	@JoinColumn(name = "deal_id")
	private Deal deal;
}
