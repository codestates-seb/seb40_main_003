//package com.kittyhiker.sikjipsa.community.controller;
//
//import com.kittyhiker.sikjipsa.community.dto.CommunityPagingDto;
//import com.kittyhiker.sikjipsa.community.dto.CommunityPostDto;
//import com.kittyhiker.sikjipsa.community.dto.CommunityResponseDto;
//import com.kittyhiker.sikjipsa.community.service.CommunityService;
//import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
//import lombok.RequiredArgsConstructor;
//import org.springframework.http.HttpStatus;
//import org.springframework.http.MediaType;
//import org.springframework.http.ResponseEntity;
//import org.springframework.web.bind.annotation.*;
//import org.springframework.web.multipart.MultipartFile;
//
//import javax.validation.constraints.Positive;
//import java.io.IOException;
//import java.util.List;
//
//@RestController
//@RequestMapping("/community")
//@RequiredArgsConstructor
//public class CommunityController {
//
//    private final CommunityService communityService;
//    private final JwtTokenizer jwtTokenizer;
//
//    /**
//     * 커뮤니티글 등록
//     */
//    @PostMapping(consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
//    public ResponseEntity postCommunity(@RequestPart CommunityPostDto postDto,
//                                   @RequestPart(required = false) List<MultipartFile> images,
//                                   @RequestHeader("Authorization") String token) throws IOException {
//        CommunityResponseDto response = communityService.postCommunity(postDto, images, jwtTokenizer.getUserIdFromToken(token));
//        return new ResponseEntity(response, HttpStatus.CREATED);
//    }
//
//    /**
//     * 커뮤니티글 수정
//     */
//    @PatchMapping(value = "/{community-id}",
//            consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
//    public ResponseEntity patchCommunity(@PathVariable("community-id") Long communityId,
//                                    @RequestPart CommunityPostDto patchDto,
//                                    @RequestPart(required = false) List<MultipartFile> images) throws IOException {
//        CommunityResponseDto response = communityService.patchCommunity(communityId, images, patchDto);
//        return new ResponseEntity(response, HttpStatus.OK);
//    }
//
//    /**
//     * 커뮤니티 리스트 조회
//     */
//    @GetMapping
//    public ResponseEntity getCommunityList(@RequestParam(required = false) String keyword,
//                                      @Positive @RequestParam int page,
//                                      @Positive @RequestParam int size) {
//
//        CommunityPagingDto<List> response;
//        if (keyword==null) {
//            response = communityService.getPostList(page-1, size);
//        } else {
//            response = communityService.getPostList(keyword, page-1, size);
//        }
//
//        return new ResponseEntity(response, HttpStatus.OK);
//    }
//
//    /**
//     * 커뮤니티 상세 조회
//     */
//    @GetMapping("/{community-id}")
//    public ResponseEntity getCommunityDetail(@PathVariable("community-id") Long communityId) {
//        CommunityResponseDto communityDetail = communityService.getCommunityDetail(communityId);
//        return new ResponseEntity(communityDetail, HttpStatus.OK);
//    }
//
//    @PostMapping("/like")
//    public ResponseEntity likeCommunity(@PathVariable("community-id") Long communityId,
//                                        @RequestHeader("Authorization") String token) {
//        communityService.likeCommunity(communityId, jwtTokenizer.getUserIdFromToken(token));
//
//        return new ResponseEntity(HttpStatus.CREATED);
//    }
//
//    @DeleteMapping("/like")
//    public ResponseEntity cancelLikeCommunity(@PathVariable("community-id") Long communityId,
//                                              @RequestHeader("Authorization") String token) {
//        communityService.cancelLikeCommunity(communityId, jwtTokenizer.getUserIdFromToken(token));
//
//        return new ResponseEntity(HttpStatus.NO_CONTENT);
//    }
//
//
//    /**
//     * 커뮤니티글 삭제
//     */
//    @DeleteMapping("/{community-id}")
//    public ResponseEntity deleteCommunityPost(@PathVariable("community-id") Long communityId) {
//        communityService.removeCommunityPost(communityId);
//        return new ResponseEntity(HttpStatus.NO_CONTENT);
//    }
//}
