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

    @PostMapping("/signup")
    public ResponseEntity signUp(@RequestBody @Valid MemberSignupDto signUpDto) {
        Long userId = memberService.signUpUser(signUpDto);
        return new ResponseEntity(userId, HttpStatus.CREATED);
    }

    @PostMapping("/login")
    public ResponseEntity login(@RequestBody @Valid MemberLoginDto loginDto) {
        MemberLoginResponseDto loginResponse = memberService.login(loginDto);
        return new ResponseEntity(loginResponse, HttpStatus.OK);
    }

    @DeleteMapping("/logout")
    public ResponseEntity logout(@RequestHeader("Authorization") String token) {
        memberService.logoutUser(token);
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/users/refresh")
    public ResponseEntity requestRefresh(@RequestHeader("Authorization") String token) {
        TokenDto tokenDto = memberService.reissueToken(token);
        return new ResponseEntity(tokenDto, HttpStatus.CREATED);
    }

    @DeleteMapping("/users")
    public ResponseEntity byeUser(@RequestHeader("Authorization") String token) {
        //회원정보와 연관된 모든 정보 삭제

        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @PostMapping("/users")
    public ResponseEntity setMemberInfo(@RequestHeader("Authorization") String token,
                                     @RequestBody MemberInfoPostDto infoPostDto) {
        Long userId = jwtTokenizer.getUserIdFromToken(token);
        MemberInfoResponseDto infoResponseDto = memberService.postMemberInfo(userId, infoPostDto);
        return new ResponseEntity(infoResponseDto, HttpStatus.CREATED);
    }

}
