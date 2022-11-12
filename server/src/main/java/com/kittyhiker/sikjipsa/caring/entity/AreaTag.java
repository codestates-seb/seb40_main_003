package com.kittyhiker.sikjipsa.caring.entity;

import com.kittyhiker.sikjipsa.deal.entity.Deal;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class AreaTag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "area_tag_id")
	private Long id;

	private String areaTagName;

	@ManyToOne
	@JoinColumn(name = "expert_profile_id")
	private ExpertProfile expertProfile;

	@ManyToOne
	@JoinColumn(name = "deal_id")
	private Deal deal;
}
