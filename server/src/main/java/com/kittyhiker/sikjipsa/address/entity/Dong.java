package com.kittyhiker.sikjipsa.address.entity;

import lombok.Getter;

import javax.persistence.*;

@Entity
@Getter
public class Dong {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "idx", nullable = false)
	private int idx;
	@Column(nullable = false)
	private String sido;
	@Column(nullable = false)
	private String gugun;
	@Column(nullable = false)
	private String dong;
	@Column(nullable = false)
	private String ri;
	@Column(nullable = false)
	private double lat;
	@Column(nullable = false)
	private double lng;
}
