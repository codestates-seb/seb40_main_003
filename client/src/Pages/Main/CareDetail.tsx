import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilState, useRecoilStateLoadable, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ProfileCard,
  ProfilePlantCard,
  SigButton,
  CommentCard,
} from "../../Components/GlobalComponents";
import PlantCardCarousel from "../../Components/profile/plantCardCarousel";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import { currentPage } from "../../Recoil/atoms/currentPage";
import { userState } from "../../Recoil/atoms/user";
import { CareDetailTypes } from "../../types/CareDetailTypes";

const CareDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CareDetailTypes | null>(null);
  const { id } = useParams();
  const isLogin = useRecoilValue(userState);

  const setTitle= useSetRecoilState(currentPage)
    useEffect(()=>{
    if(data!==null){
      setTitle({title:`${data.member.name} 님의 프로필`})
    }
  },[data])
  
  useEffect(() => {
    try {
      axios.get(`/caring/${id}`).then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
    } catch (err) {
      console.log(err);
    }
  }, [id]);


  


  return !isLoading && data !== null ? (
    <MainContentContainer>
      <MainCenterWrapper>
        <section>
          <Link to={isLogin ? `/caring/${data.member.memberId}` : ""}>
            <ProfileCard
              src={data.member.image.imgUrl}
              alt={`${data.expertReview[0].writer.nickname}의 대표사진`}
              name={data.expertReview[0].writer.nickname}
              location={data.address}
              circle={true}
              size={"66"}
              tag={data.useNum}

              // 태그
              // <ViewCounter like={data.userLikeExpert} view={data.view} />
            />
          </Link>
          <SectionWrapper content={data.simpleContent} pb={8} />
          <SectionWrapper title="반려 식물">
            <PlantCardCarousel key={"reactCarousel"}>
              <>
                {data.plant.map((e) => {
                  return (
                    <ProfilePlantCard
                      src={data.member.image.imgUrl}
                      alt={`${data.member.name}의 반려식물`}
                      name={e.name}
                      type={e.plantType}
                      key={e.plantId}
                      age={e.year}
                    />
                  );
                })}
              </>
            </PlantCardCarousel>
          </SectionWrapper>
          <SectionWrapper
            title="보유기술"
            tag={data.techTag}
            borderNone={true}
          />
          <SectionWrapper
            title="소개합니다"
            content={data.detailContent}
            borderNone={true}
          />
          <SectionWrapper
            title="기본비용"
            content={data.price}
            borderNone={true}
          />
          <SectionWrapper
            title="추가비용"
            content={data.extra}
            borderNone={true}
          />
          <SectionWrapper title="돌봄 리뷰" borderNone={true}>
            <>
              {data.expertReview.map((e) => {
                return (
                  <CommentCard
                    name={e.writer.nickname}
                    // ==================날짜 안날오옴==================
                    createdAt={"날짜가 서버에서 안날아옵니다"}
                    content={e.content}
                    user={isLogin}
                    author={e.writer.memberId}
                    key={e.expertReviewId}
                  />
                );
              })}
            </>
          </SectionWrapper>
        </section>
      </MainCenterWrapper>
      <MainRightWrapper>
        <SigButton>문의 하기</SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <>loading...</>
  );
};

export default CareDetail;
