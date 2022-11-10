package com.kittyhiker.sikjipsa.caring.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class TechTag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "tech_tag_id")
	private Long id;

	private String TechTagName;

	@ManyToOne
	@JoinColumn(name = "expert_profile_id")
	private ExpertProfile expertProfile;

}
