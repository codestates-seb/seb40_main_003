package com.kittyhiker.sikjipsa.member.memberprofile.controller;

import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import com.kittyhiker.sikjipsa.member.entity.Member;
import com.kittyhiker.sikjipsa.member.entity.MemberInformation;
import com.kittyhiker.sikjipsa.member.mapper.MemberMapper;
import com.kittyhiker.sikjipsa.member.memberprofile.dto.MemberInfoDto;
import com.kittyhiker.sikjipsa.member.memberprofile.dto.MemberPatchDto;
import com.kittyhiker.sikjipsa.member.memberprofile.mapper.MemberInfoMapper;
import com.kittyhiker.sikjipsa.member.memberprofile.mapper.MemberProfileMapper;
import com.kittyhiker.sikjipsa.member.memberprofile.service.MemberInfoService;
import com.kittyhiker.sikjipsa.member.memberprofile.service.MemberProfileService;
import com.kittyhiker.sikjipsa.member.repository.MemberInfoRepository;
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
	private final MemberProfileMapper memberProfileMapper;
	private final MemberInfoMapper memberInfoMapper;
	private final MemberInfoService memberInfoService;
	private final MemberMapper memberMapper;


	// 테스트용
	@PostMapping
	public ResponseEntity postProfile(@RequestBody MemberInfoDto memberInfoDto,
									  @RequestHeader("Authorization") String token) {
		MemberInformation memberInformation = memberInfoMapper.toMemberInfo(memberInfoDto);
		MemberInformation response = memberInfoService.postMemberInfo(memberInformation, jwtTokenizer.getUserIdFromToken(token));
		return new ResponseEntity(memberInfoMapper.toMemberInfoResponseDto(response), HttpStatus.CREATED);
	}

	@GetMapping("{user-id}")
	public ResponseEntity getProfile(@PathVariable("user-id") @Positive Long memberId) {
		Member response = memberProfileService.getProfile(memberId);
		return new ResponseEntity(memberProfileMapper.toProfileResponseDto(response), HttpStatus.OK);
	}

	@PatchMapping("{user-id}")
	public ResponseEntity patchProfile(@PathVariable("user-id") @Positive Long memberId,
									   @Valid @RequestPart MemberPatchDto memberPatchDto,
									   @RequestPart MultipartFile multipartFile) {
		memberPatchDto.setId(memberId);
		Member member = memberMapper.toProfile(memberPatchDto);
		Member response = memberProfileService.patchProfile(member, multipartFile);

		return new ResponseEntity(memberProfileMapper.toProfileResponseDto(response), HttpStatus.OK);
	}

}
