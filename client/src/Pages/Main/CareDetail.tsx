import { useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  ProfileCard,

  SigButton,

} from "../../Components/GlobalComponents";
import PlantCardCarousel, { AddProfilePlantCard, ProfilePlantCard } from "../../Components/profile/plantCardCarousel";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SectionWrapper,
  ColumnWrapper,
} from "../../Components/Wrapper";

import { userState } from "../../Recoil/atoms/user";
import { CareDetailTypes } from "../../types/caringTypes";
import Modal from "../../Components/Modal";
import { useCallback } from "react";
import { LoadingSpinner } from "../../Components/Loading";
import AddPlantModal from "./AddPlantModal";
import usePageTitle from "../../Hooks/usePageTitle";
import useFetch from "../../Hooks/useFetch";
import { CommentCard } from "../../Components/CommentCard";

const CareDetail = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const { id } = useParams();

  const onClickModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const data = useFetch<CareDetailTypes>(`/experts/${id}`);

  usePageTitle(
    data !== undefined ? `${data.name} 님의 프로필` : "프로필"
  );
  return data !== undefined ? (
    <MainContentContainer>
      <MainCenterWrapper>
        <ProfileCard
          src={data.member.plants[0].image.imgUrl}
          alt={`${data.name}의 대표사진`}
          name={data.name}
          location={data.address}
          circle={true}
          size={"66"}
          tag={data.useNum}
        />
        {
          // isLogin?.userId===id?
          <SectionWrapper content={data.simpleContent} pt={0} pb={8} />
          // :<></>
        }
        {/* 모달창 */}
        <>
          {isOpenModal && (
            <Modal onClickModal={onClickModal}>
              <AddPlantModal />
            </Modal>
          )}
        </>
        {
          // isLogin?.userId===id?
          // :<></>
        }
        <SectionWrapper title="반려 식물">
          <PlantCardCarousel key={"reactCarousel"}>
            <>
              {data.member.plants.map((e) => {
                return (
                  <ProfilePlantCard
                    src={data.member.plants[0].image.imgUrl}
                    alt={`${data.name}의 반려식물`}
                    name={e.name}
                    type={e.type}
                    key={`profilePlantCard ${e.plantId}`}
                    age={e.years}
                    plandId={e.plantId}
                  />
                );
              })}
              {/* {
                  isLogin?.userId===id? */}
              <ColumnWrapper center={true}>
                <AddProfilePlantCard onClick={onClickModal}>
                  +
                </AddProfilePlantCard>
              </ColumnWrapper>
              {/* :<></>
                } */}
            </>
          </PlantCardCarousel>
        </SectionWrapper>
        <SectionWrapper title="보유기술" tag={data.techTags} borderNone={true} />
        <SectionWrapper
          title="소개합니다"
          content={data.detailContent}
          borderNone={true}
        />
        <SectionWrapper
          title="기본비용"
          price={data.price}
          borderNone={true}
        />
        <SectionWrapper
          title="추가비용"
          content={data.extra}
          borderNone={true}
        />
        <SectionWrapper title="돌봄 리뷰" borderNone={true}>
          <>
            {data.expertReviews.map((e) => {
              return (
                <CommentCard
                  name={e.member.nickname}
                  // ==================날짜 안날오옴==================
                  createdAt={"날짜가 서버에서 안날아옵니다"}
                  content={e.content}
                  author={e.member.memberId}
                  key={`돌봄 ${e.expertReviewId}`}
                />
              );
            })}
          </>
        </SectionWrapper>
      </MainCenterWrapper>
      <MainRightWrapper>
        <SigButton>문의 하기</SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <LoadingSpinner fullscreen={true}/>
  );
};

export default CareDetail;
