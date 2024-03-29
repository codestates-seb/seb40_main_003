package com.kittyhiker.sikjipsa.caring.controller;

import com.kittyhiker.sikjipsa.caring.dto.*;
import com.kittyhiker.sikjipsa.caring.entity.ExpertProfile;
import com.kittyhiker.sikjipsa.caring.entity.ExpertReview;
import com.kittyhiker.sikjipsa.caring.entity.MemberLikeExpert;
import com.kittyhiker.sikjipsa.caring.mapper.ExpertMapper;
import com.kittyhiker.sikjipsa.caring.mapper.ExpertReviewMapper;
import com.kittyhiker.sikjipsa.caring.mapper.ExpertSuccessMapper;
import com.kittyhiker.sikjipsa.caring.mapper.MemberLikeExpertMapper;
import com.kittyhiker.sikjipsa.caring.service.ExpertService;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import javax.validation.constraints.Positive;
import java.io.IOException;
import java.util.List;

@RestController
@RequestMapping("/experts")
@RequiredArgsConstructor
public class ExpertController {
	private final JwtTokenizer jwtTokenizer;
	private final ExpertService expertService;
	private final ExpertMapper expertMapper;
	private final MemberLikeExpertMapper memberLikeExpertMapper;
	private final ExpertReviewMapper expertReviewMapper;
	private final ExpertSuccessMapper expertSuccessMapper;

	@PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
	public ResponseEntity postExpert(@Valid @RequestPart ExpertProfileDto expertProfileDto,
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
		ExpertProfile expertProfile = expertMapper.toExpert(expertProfileDto);
		ExpertProfile response = expertService.patchExpert(expertProfile, multipartFile, expertId, jwtTokenizer.getUserIdFromToken(token));
		return new ResponseEntity(expertMapper.toExpertResponseDto(response), HttpStatus.OK);
	}

	@GetMapping("/{expert-id}")
	public ResponseEntity getExpert(@PathVariable("expert-id") @Positive Long expertId) {
		ExpertProfile response = expertService.getExpert(expertId);
		return new ResponseEntity(expertMapper.toExpertResponseDto(response), HttpStatus.OK);
	}

	@GetMapping("/is-expert/{user-id}")
	public ResponseEntity getIsExpert(@PathVariable("user-id") @Positive Long memberId) {
		ExpertProfile response = expertService.getIsExpert(memberId);
		return new ResponseEntity(expertMapper.toIsExpertDto(response), HttpStatus.OK);
	}

	@GetMapping
	public ResponseEntity getExperts(@RequestParam(required = false) String keyword,
									 @RequestParam(required = false) String area,
									 @Positive @RequestParam int page,
									 @Positive @RequestParam int size) {
		if (keyword != null & area != null) {
			Page<ExpertProfile> pageExpertProfile = expertService.getExpertsByKeywordAndArea(keyword, area, page - 1, size);
			List<ExpertProfile> expertProfiles = pageExpertProfile.getContent();
			return new ResponseEntity<>(new MultiResponseDto<>(expertMapper.toExpertResponseDtos(expertProfiles), pageExpertProfile), HttpStatus.OK);
		} else if (area != null) {
			Page<ExpertProfile> pageExpertProfile = expertService.getExpertsByArea(area, page - 1, size);
			List<ExpertProfile> expertProfiles = pageExpertProfile.getContent();
			return new ResponseEntity<>(new MultiResponseDto<>(expertMapper.toExpertResponseDtos(expertProfiles), pageExpertProfile), HttpStatus.OK);
		} else if (keyword != null) {
			Page<ExpertProfile> pageExpertProfile = expertService.getExpertsByKeyword(keyword, page - 1, size);
			List<ExpertProfile> expertProfiles = pageExpertProfile.getContent();
			return new ResponseEntity<>(new MultiResponseDto<>(expertMapper.toExpertResponseDtos(expertProfiles), pageExpertProfile), HttpStatus.OK);
		} else {
			Page<ExpertProfile> pageExpertProfile = expertService.getExperts(page - 1, size);
			List<ExpertProfile> expertProfiles = pageExpertProfile.getContent();
			return new ResponseEntity<>(new MultiResponseDto<>(expertMapper.toExpertResponseDtos(expertProfiles), pageExpertProfile), HttpStatus.OK);
		}
	}

