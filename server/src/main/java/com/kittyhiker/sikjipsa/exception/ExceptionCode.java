package com.kittyhiker.sikjipsa.exception;

import lombok.Getter;

public enum ExceptionCode {
	EXPERT_PROFILE_NOT_FOUND(404, "expert profile not found"),
	PLANT_NOT_FOUND(404, "plant not found"),
	MEMBER_LIKE_EXPERT_NOT_FOUND(404, "member like not found"),
	//MEMBER_PROFILE_NOT_FOUND(404, "member profile not found"),
	MEMBER_NOT_FOUND(404, "member not found");
	@Getter
	private int status;

	@Getter
	private String message;
	ExceptionCode(int status, String message) {
		this.status = status;
		this.message = message;
	}
}
