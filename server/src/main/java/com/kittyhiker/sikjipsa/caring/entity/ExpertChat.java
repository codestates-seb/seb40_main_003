package com.kittyhiker.sikjipsa.caring.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ExpertChat {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "expert_chat_id")
	private Long id;

	private String message;

	@ManyToOne
	@JoinColumn(name = "expert_profile_id")
	private ExpertProfile expertProfile;
}
