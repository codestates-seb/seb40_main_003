import { ProfileCard, SigButton, SigTag, TagWrapper } from "../../Components/GlobalComponents";
import { MainCenterWrapper, MainContentContainer, MainRightWrapper, RowWrapper, SectionWrapper } from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useFetch from "../../Hooks/useFetch";
import { useParams } from "react-router-dom";
import { FieldErrors, useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import styled from "@emotion/styled";
import { profileType } from "../../types/profileType";

type Props = {}

interface ProductReviewEditorForm {
    content: string;
    errors?: string;
    checked: boolean;

}

const CareReviewEditor = () => {
  const axiosPrivate = useAxiosPrivate();
  const {
    register, handleSubmit, formState: {errors},} = useForm<ProductReviewEditorForm>({
      mode: "onSubmit"
    })

  // const { id } = useParams();
  const data = useFetch<profileType>(`/profile/${1}`);

  const onInValid = (errors: FieldErrors) => {};
  const onValid = async (data: ProductReviewEditorForm) => {}
    
    usePageTitle("거래 리뷰 글쓰기");
  console.log(data);
  return data ? (
    <MainContentContainer as={"form"} onSubmit={handleSubmit(onValid, onInValid)}>
      <MainCenterWrapper>
        <SectionWrapper>
        <ProfileCard
            pk={1}
            src={data.image!==null?data.image.imgUrl:""}
            alt={`${data.nickname}의 대표사진`}
            name={data.nickname}
            location={data.memberInformation?.address}
            circle={true}
            size={"66"}
          />
        </SectionWrapper>

        <SectionWrapper width={100} borderNone={true}>
          <textarea 
          className="review-height"
          minLength={10}
          maxLength={200}
          placeholder="이번 거래는 어땠나요? 솔직한 리뷰를 작성해주세요."
          {...register("content", {
            required: true
          })}>
          </textarea>
        </SectionWrapper>

        <RowWrapper className="mt-8">
          <input
          {...register("checked", { required: true })}
          type="checkbox" className="border-none checkbox-20"/>
          <label className={errors.checked?"sub font-gray":"sub alert-red"}>
            식물처럼 싱그럽고 예쁜 말을 써주세요.
            <br />
            욕설이나 선동성 글과 같은 부적절한 내용은 삭제 처리될 수 있습니다.
          </label>
        </RowWrapper>
      </MainCenterWrapper>
      <MainRightWrapper>
        <SigButton type="submit" value={"CommunityEditor"}>
          작성 완료
        </SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  ): ( 
    <></>
  )
  }

export default CareReviewEditor;