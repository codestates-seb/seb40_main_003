package com.kittyhiker.sikjipsa.member.controller;

import com.google.gson.Gson;
import com.kittyhiker.sikjipsa.config.SecurityTestConfig;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import com.kittyhiker.sikjipsa.member.dto.*;
import com.kittyhiker.sikjipsa.member.mapper.MemberMapper;
import com.kittyhiker.sikjipsa.member.service.MemberService;
import org.junit.jupiter.api.Test;
import org.mockito.BDDMockito;
import org.mockito.Mockito;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.restdocs.AutoConfigureRestDocs;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.data.jpa.mapping.JpaMetamodelMappingContext;
import org.springframework.http.MediaType;
import org.springframework.restdocs.mockmvc.MockMvcRestDocumentation;
import org.springframework.restdocs.mockmvc.RestDocumentationRequestBuilders;
import org.springframework.restdocs.operation.preprocess.Preprocessors;
import org.springframework.restdocs.payload.JsonFieldType;
import org.springframework.restdocs.payload.PayloadDocumentation;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest({MemberController.class, MemberMapper.class})
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser
@Import(SecurityTestConfig.class)
@AutoConfigureRestDocs
class MemberControllerTest {

    String token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXNvbEBhc2RmaWouY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJJZCI6MSwiaWF0IjoxNjY4MDYwNTk1LCJleHAiOjE2NjgwNjIzOTV9.HRSvPRI1eKIfVnhlSKQQwZf0CkN1-HMbp3AASVITIos";

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private JwtTokenizer jwtTokenizer;

    @MockBean
    private MemberService memberService;

    @MockBean
    private MemberMapper mapper;

