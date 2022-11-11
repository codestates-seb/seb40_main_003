package com.kittyhiker.sikjipsa.deal.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class DealChat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "deal_chat_id")
	private Long id;

	private String message;

	@ManyToOne
	@JoinColumn(name = "deal_id")
	private Deal deal;
}
