import { useState } from "react";
import { useForm } from "react-hook-form";
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
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const ConfirmWrapper = styled.span`
  display: flex;
  justify-content: row;
`;

interface CommunityEditorForm {
  title: string;
  content: string;
  images: string;
  errors?: string;
  file: any;
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
  const [auth, setAuth] = useRecoilState(userState);
  const axiosPrivate = useAxiosPrivate()

  const onValid = async (data: CommunityEditorForm) => {
    console.log(data);
    const dto = JSON.stringify({ title: data.title, content: data.content });
    const formData = new FormData();
    formData.append("images", data.file);
    formData.append("postDto", new Blob([dto],{type:"application/json"}));

    axiosPrivate
      .post("/community", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((res) => {
        console.log(res)
      })
      .then(() => {
        // 원래있던 페이지로 되돌림
        navigate(from, { replace: true });
      })
      .catch((err) => {
        if (!err?.response) {
          setErrMsg("서버로부터 응답이 없습니다");
          if(err?.response?.state === 403){
            navigate("/")
          }
        } else {
          setErrMsg("작성에 실패했습니다");
        }
      });
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
              className="images"
              {...register("images")}
              id="images"
              type="file"
              multiple
            />
            <p className="font-alert-red sub">{errors.images?.message}</p>
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
        {error && <p>{error}</p>}
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
