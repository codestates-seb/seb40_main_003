import { ProfileCard, SigButton, SigTag, TagWrapper } from "../../Components/GlobalComponents";
import {  ConfirmWrapper, MainCenterWrapper, MainContentContainer, MainRightWrapper, SectionWrapper } from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useFetch from "../../Hooks/useFetch";
import { CareDetailTypes, techTagType } from "../../types/caringTypes";
import { FieldErrors, useForm } from "react-hook-form";

interface CareReviewEditorForm {
    content: string;
    errors?: string;
    checked: boolean;
}

const CareReviewEditor = () => {
  // const axiosPrivate = useAxiosPrivate();
  const {
    register, handleSubmit, formState: {errors},} = useForm<CareReviewEditorForm>({
      mode: "onSubmit"
    })

  // const { id } = useParams();
  const data = useFetch<CareDetailTypes>(`/experts/${1}`);

  const onInValid = (errors: FieldErrors) => {};
  const onValid = async (data: CareReviewEditorForm) => {}
    
    usePageTitle("돌봄 리뷰 글쓰기");
  return data ? (
    <MainContentContainer as={"form"} onSubmit={handleSubmit(onValid, onInValid)}>
      <MainCenterWrapper>
        <SectionWrapper>
        <ProfileCard
          src={data.image.imgUrl}
          alt={`${data.name}의 대표사진`}
          name={data.name}
          location={data.address}
          circle={true}
          size={"66"}
          pk={data.member.memberId}
        />
        </SectionWrapper>
        <SectionWrapper width={100}>
        <TagWrapper className="mt-4">
                {data.techTags.map((e: techTagType) => {
                  return (
                    <SigTag className="ghost sub" key={e.techTagId}>
                      {e.techTagName}
                    </SigTag>
                  );
                })}
              </TagWrapper>

        </SectionWrapper>
        <SectionWrapper width={100} borderNone={true}>
          <textarea 
          className="review-height"
          minLength={10}
          maxLength={200}
          placeholder="전문가님의 돌봄은 어땠나요? 솔직한 리뷰를 작성해주세요."
          {...register("content", {
            required: true
          })}>
          </textarea>
        </SectionWrapper>

        <ConfirmWrapper className="mt-8">
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