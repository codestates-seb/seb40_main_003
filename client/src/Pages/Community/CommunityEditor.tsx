import React from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { SigButton } from "../../Components/GlobalComponents";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import usePageTitle from "../../Hooks/usePageTitle";

const ConfirmWrapper = styled.span`
  display: flex;
  justify-content: row;
`;

interface CommunityEditorForm {
  title: string;
  content: string;
  image: string;
  password: string;
  errors?: string;
}

const CommunityEditor = () => {
  usePageTitle("커뮤니티 글 쓰기");

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<CommunityEditorForm>();
  const onValid = (data: CommunityEditorForm) => {
    console.log("나 발리드됨");
  };
  const onInValid = (errors: FieldErrors) => {};

  return (
    <MainContentContainer>
      <MainCenterWrapper>
        <section onSubmit={handleSubmit(onValid, onInValid)}>
          <SectionWrapper width={100} borderNone={true}>
            <>
              <input
                className="title"
                {...register("title", {
                  required: "",
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
                  required: "",
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
        </section>
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
            반려식물을 자랑하고 궁금한 것을 물어보세요.🌱
          </p>
        </SectionWrapper>
        <Link to={"../"}>
          <SigButton type="submit" className="disable">
            작성 완료
          </SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default CommunityEditor;
