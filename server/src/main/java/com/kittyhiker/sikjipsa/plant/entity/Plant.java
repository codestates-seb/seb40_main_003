package com.kittyhiker.sikjipsa.plant.entity;

import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.image.entity.Image;
import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class Plant {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "plant_id")
	private Long plantId;

	private String name;

	private String years;

	private String days;

	private String type;

	public void setMember(Member member) {
		this.member = member;
		if (!member.getPlants().contains(this)) {
			member.getPlants().add(this);
		}
	}

	@ManyToOne
	@JoinColumn(name = "member_id")
	private Member member;

	@OneToOne//(mappedBy = "plant")
	private Image image;
}
