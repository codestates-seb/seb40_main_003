import { FieldErrors, useForm } from "react-hook-form";
import { SigButton } from "../../Components/GlobalComponents";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import { Link, useLocation, useNavigate } from "react-router-dom";
import styled from "@emotion/styled";
import { useRecoilState } from "recoil";
import { userState } from "../../Recoil/atoms/user";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const ConfirmWrapper = styled.span`
  display: flex;
  justify-content: row;
`;

type Props = {};

interface CommunityEditorForm {
  title: string;
  content: string;
  image: File;
  errors?: string;
  file: any;
}

const CommunityEditor = (props: Props) => {
  const axiosPrivate = useAxiosPrivate();
  // const [user, setUser] = useRecoilState(userState);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityEditorForm>({
    mode: "onChange",
  });

  const onInValid = (errors: FieldErrors) => {};
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const onValid = async (data: CommunityEditorForm) => {
    console.log(data);
    
    const formData = new FormData();
    const postDto = JSON.stringify({ 
      title: data.title,
      image: data.image,
      content: data.content });

    formData.append("image", data.image);
    formData.append("postDto", new Blob([postDto],{type:"application/json"}));


      axiosPrivate
      .post("/community", formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        navigate(`/community/${res.data.communityId}`);
        navigate(from, {replace: true});
      }).catch ((err)=>{});
    }
  
  usePageTitle("커뮤니티 글 쓰기");


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
              id="picture"
              type="file"
              multiple
            />
            <p className="font-alert-red sub">{errors.image?.message}</p>
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <textarea
              className="content"
              {...register("content", {
                required: true,
              })}
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