import { useParams } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../images/addIcon.svg";
import useFetch from "../../Hooks/useFetch";
import defaultProfileImage from "../../images/defaultProfileImage.png";
import usePageTitle from "../../Hooks/usePageTitle";

import {
  ColumnWrapper,
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  ReverseWrap,
  RowWrapper,
  SectionWrapper,
  SpaceBetween,
} from "../../Components/Wrapper";
import { ProfileCard, SigButton } from "../../Components/GlobalComponents";
import { Link } from "react-router-dom";
import { profileType } from "../../types/profileType";
import AddPlantModal from "../Care/AddPlantModal";
import Modal from "../../Components/Modal";
import { useCallback, useState } from "react";
import { CommentCard } from "../../Components/CommentCard";
import PlantCardCarousel, {
  EditAndDeleteButton,
  ProfilePlantCard,
} from "../../Components/profile/plantCardCarousel";
import { useIsAuthor } from "../../Hooks/useAuth";
import ProductCard from "../../Components/product/ProductCard";
import EditPlantModal from "./EditPlantModal";
import SetUserModal from "./SetUserModal";

type props = {
  url?: string | undefined;
};

const Profile = (props: props) => {
  // 페이지주소
  const { id } = useParams();
  // 작성자와 로그인유저 확인
  const isAuthor = useIsAuthor();
  // 데이터 패칭
  const data = useFetch<profileType>(`/profile/${id}`);
  // 페이지 설정
  usePageTitle("프로필");
  
  // 반려식물 추가 모달
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState();
  const onClickModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);


  // 프로필 수정 모달
  const [isOpenModalProfile, setOpenModalProfile] = useState<boolean>(false);
  const [isEditingProfile, setIsEditingProfile] = useState();
  const onClickModalProfile = useCallback(() => {
    setOpenModalProfile(!isOpenModalProfile);
  }, [isOpenModalProfile]);

  return data ? (
    <>
      <MainContentContainer>
        <MainCenterWrapper>
          <>
            <>
              {isAuthor(id) ? (
                <SpaceBetween>
                  <button className="sub" onClick={onClickModalProfile}>프로필 수정</button>
                </SpaceBetween>
              ) : (
                <></>
              )}
            </>
            {isOpenModalProfile && (
              <Modal onClickModal={onClickModalProfile}>
                <SetUserModal closeModal={onClickModalProfile} url={id}/>
              </Modal>
            )}
          </>
          <ProfileCard
            pk={id}
            src={data.image!==null?data.image.imgUrl:defaultProfileImage}
            alt={`${data.nickname}의 대표사진`}
            name={data.nickname}
            location={data.memberInformation?.address}
            circle={true}
            size={"66"}
          />
          <RowWrapper className="pb-16 mt-8">
            {data.memberProfile?.content}
          </RowWrapper>
          <SectionWrapper title="반려 식물">
            {/* 모달창 */}
            <>
              {isOpenModal && (
                <Modal onClickModal={onClickModal}>
                  <AddPlantModal closeModal={onClickModal} />
                </Modal>
              )}
            </>
            <PlantCardCarousel key={"reactCarousel"}>
              <>
                {data.plants.map((e, i) => {
                  return (
                    <ProfilePlantCard
                      onClickModal={onClickModal}
                      src={e.image.imgUrl}
                      alt={`${data.nickname}의 반려식물 ${e.name}의 사진`}
                      name={e.name}
                      type={e.type}
                      key={`profilePlantCard ${e.plantId}`}
                      age={e.years}
                      plantId={e.plantId}
                    />
                  );
                })}
                {isAuthor(id) ? (
                  <ColumnWrapper center={true} className="cursor">
                    <AddIcon onClick={onClickModal} height={"36px"} />
                    <span className="sub">반려식물 추가</span>
                  </ColumnWrapper>
                ) : (
                  <></>
                )}
              </>
            </PlantCardCarousel>
          </SectionWrapper>
          <SectionWrapper width={100} title="거래 리뷰">
            {data.memberReviews && data.memberReviews.length !== 0 ? (
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
              <ReverseWrap>
                <Link to={"/setting/history/sales"}>
                  <button className="mt-8 ml-50 bold font-gray">더 보기</button>
                </Link>
                {data.deals.map((e, i) => {
                  if (data.deals.length - i < 4) {
                    return (
                      <Link
                        to={`/product/${e.dealId}`}
                        key={`product/${e.dealId}`}
                      >
                        <ProductCard data={e} />
                      </Link>
                    );
                  }
                })}
              </ReverseWrap>
            ) : (
              <span className="mt-8">판매중인 상품이 없습니다</span>
            )}
          </SectionWrapper>
        </MainCenterWrapper>
        {isAuthor(id)&&
        <MainRightWrapper>
          <Link to={"/setting"}>
            <SigButton>설정</SigButton>
          </Link>
        </MainRightWrapper>}
      </MainContentContainer>
    </>
  ) : (
    <></>
  );
};

export default Profile;
