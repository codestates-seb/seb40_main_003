import { useParams } from "react-router-dom";

import useFetch from "../../Hooks/useFetch";
import usePageTitle from "../../Hooks/usePageTitle";

import {
  ColumnWrapper,
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import { ProfileCard, SigButton } from "../../Components/GlobalComponents";
import { Link } from "react-router-dom";
import { profileType } from "../../types/profileType";
import AddPlantModal from "../Main/AddPlantModal";
import Modal from "../../Components/Modal";
import { useCallback, useState } from "react";
import { CommentCard } from "../../Components/CommentCard";
import PlantCardCarousel, {
  AddProfilePlantCard,
  ProfilePlantCard,
} from "../../Components/profile/plantCardCarousel";
import ProductCard from "../../Components/product/ProductCard";
import { useIsAuthor } from "../../Hooks/useIsAuthor";
const Profile = () => {
  // 페이지주소
  const { id } = useParams();
  // 작성자와 로그인유저 확인
  const isAuthor = useIsAuthor();
  // 데이터 패칭
  const data = useFetch<profileType>(`/profile/${id}`);
  // 페이지 설정
  usePageTitle("프로필");
  // 모달
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return data ? (
    <>
      <MainContentContainer>
        <MainCenterWrapper>
          <ProfileCard
            src={data.image?.imgUrl}
            alt={`${data.nickname}의 대표사진`}
            name={data.nickname}
            location={data.memberInformation?.address}
            circle={true}
            size={"66"}
          />
          <SectionWrapper content={data.memberProfile.content} pt={0} pb={8} />

          {/* 모달창 */}
          <>
            {isOpenModal && (
              <Modal onClickModal={onClickModal}>
                <AddPlantModal closeModal={onClickModal} />
              </Modal>
            )}
          </>
          {
            // userInfo?.userId===id?
            // :<></>
          }
          <SectionWrapper title="반려 식물">
            <PlantCardCarousel key={"reactCarousel"}>
              <>
                {data.plants.map((e, i) => {
                  return (
                    <ProfilePlantCard
                      src={e.image.imgUrl}
                      alt={`${data.nickname}의 반려식물 ${e.name}의 사진`}
                      name={e.name}
                      type={e.type}
                      key={`profilePlantCard ${e.plantId}`}
                      age={e.years}
                      plandId={e.plantId}
                    />
                  );
                })}
                {isAuthor(id) ? (
                  <ColumnWrapper center={true}>
                    <AddProfilePlantCard onClick={onClickModal}>
                      +
                    </AddProfilePlantCard>
                  </ColumnWrapper>
                ) : (
                  <></>
                )}
              </>
            </PlantCardCarousel>
          </SectionWrapper>
          <SectionWrapper width={100} title="거래 리뷰">
            {data.memberReviews.length !== 0 ? (
              <>
                {data.memberReviews.map((e) => {
                  return (
                    <CommentCard
                      name={e.member.nickname}
                      createdAt={"날짜가 서버에서 안날아옵니다"}
                      content={e.content}
                      author={e.member.memberId}
                      key={`거래후기 ${e.dealReviewId}`}
                    />
                  );
                })}
              </>
            ) : (
              <span className="mt-8">거래후기가 없습니다</span>
            )}
          </SectionWrapper>
          <SectionWrapper title="판매 상품" width={100}>
            {data.deals.length !== 0 ? (
              <>
                {data.deals.map((e) => {
                  return (
                    <Link to={`/product/${e.dealId}`}>
                      <ProductCard data={e} />
                    </Link>
                  );
                })}
              </>
            ) : (
              <span className="mt-8">판매중인 상품이 없습니다</span>
            )}
          </SectionWrapper>
        </MainCenterWrapper>
        <MainRightWrapper>
          <Link to={"/setting"}>
            <SigButton>설정</SigButton>
          </Link>
        </MainRightWrapper>
      </MainContentContainer>
    </>
  ) : (
    <></>
  );
};

export default Profile;
