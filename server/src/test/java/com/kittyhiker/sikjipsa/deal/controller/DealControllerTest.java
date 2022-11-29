package com.kittyhiker.sikjipsa.deal.controller;

import com.google.gson.Gson;
import com.kittyhiker.sikjipsa.config.SecurityTestConfig;
import com.kittyhiker.sikjipsa.deal.dto.DealPagingDto;
import com.kittyhiker.sikjipsa.deal.dto.DealPostDto;
import com.kittyhiker.sikjipsa.deal.dto.DealResponseDto;
import com.kittyhiker.sikjipsa.deal.dto.PageInfo;
import com.kittyhiker.sikjipsa.deal.mapper.DealMapper;
import com.kittyhiker.sikjipsa.deal.service.DealService;
import com.kittyhiker.sikjipsa.jwt.util.JwtTokenizer;
import com.kittyhiker.sikjipsa.member.dto.MemberSignupDto;
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
import org.springframework.restdocs.request.RequestDocumentation;
import org.springframework.security.test.context.support.WithMockUser;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.ResultActions;
import org.springframework.test.web.servlet.request.MockMvcRequestBuilders;
import org.springframework.test.web.servlet.result.MockMvcResultHandlers;
import org.springframework.test.web.servlet.result.MockMvcResultMatchers;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@WebMvcTest({DealController.class, DealMapper.class})
@MockBean(JpaMetamodelMappingContext.class)
@WithMockUser
@Import(SecurityTestConfig.class)
@AutoConfigureRestDocs
class DealControllerTest {
    /*

    String token = "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkYXNvbEBhc2RmaWouY29tIiwicm9sZXMiOlsiUk9MRV9VU0VSIl0sInVzZXJJZCI6MSwiaWF0IjoxNjY4MDYwNTk1LCJleHAiOjE2NjgwNjIzOTV9.HRSvPRI1eKIfVnhlSKQQwZf0CkN1-HMbp3AASVITIos";
    LocalDateTime time = LocalDateTime.of(2022, 11, 17, 11, 17, 56);


    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private Gson gson;

    @MockBean
    private JwtTokenizer jwtTokenizer;

    @MockBean
    private DealService dealService;

    @MockBean
    private DealMapper mapper;

    @Test
    void 거래글등록() throws Exception {
        //given
        DealPostDto postDeal = DealPostDto.builder().title("첫번째 거래글").content("첫번째 물건 팝니다")
                .category(1).price(10000).area(3).build();
        String content = gson.toJson(postDeal);

        DealResponseDto response = DealResponseDto.builder().title("첫번째 거래글").content("첫번째 물건 팝니다").dealId(1L).price(10000)
                .createdAt(time).modifiedAt(time)
                .category(1).area(3).state(0).images(new ArrayList<>()).memberLikeNum(0).view(0).build();

        BDDMockito.given(dealService.postDeal(Mockito.any(DealPostDto.class), Mockito.anyList(), Mockito.anyLong())).willReturn(response);
//        MockMvcRequestBuilders.multipart("/deal")\
//                .part()   //DTO, Image를 변환해서 넣어보기 **

        //when
        ResultActions perform = mockMvc.perform(
                RestDocumentationRequestBuilders.post("/deal")
                        .accept(MediaType.APPLICATION_JSON)
                        .header("Authorization", token)
//                        .contentType(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.MULTIPART_FORM_DATA_VALUE)
                        .content(content)

        );

        //then
        perform
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.dealId").value(response.getDealId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value(response.getTitle()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").value(response.getContent()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.images").value(response.getImages()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.price").value(response.getPrice()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.category").value(response.getCategory()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.state").value(response.getState()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.area").value(response.getArea()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.view").value(response.getView()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.memberLikeNum").value(response.getMemberLikeNum()))
                .andDo(
                        MockMvcRestDocumentation.document("post-deal",
                                Preprocessors.preprocessRequest(Preprocessors.prettyPrint()),
                                Preprocessors.preprocessResponse(Preprocessors.prettyPrint()),
                                PayloadDocumentation.requestFields(
                                        PayloadDocumentation.fieldWithPath("title").type(JsonFieldType.STRING).description("거래 제목"),
                                        PayloadDocumentation.fieldWithPath("content").type(JsonFieldType.STRING).description("거래 내용"),
                                        PayloadDocumentation.fieldWithPath("price").type(JsonFieldType.NUMBER).description("가격"),
                                        PayloadDocumentation.fieldWithPath("category").type(JsonFieldType.NUMBER).description("카테고리"),
                                        PayloadDocumentation.fieldWithPath("area").type(JsonFieldType.NUMBER).description("지역"),

                                        PayloadDocumentation.fieldWithPath("images").type(MediaType.MULTIPART_FORM_DATA_VALUE).description("거래 이미지")
                                ),
                                PayloadDocumentation.responseFields(
                                        PayloadDocumentation.fieldWithPath("dealId").type(JsonFieldType.NUMBER).description("거래 PK"),
                                        PayloadDocumentation.fieldWithPath("title").type(JsonFieldType.STRING).description("거래 제목"),
                                        PayloadDocumentation.fieldWithPath("content").type(JsonFieldType.STRING).description("거래 내용"),
                                        PayloadDocumentation.fieldWithPath("images").type(JsonFieldType.ARRAY).description("거래 이미지"),
                                        PayloadDocumentation.fieldWithPath("price").type(JsonFieldType.NUMBER).description("가격"),
                                        PayloadDocumentation.fieldWithPath("category").type(JsonFieldType.NUMBER).description("카테고리"),
                                        PayloadDocumentation.fieldWithPath("state").type(JsonFieldType.NUMBER).description("거래 상태"),
                                        PayloadDocumentation.fieldWithPath("area").type(JsonFieldType.NUMBER).description("지역"),
                                        PayloadDocumentation.fieldWithPath("view").type(JsonFieldType.NUMBER).description("조회수"),
                                        PayloadDocumentation.fieldWithPath("memberLikeNum").type(JsonFieldType.NUMBER).description("좋아요수"),
                                        PayloadDocumentation.fieldWithPath("createdAt").type(JsonFieldType.STRING).description("작성날짜"),
                                        PayloadDocumentation.fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정날짜")
                                )
                        )
                )
                .andDo(MockMvcResultHandlers.print());
    }


    @Test
    void 거래글수정() throws Exception {
        //given
        DealPostDto postDeal = DealPostDto.builder().title("수정된 거래글").content("수정된 물건 팝니다")
                .category(1).price(12000).area(3).build();
        String content = gson.toJson(postDeal);

        DealResponseDto response = DealResponseDto.builder().title("수정된 거래글").content("수정된 물건 팝니다")
                .dealId(1L).price(12000).createdAt(time).modifiedAt(time)
                .category(1).area(3).state(0).images(new ArrayList<>()).memberLikeNum(0).view(0).build();

        BDDMockito.given(dealService.patchDeal(Mockito.anyLong(), Mockito.anyList(), Mockito.any(DealPostDto.class))).willReturn(response);

        //when
        ResultActions perform = mockMvc.perform(
                RestDocumentationRequestBuilders.post("/deal/{deal-id}", 1L)
                        .accept(MediaType.APPLICATION_JSON)
                        .header("Authorization", token)
                        .contentType(MediaType.APPLICATION_JSON)
                        .content(content)
        );

        //then
        perform
                .andExpect(MockMvcResultMatchers.status().isCreated())
                .andExpect(MockMvcResultMatchers.jsonPath("$.dealId").value(response.getDealId()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.title").value(response.getTitle()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.content").value(response.getContent()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.images").value(response.getImages()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.price").value(response.getPrice()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.category").value(response.getCategory()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.state").value(response.getState()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.area").value(response.getArea()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.view").value(response.getView()))
                .andExpect(MockMvcResultMatchers.jsonPath("$.memberLikeNum").value(response.getMemberLikeNum()))
                .andDo(
                        MockMvcRestDocumentation.document("post-deal",
                                Preprocessors.preprocessRequest(Preprocessors.prettyPrint()),
                                Preprocessors.preprocessResponse(Preprocessors.prettyPrint()),
                                PayloadDocumentation.requestFields(
                                        PayloadDocumentation.fieldWithPath("title").type(JsonFieldType.STRING).description("거래 제목"),
                                        PayloadDocumentation.fieldWithPath("content").type(JsonFieldType.STRING).description("거래 내용"),
                                        PayloadDocumentation.fieldWithPath("price").type(JsonFieldType.NUMBER).description("가격"),
                                        PayloadDocumentation.fieldWithPath("category").type(JsonFieldType.NUMBER).description("카테고리"),
                                        PayloadDocumentation.fieldWithPath("area").type(JsonFieldType.NUMBER).description("지역"),
                                        PayloadDocumentation.fieldWithPath("images").type(MediaType.MULTIPART_FORM_DATA_VALUE).description("거래 이미지")
                                ),
                                PayloadDocumentation.responseFields(
                                        PayloadDocumentation.fieldWithPath("dealId").type(JsonFieldType.NUMBER).description("거래 PK"),
                                        PayloadDocumentation.fieldWithPath("title").type(JsonFieldType.STRING).description("거래 제목"),
                                        PayloadDocumentation.fieldWithPath("content").type(JsonFieldType.STRING).description("거래 내용"),
                                        PayloadDocumentation.fieldWithPath("images").type(JsonFieldType.ARRAY).description("거래 이미지"),
                                        PayloadDocumentation.fieldWithPath("price").type(JsonFieldType.NUMBER).description("가격"),
                                        PayloadDocumentation.fieldWithPath("category").type(JsonFieldType.NUMBER).description("카테고리"),
                                        PayloadDocumentation.fieldWithPath("state").type(JsonFieldType.NUMBER).description("거래 상태"),
                                        PayloadDocumentation.fieldWithPath("area").type(JsonFieldType.NUMBER).description("지역"),
                                        PayloadDocumentation.fieldWithPath("view").type(JsonFieldType.NUMBER).description("조회수"),
                                        PayloadDocumentation.fieldWithPath("memberLikeNum").type(JsonFieldType.NUMBER).description("좋아요수"),
                                        PayloadDocumentation.fieldWithPath("createdAt").type(JsonFieldType.STRING).description("작성날짜"),
                                        PayloadDocumentation.fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정날짜")
                                )
                        )
                )
                .andDo(MockMvcResultHandlers.print());
    }

    @Test
    void 거래글조회_검색() throws Exception {
        //given
        DealResponseDto res1 = DealResponseDto.builder().title("첫번째 거래글").content("첫번째 물건 팝니다").dealId(1L).price(10000)
                .createdAt(time).modifiedAt(time)
                .category(1).area(3).state(0).images(new ArrayList<>()).memberLikeNum(0).view(0).build();
        DealResponseDto res2 = DealResponseDto.builder().title("수정된 거래글").content("수정된 물건 팝니다")
                .dealId(1L).price(12000).createdAt(time).modifiedAt(time)
                .category(1).area(3).state(0).images(new ArrayList<>()).memberLikeNum(0).view(0).build();
        PageInfo pageInfo = new PageInfo(0, 2, 2, 1);

        List<DealResponseDto> dealList = new ArrayList<>();
        dealList.add(res1); dealList.add(res2);
        DealPagingDto<List> response = new DealPagingDto<>(dealList, pageInfo);
        BDDMockito.given(dealService.getDealList(Mockito.anyString(), Mockito.anyInt(), Mockito.anyInt())).willReturn(response);

        MultiValueMap<String, String> params = new LinkedMultiValueMap<>();
        params.add("page", "1");
        params.add("size", "2");

        //when
        ResultActions perform = mockMvc.perform(
                RestDocumentationRequestBuilders.get("/deal")
                        .params(params)
                        .header("Authorization", token)
                        .accept(MediaType.APPLICATION_JSON)
                        .contentType(MediaType.APPLICATION_JSON)
        );

        //then
        perform
                .andExpect(MockMvcResultMatchers.status().isOk())
                .andExpect(MockMvcResultMatchers.jsonPath("$.data").value(response.getData()))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.data.title").value(response.getTitle()))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.data.content").value(response.getContent()))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.data.images").value(response.getImages()))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.data.price").value(response.getPrice()))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.data.category").value(response.getCategory()))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.data.state").value(response.getState()))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.data.area").value(response.getArea()))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.data.view").value(response.getView()))
//                .andExpect(MockMvcResultMatchers.jsonPath("$.data.memberLikeNum").value(response.getMemberLikeNum()))
                .andDo(
                        MockMvcRestDocumentation.document("get-deal",
                                Preprocessors.preprocessRequest(Preprocessors.prettyPrint()),
                                Preprocessors.preprocessResponse(Preprocessors.prettyPrint()),
                                RequestDocumentation.pathParameters(
                                        RequestDocumentation.parameterWithName("page").description("조회 페이지"),
                                        RequestDocumentation.parameterWithName("size").description("조회 사이즈")
                                ),
                                PayloadDocumentation.responseFields(
                                        PayloadDocumentation.fieldWithPath("data").type(JsonFieldType.OBJECT).description("조회 거래글"),
                                        PayloadDocumentation.fieldWithPath("pageInfo").type(JsonFieldType.OBJECT).description("페이지 정보")
//                                        PayloadDocumentation.fieldWithPath("content").type(JsonFieldType.STRING).description("거래 내용"),
//                                        PayloadDocumentation.fieldWithPath("images").type(JsonFieldType.ARRAY).description("거래 이미지"),
//                                        PayloadDocumentation.fieldWithPath("price").type(JsonFieldType.NUMBER).description("가격"),
//                                        PayloadDocumentation.fieldWithPath("category").type(JsonFieldType.NUMBER).description("카테고리"),
//                                        PayloadDocumentation.fieldWithPath("state").type(JsonFieldType.NUMBER).description("거래 상태"),
//                                        PayloadDocumentation.fieldWithPath("area").type(JsonFieldType.NUMBER).description("지역"),
//                                        PayloadDocumentation.fieldWithPath("view").type(JsonFieldType.NUMBER).description("조회수"),
//                                        PayloadDocumentation.fieldWithPath("memberLikeNum").type(JsonFieldType.NUMBER).description("좋아요수"),
//                                        PayloadDocumentation.fieldWithPath("createdAt").type(JsonFieldType.STRING).description("작성날짜"),
//                                        PayloadDocumentation.fieldWithPath("modifiedAt").type(JsonFieldType.STRING).description("수정날짜")
                                )
                        )
                )
                .andDo(MockMvcResultHandlers.print());
    }


    @Test
    void 거래글삭제() throws Exception {

        //given
        Long dealId = 1L;
        BDDMockito.doNothing().when(dealService).removeDeal(Mockito.anyLong());

        //when
        ResultActions action = mockMvc.perform(
                RestDocumentationRequestBuilders.delete("/deal/{deal-id}", dealId)
                        .header("Authorization", token)
        );

        //then
        action.andExpect(MockMvcResultMatchers.status().isNoContent())
                .andDo(MockMvcRestDocumentation.document("delete-deal",
                        Preprocessors.preprocessRequest(Preprocessors.prettyPrint()),
                        Preprocessors.preprocessResponse(Preprocessors.prettyPrint()),
                        RequestDocumentation.pathParameters(
                                RequestDocumentation.parameterWithName("deal-id").description("거래글 아이디")
                        )
                ))
                .andReturn();
    }
*/
}