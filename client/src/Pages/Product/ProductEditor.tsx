import styled from "@emotion/styled";
// import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { SigButton } from "../../Components/GlobalComponents";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { axiosPrivate } from "../../Hooks/api";
import { userState } from "../../Recoil/atoms/user";
import { useState, useEffect } from "react";
import { useRecoilState } from "recoil";
const ConfirmWrapper = styled.span`
  display: flex;
  justify-content: row;
`;

type Props = {};

interface ProductEditorForm {
  title: string;
  image: File;
  category: number;
  content: string;
  price: number;
  errors?: string;
}

const ProductEditor = (props: Props) => {
  const [user, setUser] = useRecoilState(userState);
  const {
    register,
    handleSubmit,
    setFocus,
    formState: { errors },
  } = useForm<ProductEditorForm>({
    mode: "onChange",
  });
  
  useEffect(() => {
    setFocus("title");
  }, []);

  const onInValid = (errors: FieldErrors) => {};
  usePageTitle("거래 글 쓰기");
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onValid = async (data: ProductEditorForm) => {
    console.log(data);

      axiosPrivate
        .post("/deal", {
          title: data.title,
          image: data.image,
          price: data.price,
          content: data.content,
        })
        .then((res) => {
          // 전역상태로 로그인 관련정보, 토큰 받아야함
          setUser(res.data);
        })
        .then(() => {
          // 원래있던 페이지로 되돌림
          navigate(from, { replace: true });
        }).catch ((err)=>{})
};

  return (
    <MainContentContainer as={"form"} onSubmit={handleSubmit(onValid, onInValid)}>
      <MainCenterWrapper>
          <SectionWrapper width={100} borderNone={true}>
            <>
              <input
                className="title"
                {...register("title", {
                  required: true,
                  minLength: {
                    message: "제목은 2글자 이상으로 작성해주세요.",
                    value: 2,
                  },
                  maxLength: {
                    message: "제목",
                    value: 30,
                  },
                })}
                type="Text"
                placeholder="제목"
              />
              <p className="font-alert-red sub">{errors.title?.message}</p>
            </>
          </SectionWrapper>

          <SectionWrapper>
            <>
              <input
                className="image"
                {...register("image")}
                id="image"
                type="file" multiple
              />
              <p className="font-alert-red sub">{errors.image?.message}</p>
            </>
          </SectionWrapper>

          <SectionWrapper>
            <>카테고리 선택</>
          </SectionWrapper>

          <SectionWrapper width={100} borderNone={true}>
            <>
              <input
                className="price"
                {...register("price", {
                  required: true,
                })}
                type="price"
                placeholder="가격"
              />
              <p className="font-alert-red sub">{errors.price?.message}</p>
            </>
          </SectionWrapper>
          <SectionWrapper width={100} borderNone={true}>
            <>
              <input
                className="content"
                {...register("content", {
                  required: true,
                })}
                type="content"
                placeholder="글쓰기"
              />
              <p className="font-alert-red sub">{errors.content?.message}</p>
            </>
          </SectionWrapper>

          <ConfirmWrapper>
            <input type="checkbox" className="border-none checkbox-20"></input>
            <p className="sub font-gray">
              식물처럼 싱그럽고 예쁜 말을 써주세요.
              <br />
              욕설이나 선동성 글과 같은 부적절한 내용은 삭제 처리될 수 있습니다.
            </p>
          </ConfirmWrapper>
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
            반려식물을 분양하고 원예 용품을 판매해보세요.🌿
          </p>
        </SectionWrapper>
          <SigButton type="submit" className="disable">
            작성 완료
          </SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default ProductEditor;
