import styled from "@emotion/styled";
import { FieldErrors, useForm } from "react-hook-form";
import { SigButton } from "../../Components/GlobalComponents";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useRecoilState } from "recoil";
import { editDataAtom } from "../../Recoil/atoms/editData";

const ConfirmWrapper = styled.span`
  display: flex;
  justify-content: row;
`;

type Props = {};

interface CommunityModifyForm {
  title: string;
  image: FileList;
  file: any;
  content: string;
  checked: boolean;
  errors?: string;
}

const CommunityModify = (props: Props) => {
  const axiosPrivate = useAxiosPrivate();
  // const [user, setUser] = useRecoilState(userState);
  const [editData, setEditData] = useRecoilState(editDataAtom)


  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CommunityModifyForm>({
    mode: "onChange",
  });

  const onInValid = (errors: FieldErrors) => {};
  const navigate = useNavigate();

  const  onValid =  async (data: CommunityModifyForm) => {
    const formData = new FormData();
    const patchDto = JSON.stringify({ 
      title: data.title,
      content: data.content });

    formData.append("images", data.image[0]);
    formData.append("patchDto", new Blob([patchDto],{type:"application/json"}));

      axiosPrivate
      .patch(`/community/${editData?.communityId}`, formData, {
        headers: {
          "Content-Type": "multipart/form-data"
        }
      })
      .then((res) => {
        console.log(res)
        setEditData(null);
        navigate(`/community/${editData?.communityId}`);
      }).catch ((err)=>{});
    }

  
  usePageTitle("커뮤니티 글 쓰기");


  return (
    <MainContentContainer as={"form"} onSubmit={handleSubmit(onValid, onInValid)}>
      <MainCenterWrapper>
        <SectionWrapper width={100} borderNone={true}>
          <>
            <input
            defaultValue={editData?.title}
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

        <SectionWrapper width={100} >
          <>
            <input
            // defaultValue={editData.images[0]}
              className="image cursor"
              {...register("image", 
              // {required: true}
                )}
              id="image"
              type="file"
              accept="image/*"
              name="image"
              multiple
            />
            <p className="font-alert-red sub">{errors.image?.message}</p>
          </>
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <>
            <textarea
            defaultValue={editData?.content}
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
          <input
          {...register("checked", { required: true })}
          type="checkbox" className="border-none checkbox-20"/>
          <label className={errors.checked?"sub font-gray":"sub alert-red"}>
            식물처럼 싱그럽고 예쁜 말을 써주세요.
            <br />
            욕설이나 선동성 글과 같은 부적절한 내용은 삭제 처리될 수 있습니다.
          </label>
        </ConfirmWrapper>
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
            반려식물을 자랑하고 궁금한 것을 물어보세요.🌱
          </p>
        </SectionWrapper>
        <SigButton type="submit"  value={"CommunityModify"}>
          수정 완료
        </SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default CommunityModify;