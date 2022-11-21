import axios from "axios";
import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  ProfileCard,
  ProfilePlantCard,
  SigButton,
  CommentCard,
  AddProfilePlantCard,
} from "../../Components/GlobalComponents";
import PlantCardCarousel from "../../Components/profile/plantCardCarousel";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SectionWrapper,
  ColumnWrapper,
} from "../../Components/Wrapper";

import { currentPage } from "../../Recoil/atoms/currentPage";
import { userRole, userState } from "../../Recoil/atoms/user";
import { CareDetailTypes } from "../../types/CareDetailTypes";
import Modal from "../../Components/Modal";
import { useCallback } from "react";
import { LoadingSpinner } from "../../Components/Loading";
import AddPlantModal from "./AddPlantModal";

const CareDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<CareDetailTypes | null>(null);
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const { id } = useParams();
  const isLogin = useRecoilValue(userState);

  const setTitle = useSetRecoilState(currentPage);
  useEffect(() => {
    if (data !== null) {
      setTitle({ title: `${data.member.name} 님의 프로필` });
    }
  }, [data]);

  const onClickModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  useEffect(() => {
    try {
      axios.get(`/caring/${id}`).then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, [id]);
  return !isLoading && data !== null ? (
    <MainContentContainer>
      <MainCenterWrapper>
        <ProfileCard
          src={data.member.image.imgUrl}
          alt={`${data.member.name}의 대표사진`}
          name={data.member.name}
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
              {data.plant.map((e) => {
                return (
                  <ProfilePlantCard
                    src={data.member.image.imgUrl}
                    alt={`${data.member.name}의 반려식물`}
                    name={e.name}
                    type={e.plantType}
                    key={`profilePlantCard ${e.plantId}`}
                    age={e.year}
                  />
                );
              })}
              {/* {
                  isLogin?.userId===id? */}
              <ColumnWrapper center={true}>
                <AddProfilePlantCard onClick={onClickModal}>
                  추가
                </AddProfilePlantCard>
              </ColumnWrapper>
              {/* :<></>
                } */}
            </>
          </PlantCardCarousel>
        </SectionWrapper>
        <SectionWrapper title="보유기술" tag={data.techTag} borderNone={true} />
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
    <LoadingSpinner />
  );
};

export default CareDetail;
