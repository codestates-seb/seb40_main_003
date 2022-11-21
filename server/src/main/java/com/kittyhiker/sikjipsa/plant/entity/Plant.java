package com.kittyhiker.sikjipsa.plant.entity;

import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Plant {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "plant_id")
	private Long id;

	private String name;

	private int years;

	private String type;

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToOne(mappedBy = "plant")
	private Image image;
}
