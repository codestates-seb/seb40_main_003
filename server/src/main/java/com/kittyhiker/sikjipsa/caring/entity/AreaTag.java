package com.kittyhiker.sikjipsa.caring.entity;

import com.kittyhiker.sikjipsa.deal.entity.Deal;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
public class AreaTag {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "area_tag_id")
	private Long areaTagId;

	private String areaTagName;

	@ManyToOne(fetch = FetchType.LAZY)
	@JoinColumn(name = "expert_profile_id")
	private ExpertProfile expertProfile;

	@ManyToOne
	@JoinColumn(name = "deal_id")
	private Deal deal;
}
