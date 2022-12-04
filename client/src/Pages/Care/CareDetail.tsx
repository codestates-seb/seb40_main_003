import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ProfileCard, SigButton } from "../../Components/GlobalComponents";
import { ReactComponent as AddIcon } from "../../images/addIcon.svg";
import PlantCardCarousel, {
  ProfilePlantCard,
} from "../../Components/profile/plantCardCarousel";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SectionWrapper,
  SpaceBetween,
  SpaceEnd,
  RowWrapper,
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
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import LikeButton from "../../Components/LikeButton";
import { axiosPrivate } from "../../Hooks/api";

const CareDetail = () => {
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const { id } = useParams();
  const isAuthor = useIsAuthor();
  const onClickModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  const axiosprivate = useAxiosPrivate();
  const data = useFetch<CareDetailTypes>(`/experts/${id}`);
  const navigate = useNavigate();

  const LikeOnClick = () => {
    axiosPrivate
      .post(`/experts/${id}/like`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };

  usePageTitle(data !== undefined ? `${data.name} 님의 서비스` : "서비스");
  console.log(data);
  return data !== undefined ? (
    <MainContentContainer>
      <MainCenterWrapper>
        <SpaceEnd className="cursor">
          <LikeButton onClick={LikeOnClick} />
        </SpaceEnd>
        <SpaceBetween>
          <ProfileCard
            src={data.image!==null?data.image.imgUrl:""}
            alt={`${data.name}의 대표사진`}
            name={data.name}
            location={data.address}
            circle={true}
            size={"66"}
            tag={data.useNum}
            pk={data.member.memberId}
          />
        </SpaceBetween>
        {<RowWrapper className="pb-16 mt-8">{data.simpleContent}</RowWrapper>}
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
              {data.member.plants.length === 0 &&
              !isAuthor(data.member.memberId) ? (
                <>반려식물이 없습니다</>
              ) : (
                data.member.plants.map((e, i) => {
                  return (
                    <ProfilePlantCard
                      src={e.image.imgUrl}
                      alt={`${data.name}의 반려식물`}
                      name={e.name}
                      type={e.type}
                      key={`profilePlantCard ${e.plantId}`}
                      age={e.years}
                      plantId={e.plantId}
                    />
                  );
                })
              )}
              {isAuthor(data.member.memberId) && (
                <ColumnWrapper center={true} className="cursor">
                  <AddIcon onClick={onClickModal} height={"36px"} />
                  <span className="sub">반려식물 추가</span>
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
        <SectionWrapper title="기본비용" content={data.price} borderNone={true} />
        <SectionWrapper
          title="추가비용"
          content={data.extra}
          borderNone={true}
        />
        <SectionWrapper title="돌봄 리뷰" borderNone={true}>
          <>
            {data?.expertReviews.map((e) => {
              console.log(data);
              return (
                <CommentCard
                  name={e.member.nickname}
                  createdAt={getDateAgo(e.createdAt)}
                  content={e.content}
                  author={e.member.memberId}
                  key={`돌봄 ${e.expertReviewId}`}
                />
              );
            }) && <span className="mt-8">리뷰가 없습니다.</span>}
          </>
        </SectionWrapper>
      </MainCenterWrapper>
      <MainRightWrapper>
        <SigButton
          onClick={() => {
            axiosprivate.post(`/chat/experts/${data.expertId}`).then((e) => {
              navigate(`/talk/${e.data.roomName}`);
              console.log();
            });
          }}
        >
          문의 하기
        </SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <LoadingSpinner fullscreen={true} />
  );
};

export default CareDetail;
