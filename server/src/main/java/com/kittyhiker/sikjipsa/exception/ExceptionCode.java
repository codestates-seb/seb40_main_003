package com.kittyhiker.sikjipsa.exception;

import lombok.Getter;

public enum ExceptionCode {
	EXPERT_PROFILE_NOT_FOUND(404, "expert profile not found"),
	PLANT_NOT_FOUND(404, "plant not found"),
	MEMBER_LIKE_EXPERT_NOT_FOUND(404, "member like not found"),
	//MEMBER_PROFILE_NOT_FOUND(404, "member profile not found"),
	MEMBER_NOT_FOUND(404, "member not found"),

//	UNKNOWN_ERROR(404, "UNKNOWN_ERROR"),
	NOT_FOUND_TOKEN(400, "Headers에 토큰 값 찾을 수 없음"),
	WRONG_TYPE_TOKEN(400, "잘못된 형식의 토큰"),
	WRONG_TOKEN(400, "잘못된 토큰"),
	EXPIRED_TOKEN(400, "기간이 만료된 토큰"),
	UNSUPPORTED_TOKEN(400, "지원하지 않는 토큰"),
	ACCESS_DENIED(403, "토큰 접근 권한 없음"),


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

	NOT_FOUND_CHATROOM(404, "NOT FOUND CHATROOM");


	@Getter
	private int status;

	@Getter
	private String message;

	ExceptionCode(int status, String message) {
		this.status = status;
		this.message = message;
	}
}
