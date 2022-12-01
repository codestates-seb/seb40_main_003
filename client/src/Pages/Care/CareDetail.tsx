import { useState } from "react";
import { useParams } from "react-router-dom";
import { ProfileCard, SigButton } from "../../Components/GlobalComponents";
import PlantCardCarousel, {
  AddProfilePlantCard,
  ProfilePlantCard,
} from "../../Components/profile/plantCardCarousel";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SectionWrapper,
  ColumnWrapper,
} from "../../Components/Wrapper";

import { CareDetailTypes } from "../../types/caringTypes";
import Modal from "../../Components/Modal";
import { useCallback } from "react";
import { LoadingSpinner } from "../../Components/Loading";
import AddPlantModal from "./AddPlantModal";
import usePageTitle from "../../Hooks/usePageTitle";
import useFetch from "../../Hooks/useFetch";
import { CommentCard } from "../../Components/CommentCard";
import { useIsAuthor } from "../../Hooks/useAuth";
import { getDateAgo } from "../../utils/controller";

const CareDetail = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const { id } = useParams();
  const isAuthor = useIsAuthor();
  const onClickModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  const data = useFetch<CareDetailTypes>(`/experts/${id}`);

  usePageTitle(data !== undefined ? `${data.name} 님의 프로필` : "프로필");
  console.log(data);
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
          pk={data.member.memberId}
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
                    plantId={e.plantId}
                  />
                );
              })}
              {isAuthor(data.member.memberId) && (
                <ColumnWrapper center={true}>
                  <AddProfilePlantCard onClick={onClickModal}>
                    +
                  </AddProfilePlantCard>
                </ColumnWrapper>
              )}
            </>
          </PlantCardCarousel>
        </SectionWrapper>
        <SectionWrapper
          title="보유기술"
          tag={data.techTags}
          borderNone={true}
        />
        <SectionWrapper
          title="소개합니다"
          content={data.detailContent}
          borderNone={true}
        />
        <SectionWrapper title="기본비용" price={data.price} borderNone={true} />
        <SectionWrapper
          title="추가비용"
          content={data.extra}
          borderNone={true}
        />
        <SectionWrapper title="돌봄 리뷰" borderNone={true}>
          <>
            {data?.expertReviews.map((e) => {
              return (
                <CommentCard
                  name={e.member.nickname}
                  createdAt={getDateAgo(e.createdAt)}
                  content={e.content}
                  author={e.member.memberId}
                  key={`돌봄 ${e.expertReviewId}`}
                />
              );
            })&& <span className="mt-8">리뷰가 없습니다.</span>}
          </>
        </SectionWrapper>
      </MainCenterWrapper>
      <MainRightWrapper>
        <SigButton>문의 하기</SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <LoadingSpinner fullscreen={true} />
  );
};

export default CareDetail;
