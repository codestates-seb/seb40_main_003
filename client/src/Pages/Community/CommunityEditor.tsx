import React, { useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { SigButton } from "../../Components/GlobalComponents";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import usePageTitle from "../../Hooks/usePageTitle";
import { axiosPrivate } from "../../Hooks/api";
import { useRecoilState } from "recoil";
import { userState } from "../../Recoil/atoms/user";

const ConfirmWrapper = styled.span`
  display: flex;
  justify-content: row;
`;

interface CommunityEditorForm {
  title: string;
  content: string;
  image: string;
  errors?: string;
}

const CommunityEditor = () => {
  const [user, setUser] = useRecoilState(userState);
  const [error, setErrMsg] = useState("");
  usePageTitle("커뮤니티 글 쓰기");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CommunityEditorForm>({
    mode: "onChange",
  });

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onValid = async (data: CommunityEditorForm) => {
    console.log(data);
    try {
      axiosPrivate
        .post("/community/write", {
          title: data.title,
          content: data.content,
        })
        .then((res) => {
          // 전역상태로 로그인 관련정보, 토큰 받아야함
          setUser(res.data);
        })
        .then(() => {
          // 원래있던 페이지로 되돌림
          navigate(from, { replace: true });
        });
    } catch (err: any) {
      if (!err?.response) {
        setErrMsg("서버로부터 응답이 없습니다");
      } else if (err.response?.status === 400) {
        setErrMsg("이메일 또는 패스워드를 확인해주세요");
        console.log(err);
      } else if (err.response?.status === 401) {
        setErrMsg("허가되지않은 접근입니다");
      } else {
        setErrMsg("로그인에 실패했습니다");
      }
    }
  };


  return (
    <MainContentContainer as={"form"} onSubmit={handleSubmit(onValid)}>
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
            {error&&<p>{error}</p>}
          </ConfirmWrapper>
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
            반려식물을 자랑하고 궁금한 것을 물어보세요.🌱
          </p>
        </SectionWrapper>
          <SigButton type="submit" value={"CommunityEditor"}>
            작성 완료
          </SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default CommunityEditor;
