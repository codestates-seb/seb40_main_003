package com.kittyhiker.sikjipsa.exception;

import lombok.Getter;

public enum ExceptionCode {
	EXPERT_PROFILE_NOT_FOUND(404, "expert profile not found");

	@Getter
	private int status;

	@Getter
	private String message;
	ExceptionCode(int status, String message) {
		this.status = status;
		this.message = message;
	}
}
