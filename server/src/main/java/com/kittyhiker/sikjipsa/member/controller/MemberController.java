package com.kittyhiker.sikjipsa.member.controller;

import com.kittyhiker.sikjipsa.jwt.dto.TokenDto;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import com.kittyhiker.sikjipsa.member.dto.*;
import com.kittyhiker.sikjipsa.member.mapper.MemberMapper;
import com.kittyhiker.sikjipsa.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@RestController
@RequiredArgsConstructor
@Validated
public class MemberController {

    private final MemberService memberService;
    private final JwtTokenizer jwtTokenizer;

    @PostMapping("/auth")
    public ResponseEntity signUp(@RequestBody @Valid MemberSignupDto signUpDto) {
        Long userId = memberService.signUpUser(signUpDto);
        return new ResponseEntity(userId, HttpStatus.CREATED);
    }

    @PostMapping("/auth/token")
    public ResponseEntity login(@RequestBody @Valid MemberLoginDto loginDto) {
        MemberLoginResponseDto loginResponse = memberService.login(loginDto);
        return new ResponseEntity(loginResponse, HttpStatus.OK);
    }

    @DeleteMapping("/auth/token")
    public ResponseEntity logout(@RequestHeader("Authorization") String token) {
        memberService.logoutUser(token);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/auth/token/refresh")
    public ResponseEntity requestRefresh(@RequestHeader("Authorization") String token) {
        TokenDto tokenDto = memberService.reissueToken(token);
        return new ResponseEntity(tokenDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/auth/token/byebye")
    public ResponseEntity byeUser(@RequestHeader("Authorization") String token) {
        //회원정보와 연관된 모든 정보 삭제

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/auth/information")
    public ResponseEntity setProfile(@RequestHeader("Authorization") String token,
                                     @RequestBody MemberInfoPostDto infoPostDto) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        MemberInfoResponseDto infoResponseDto = memberService.postMemberInfo(userId, infoPostDto);
        return new ResponseEntity(infoResponseDto, HttpStatus.CREATED);
    }
}
