package com.kittyhiker.sikjipsa.exception;

import lombok.Getter;

public enum ExceptionCode {
	EXPERT_PROFILE_NOT_FOUND(404, "EXPERT PROFILE NOT FOUND"),
	PLANT_NOT_FOUND(404, "PLANT NOT NOUND"),
	MEMBER_LIKE_EXPERT_NOT_FOUND(404, "MEMBER LIKE NOT FOUND"),
	//MEMBER_PROFILE_NOT_FOUND(404, "member profile not found"),
	MEMBER_NOT_FOUND(404, "MEMBER NOT FOUND"),

	ALREAD_EXISTS_EMAIL(400, "ALREADY EXISTS EMAIL"),
	NOT_FOUND_EMAIL(404, "NOT FOUND EMAIL"),
	WRONG_PASSWORD(400, "WRONG PASSWORD"),

	INVALID_ACCESS_TOKEN(403, "INVALID ACCESS TOKEN"),
	INVALID_REFRESH_TOKEN(403, "INVALID REFRESH TOKEN"),
	NOT_FOUND_REFRESH_TOKEN(404, "REFRESH TOKEN NOT FOUND"),
	ALREADY_LIKE(400, "ALREADY LIKE"),
	NOT_FOUND_LIKE_POST(400, "NOT FOUND LIKE POST"),

	NOT_FOUND_DEAL(404, "NOT FOUND DEAL"),
	NOT_FOUND_COMMUNITY(404, "NOT FOUND COMMUNITY"),
	NOT_FOUND_COMMENT(404, "NOT FOUND COMMENT"),
	EXPERT_PROFILE_EXISTS(409, "EXPERT PROFILE EXISTS"),
	EXPERT_LIKE_EXISTS(409, "EXPERT LIKE EXISTS"),
	EXPERT_LIKE_NOT_FOUND(400, "EXPERT LIKE NOT FOUND"),
	MEMBER_FORBIDDEN(403, "MEMBER FORBIDDEN"),
	MEMBER_IMAGE_NOT_FOUND(404, "MEMBER_IMAGE NOT FOUND");


	@Getter
	private int status;

	@Getter
	private String message;

	ExceptionCode(int status, String message) {
		this.status = status;
		this.message = message;
	}
}
