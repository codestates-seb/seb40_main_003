package com.kittyhiker.sikjipsa.caring.controller;

import com.kittyhiker.sikjipsa.caring.dto.ExpertProfileDto;
import com.kittyhiker.sikjipsa.caring.dto.MultiResponseDto;
import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.caring.entity.MemberLikeExpert;
import com.kittyhiker.sikjipsa.caring.mapper.ExpertMapper;
import com.kittyhiker.sikjipsa.caring.mapper.ExpertReviewMapper;
import com.kittyhiker.sikjipsa.caring.mapper.MemberLikeExpertMapper;
import com.kittyhiker.sikjipsa.caring.service.ExpertService;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import com.kittyhiker.sikjipsa.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.util.List;

@RestController
@RequestMapping("/experts")
@RequiredArgsConstructor
public class ExpertController {
	private final JwtTokenizer jwtTokenizer;
	private final ExpertService expertService;
	private final ExpertMapper expertMapper;
	private final MemberLikeExpertMapper memberLikeExpertMapper;

	@PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity postExpert(@RequestPart ExpertProfileDto expertProfileDto,
									 @RequestPart(required = false) MultipartFile multipartFile,
									 @RequestHeader("Authorization") String token) {
		ExpertProfile expertProfile = expertMapper.toExpert(expertProfileDto);
		ExpertProfile response = expertService.postExpert(expertProfile, multipartFile, jwtTokenizer.getUserIdFromToken(token));
		return new ResponseEntity(expertMapper.toExpertResponseDto(response), HttpStatus.CREATED);
	}

	@PatchMapping(value = "/{expert-id}", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity patchExpert(@PathVariable("expert-id") @Positive Long expertId,
									  @Valid @RequestPart ExpertProfileDto expertProfileDto,
									  @RequestPart(required = false) MultipartFile multipartFile,
									  @RequestHeader("Authorization") String token) {
		expertProfileDto.setExpertId(expertId); // 수정 필
		ExpertProfile expertProfile = expertMapper.toExpert(expertProfileDto);
		ExpertProfile response = expertService.patchExpert(expertProfile, multipartFile);
		return new ResponseEntity(expertMapper.toExpertResponseDto(response), HttpStatus.OK);
	}

	@GetMapping("/{expert-id}")
	public ResponseEntity getExpert(@PathVariable("expert-id") @Positive Long expertId) {
		ExpertProfile response = expertService.getExpert(expertId);
		return new ResponseEntity(expertMapper.toExpertResponseDto(response), HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity getExperts(@Positive @RequestParam int page, @Positive @RequestParam int size) {
		Page<ExpertProfile> pageExpertProfile = expertService.getExperts(page - 1, size);
		List<ExpertProfile> expertProfiles = pageExpertProfile.getContent();
		return new ResponseEntity<>(new MultiResponseDto<>(expertMapper.toExpertResponseDtos(expertProfiles), pageExpertProfile), HttpStatus.OK);
	}

//	@GetMapping("search")
//	public ResponseEntity getExpertProfilesByKeyword(@RequestParam String keyword, @Positive @RequestParam int page, @Positive @RequestParam int size) {
//		Page<ExpertProfile> pageExpertProfile = expertProfileService.getExpertProfilesByKeyword(keyword, page - 1, size);
//		List<ExpertProfile> expertProfiles = pageExpertProfile.getContent();
//		return new ResponseEntity<>(new MultiResponseDto<>(expertProfileMapper.toExpertProfileResponseDtos(expertProfiles), pageExpertProfile), HttpStatus.OK);
//	}

	@DeleteMapping("/{expert-id}")
	public ResponseEntity deleteExpert(@PathVariable("expert-id") @Positive Long expertId) {
		expertService.deleteExpert(expertId);
		return new ResponseEntity<>(HttpStatus.NO_CONTENT);
	}


	// 전문가 찜
	@PostMapping("/{expert-id}/like")
	public ResponseEntity postExpertLike(@PathVariable("expert-id") @Positive Long expertId,
										 @RequestHeader("Authorization") String token) {
		MemberLikeExpert memberLikeExpert = new MemberLikeExpert();
		MemberLikeExpert response = expertService.postExpertLike(memberLikeExpert, jwtTokenizer.getUserIdFromToken(token), expertId);
		return new ResponseEntity(memberLikeExpertMapper.toMemberLikeExpertResponseDto(response), HttpStatus.CREATED);
	}

	@GetMapping("/{expert-id}/like")
	public ResponseEntity getExpertLike(@Positive @RequestParam int page, @Positive @RequestParam int size) {
		Page<MemberLikeExpert> pageMemberLikeExpert = expertService.getExpertLikes(page - 1, size);
		List<MemberLikeExpert> memberLikeExperts = pageMemberLikeExpert.getContent();
		return new ResponseEntity<>(new MultiResponseDto<>(memberLikeExpertMapper.toMemberLikeExpertResponseDtos(memberLikeExperts), pageMemberLikeExpert), HttpStatus.OK);
	}

	@DeleteMapping("/{expert-id}/like/{member-like-expert-id}")
	public ResponseEntity deleteExpertLike(@PathVariable("expert-id") @Positive Long expertId,
										   @PathVariable("member-like-expert-id") @Positive Long memberLikeExpertId,
										   @RequestHeader("Authorization") String token) {
		expertService.deleteExpertLike(expertId, memberLikeExpertId, jwtTokenizer.getUserIdFromToken(token));
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}

	// TODO: 전문가(돌봄) 리뷰
//	@PostMapping("/{expert-success-id}/reviews")
//	public ResponseEntity postExpertSuccess(@PathVariable("expert-success-id") @Positive Long expertSuccessId,
//											@RequestBody ExpertReviewDto expertReviewDto) {
//		ExpertReview expertReview = expertReviewMapper.toReview(expertReviewDto);
//		ExpertReview response = expertService.postExpertSuccess(expertReview);
//		return new ResponseEntity(expertReviewMapper.toExpertReviewResponseDto(response), HttpStatus.CREATED);
//	}

}