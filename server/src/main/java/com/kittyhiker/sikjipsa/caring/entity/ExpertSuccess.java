package com.kittyhiker.sikjipsa.caring.entity;

import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class ExpertSuccess {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "expert_success_id")
	private Long expertSuccessId;

	@OneToOne
	@JoinColumn(name = "expert_profile_id")
	private ExpertProfile expertProfile;

	@OneToOne
	@JoinColumn(name = "buyer_id")
	private Member buyer;

	@OneToOne
	@JoinColumn(name = "seller_id")
	private Member seller;
}
