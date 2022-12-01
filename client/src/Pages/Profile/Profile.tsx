import { useParams } from "react-router-dom";
import { ReactComponent as AddIcon } from "../../images/addIcon.svg";
import useFetch from "../../Hooks/useFetch";
import usePageTitle from "../../Hooks/usePageTitle";

import {
  ColumnWrapper,
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  ReverseWrap,
  SectionWrapper,
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
  // 모달
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const [isEditing, setIsEditing] = useState();
  const onClickModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  console.log(data);
  
  return data ? (
    <>
      <MainContentContainer>
        <MainCenterWrapper>
          <ProfileCard
            pk={id}
            src={data.image?.imgUrl}
            alt={`${data.nickname}의 대표사진`}
            name={data.nickname}
            location={data.memberInformation?.address}
            circle={true}
            size={"66"}
          />
          <SectionWrapper content={data.memberProfile?.content} pt={0} pb={8} />
          <SectionWrapper title="반려 식물">
            {/* 모달창 */}
            <>
              {isOpenModal && (
                <Modal onClickModal={onClickModal}>
                  {isEditing?
                  <AddPlantModal closeModal={onClickModal} />:<EditPlantModal />}
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
                  <ColumnWrapper center={true}>
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
            {data.memberReviews&&data.memberReviews.length !== 0 ? (
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
          <SectionWrapper title="판매 상품" width={100} pb={0}>
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
