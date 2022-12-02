import { ProfileCard, SigButton } from "../../Components/GlobalComponents";
import { MainCenterWrapper, MainContentContainer, MainRightWrapper, SectionWrapper } from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import useFetch from "../../Hooks/useFetch";
import { CareDetailTypes } from "../../types/caringTypes";
import { useParams } from "react-router-dom";

const CareReviewEditor = () => {
  const axiosPrivate = useAxiosPrivate();
  // const { id } = useParams();

  const data = useFetch<CareDetailTypes>(`/experts/${1}`);


  usePageTitle("돌봄 리뷰 글쓰기");
  console.log(data);
  return data ? (
    <MainContentContainer as={"form"}>
      <MainCenterWrapper>
        <SectionWrapper>
        <ProfileCard
          src={data.photo}
          alt={`${data.name}의 대표사진`}
          name={data.name}
          location={data.address}
          circle={true}
          size={"66"}
          tag={data.useNum}
          pk={data.member.memberId}
        />
        </SectionWrapper>
        <SectionWrapper width={100}>
          태그
        </SectionWrapper>
        <SectionWrapper width={100}>
          <textarea className="min-height" placeholder="전문가님의 돌봄은 어땠나요? 솔직한 리뷰를 작성해주세요.">
          </textarea>
        </SectionWrapper>
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
  ): ( 
    <></>
  )
  }

export default CareReviewEditor;

function handleSubmit(onValid: any, onInValid: any): import("react").FormEventHandler<HTMLDivElement> | undefined {
  throw new Error("Function not implemented.");
}