    @Test
    void 회원가입() throws Exception {
        //given
        MemberSignupDto memberSignupDto = MemberSignupDto.builder()
                .email("dasol@asdfij.com")
                .password("fkffk1234!!")
                .nickname("감자").build();
        String content = gson.toJson(memberSignupDto);

        BDDMockito.given(memberService.signUpUser(Mockito.any(MemberSignupDto.class))).willReturn(1L);

        //when
        ResultActions perform = mockMvc.perform(
                RestDocumentationRequestBuilders.post("/signup")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        String num = String.valueOf(1L);
        //then
        perform
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.content().string(String.valueOf(1L)))
                .andDo(MockMvcRestDocumentation.document("post-member",
                        Preprocessors.preprocessRequest(Preprocessors.prettyPrint()),
                        Preprocessors.preprocessResponse(Preprocessors.prettyPrint()),
                        PayloadDocumentation.requestFields(
                                PayloadDocumentation.fieldWithPath("email").type(JsonFieldType.STRING).description("회원 이메일"),
                                PayloadDocumentation.fieldWithPath("password").type(JsonFieldType.STRING).description("회원 비밀번호"),
                                PayloadDocumentation.fieldWithPath("nickname").type(JsonFieldType.STRING).description("회원 닉네임")

                        ),
                        PayloadDocumentation.responseBody()
                        ))
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void 로그인() throws Exception {
        //given
        MemberLoginDto memberLoginDto = MemberLoginDto.builder()
                .email("dasol@asdfij.com")
                .password("fkffk1234!!").build();
        String content = gson.toJson(memberLoginDto);

        MemberLoginResponseDto response = MemberLoginResponseDto.builder()
                .memberId(1L)
                .accessToken("Bearer testToken")
                .refreshToken("Bearer testToken")
                .image("")
                .nickname("감자").build();

        BDDMockito.given(memberService.login(Mockito.any(MemberLoginDto.class))).willReturn(response);

        //when
        ResultActions perform = mockMvc.perform(
                RestDocumentationRequestBuilders.post("/login")
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        perform
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.accessToken").value(response.getAccessToken()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.refreshToken").value(response.getRefreshToken()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.memberId").value(response.getMemberId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.nickname").value(response.getNickname()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.image").value(response.getImage()))
                .andDo(
                        MockMvcRestDocumentation.document("login-member",
                                Preprocessors.preprocessRequest(Preprocessors.prettyPrint()),
                                Preprocessors.preprocessResponse(Preprocessors.prettyPrint()),
                                PayloadDocumentation.requestFields(
                                        PayloadDocumentation.fieldWithPath("email").type(JsonFieldType.STRING).description("회원 이메일"),
                                        PayloadDocumentation.fieldWithPath("password").type(JsonFieldType.STRING).description("회원 비밀번호")
                                ),
                                PayloadDocumentation.responseFields(
                                        PayloadDocumentation.fieldWithPath("accessToken").type(JsonFieldType.STRING).description("액세스토큰"),
                                        PayloadDocumentation.fieldWithPath("refreshToken").type(JsonFieldType.STRING).description("리프레시토큰"),
                                        PayloadDocumentation.fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 PK"),
                                        PayloadDocumentation.fieldWithPath("nickname").type(JsonFieldType.STRING).description("회원 닉네임"),
                                        PayloadDocumentation.fieldWithPath("image").type(JsonFieldType.STRING).description("프로필 사진")
                                )
                        )
                )
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void 추가정보등록() throws Exception {
        //given
        MemberInfoPostDto memberInfo = MemberInfoPostDto.builder()
                .name("테스트")
                .address("테스트동")
                .birth("0723")
                .gender(1)
                .phone("010-1234-5678")
                .build();
        String content = gson.toJson(memberInfo);

        MemberInfoResponseDto response = MemberInfoResponseDto.builder()
                .memberId(1L)
                .nickname("감자")
                .name("테스트")
                .address("테스트동")
                .birth("0723")
                .gender(1)
                .phone("010-1234-5678")
                .build();

        BDDMockito.given(memberService.postMemberInfo(Mockito.anyLong(), Mockito.any(MemberInfoPostDto.class))).willReturn(response);

        //when
        ResultActions perform = mockMvc.perform(
                RestDocumentationRequestBuilders.post("/users")
                        .accept(MediaType.APPLICATION_JSON)
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        perform
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.memberId").value(response.getMemberId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.nickname").value(response.getNickname()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.name").value(response.getName()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.address").value(response.getAddress()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.birth").value(response.getBirth()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.gender").value(response.getGender()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.phone").value(response.getPhone()))
                .andDo(
                        MockMvcRestDocumentation.document("post-member-info",
                                Preprocessors.preprocessRequest(Preprocessors.prettyPrint()),
                                Preprocessors.preprocessResponse(Preprocessors.prettyPrint()),
                                PayloadDocumentation.requestFields(
                                        PayloadDocumentation.fieldWithPath("name").type(JsonFieldType.STRING).description("회원 이름"),
                                        PayloadDocumentation.fieldWithPath("address").type(JsonFieldType.STRING).description("회원 주소"),
                                        PayloadDocumentation.fieldWithPath("birth").type(JsonFieldType.STRING).description("회원 생일"),
                                        PayloadDocumentation.fieldWithPath("gender").type(JsonFieldType.NUMBER).description("회원 성별"),
                                        PayloadDocumentation.fieldWithPath("phone").type(JsonFieldType.STRING).description("회원 핸드폰번호")
                                ),
                                PayloadDocumentation.responseFields(
                                        PayloadDocumentation.fieldWithPath("memberId").type(JsonFieldType.NUMBER).description("회원 PK"),
                                        PayloadDocumentation.fieldWithPath("nickname").type(JsonFieldType.STRING).description("회원 닉네임"),
                                        PayloadDocumentation.fieldWithPath("name").type(JsonFieldType.STRING).description("회원 이름"),
                                        PayloadDocumentation.fieldWithPath("address").type(JsonFieldType.STRING).description("회원 주소"),
                                        PayloadDocumentation.fieldWithPath("birth").type(JsonFieldType.STRING).description("회원 생일"),
                                        PayloadDocumentation.fieldWithPath("gender").type(JsonFieldType.NUMBER).description("회원 성별"),
                                        PayloadDocumentation.fieldWithPath("phone").type(JsonFieldType.STRING).description("회원 핸드폰번호")
                                )
                        )
                )
                .andDo(MockMvcResultHandlers.print());
    }

}