	@DeleteMapping("/{expert-id}")
	public ResponseEntity deleteExpert(@PathVariable("expert-id") @Positive Long expertId,
									   @RequestHeader("Authorization") String token) {
		expertService.deleteExpert(expertId, jwtTokenizer.getUserIdFromToken(token));
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

	@GetMapping("/like")
	public ResponseEntity getExpertLike(@Positive @RequestParam int page, @Positive @RequestParam int size,
										@RequestHeader("Authorization") String token) {
		Page<MemberLikeExpert> pageMemberLikeExpert = expertService.getExpertLikes(page - 1, size, jwtTokenizer.getUserIdFromToken(token));
		List<MemberLikeExpert> memberLikeExperts = pageMemberLikeExpert.getContent();
		return new ResponseEntity<>(new MultiResponseDto<>(memberLikeExpertMapper.toMemberLikeExpertResponseDtos(memberLikeExperts), pageMemberLikeExpert), HttpStatus.OK);
	}

	@GetMapping("/{expert-id}/is-like")
	public ResponseEntity getIsExpertLike(@PathVariable("expert-id") @Positive Long expertId,
										  @RequestHeader("Authorization") String token) {
		Boolean response = expertService.getIsExpertLike(expertId, jwtTokenizer.getUserIdFromToken(token));
		return new ResponseEntity(response, HttpStatus.OK);
	}

	@DeleteMapping("/{expert-id}/like/{member-like-expert-id}")
	public ResponseEntity deleteExpertLike(@PathVariable("expert-id") @Positive Long expertId,
										   @PathVariable("member-like-expert-id") @Positive Long memberLikeExpertId,
										   @RequestHeader("Authorization") String token) {
		expertService.deleteExpertLike(expertId, memberLikeExpertId, jwtTokenizer.getUserIdFromToken(token));
		return new ResponseEntity(HttpStatus.NO_CONTENT);
	}

	// 전문가(돌봄) 리뷰
	@PostMapping("/{expert-id}/reviews")
	public ResponseEntity postExpertReviews(@PathVariable("expert-id") @Positive Long expertId,
											@RequestBody ExpertReviewDto expertReviewDto,
											@RequestHeader("Authorization") String token) {
		ExpertReview expertReview = expertReviewMapper.toReview(expertReviewDto);
		ExpertReview response = expertService.postExpertReview(expertReview, expertId, jwtTokenizer.getUserIdFromToken(token));
		return new ResponseEntity(expertReviewMapper.toExpertReviewResponseDto(response), HttpStatus.CREATED);
	}

	// 고용 성공
	@PostMapping("/success")
	public ResponseEntity postExpertSuccess(@RequestBody ExpertSuccessDto expertSuccessDto) throws IOException {
		ExpertSuccessResponseDto expertSuccessResponseDto = expertService.postExpertSuccess(expertSuccessDto);
		return new ResponseEntity(expertSuccessResponseDto, HttpStatus.CREATED);
	}

	// 돌봄 기록
	@GetMapping("/success")
	public ResponseEntity getExpertSuccess(@Positive @RequestParam int page,
										   @Positive @RequestParam int size,
										   @RequestHeader("Authorization") String token) {
		Page<ExpertProfile> pageExpertProfile = expertService.getExpertSuccess(page - 1, size, jwtTokenizer.getUserIdFromToken(token));
		List<ExpertProfile> expertProfiles = pageExpertProfile.getContent();
		return new ResponseEntity<>(new MultiResponseDto<>(expertMapper.toExpertSuccessResponseDtos(expertProfiles), pageExpertProfile), HttpStatus.OK);
	}
}