package com.kittyhiker.sikjipsa.member.memberprofile.controller;

import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.entity.MemberInformation;
import com.kittyhiker.sikjipsa.member.mapper.MemberMapper;
import com.kittyhiker.sikjipsa.member.memberprofile.dto.MemberInfoDto;
import com.kittyhiker.sikjipsa.member.memberprofile.dto.MemberPatchDto;
import com.kittyhiker.sikjipsa.member.memberprofile.dto.ProfileResponseDto;
import com.kittyhiker.sikjipsa.member.memberprofile.mapper.MemberInfoMapper;
import com.kittyhiker.sikjipsa.member.memberprofile.service.MemberInfoService;
import com.kittyhiker.sikjipsa.member.memberprofile.service.MemberProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;

@RestController
@RequestMapping("/profile")
@RequiredArgsConstructor
public class MemberProfileController {
	private final JwtTokenizer jwtTokenizer;
	private final MemberProfileService memberProfileService;
	private final MemberInfoMapper memberInfoMapper;
	private final MemberInfoService memberInfoService;
	private final MemberMapper memberMapper;


	// 테스트용
	@PostMapping
	public ResponseEntity postProfile(@Valid @RequestBody MemberInfoDto memberInfoDto,
									  @RequestHeader("Authorization") String token) {
		MemberInformation memberInformation = memberInfoMapper.toMemberInfo(memberInfoDto);
		MemberInformation response = memberInfoService.postMemberInfo(memberInformation, jwtTokenizer.getUserIdFromToken(token));
		return new ResponseEntity(memberInfoMapper.toMemberInfoResponseDto(response), HttpStatus.CREATED);
	}

	@GetMapping("{user-id}")
	public ResponseEntity getProfile(@PathVariable("user-id") @Positive Long memberId) {
		//Member response = memberProfileService.getProfile(memberId);

		ProfileResponseDto response = memberProfileService.getProfile(memberId);
		return new ResponseEntity(response, HttpStatus.OK);
	}

	@PatchMapping("{user-id}")
	public ResponseEntity patchProfile(@PathVariable("user-id") @Positive Long memberId,
									   @Valid @RequestPart MemberPatchDto memberPatchDto,
									   @RequestPart MultipartFile multipartFile,
									   @RequestHeader("Authorization") String token) {
		Member member = memberMapper.toProfile(memberPatchDto);
		ProfileResponseDto response = memberProfileService.patchProfile(member, multipartFile, memberId, jwtTokenizer.getUserIdFromToken(token));
		return new ResponseEntity(response, HttpStatus.OK);
	}

}
