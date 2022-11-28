import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { FetchByBody } from "../../Hooks/useFetch";
import usePageTitle from "../../Hooks/usePageTitle";
import { userState } from "../../Recoil/atoms/user";
import {
  ColumnWrapper,
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import {
  AddProfilePlantCard,
  ProfileCard,
  ProfilePlantCard,
  SigButton,
} from "../../Components/GlobalComponents";
import { Link } from "react-router-dom";
import { MockData } from "../../types/profileType";
import AddPlantModal from "../Main/AddPlantModal";
import Modal from "../../Components/Modal";
import { useCallback, useState } from "react";
import { CommentCard } from "../../Components/CommentCard";
import PlantCardCarousel from "../../Components/profile/plantCardCarousel";
import ProductCard from "../../Components/product/ProductCard";

const Profile = () => {
  const { id } = useParams();
  const isLogin = useRecoilValue(userState);
  // const data= FetchByBody<profileTypes>(`/profile/${id}`)
  const data = MockData;
  usePageTitle("프로필");
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);

  return (
    <>
      <MainContentContainer>
        <MainCenterWrapper>
          <ProfileCard
            src={data.image.imgUrl}
            alt={`${data.nickname}의 대표사진`}
            name={data.nickname}
            location={data.memberInformation.address}
            circle={true}
            size={"66"}
          />

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
                {data.plants.map((e, i) => {
                  return (
                    <ProfilePlantCard
                      src={e.image.imgUrl}
                      alt={`${data.nickname}의 반려식물 ${e.name}의 사진`}
                      name={e.name}
                      type={e.type}
                      key={`profilePlantCard ${e.plantId}`}
                      age={e.years}
                    />
                  );
                })}
                {
                  // isLogin?.memberId===id?
                <ColumnWrapper center={true}>
                  <AddProfilePlantCard onClick={onClickModal}>
                    +
                  </AddProfilePlantCard>
                </ColumnWrapper>
                // :<></>
                }
              </>
            </PlantCardCarousel>
          </SectionWrapper>
          <SectionWrapper width={100} title="거래 리뷰" borderNone={true}>
            <>
              {data.memberReviews.map((e) => {
                return (
                  <CommentCard
                    name={e.member.nickname}
                    createdAt={"날짜가 서버에서 안날아옵니다"}
                    content={e.content}
                    user={isLogin}
                    author={e.member.memberId}
                    key={`거래후기 ${e.dealReviewId}`}
                  />
                );
              })}
            </>
          </SectionWrapper>
          <SectionWrapper title="판매 상품" width={100}>
            <>
              {data.deals.map((e) => {
                // return <ProductCard data={e}/>;
              })}
            </>
          </SectionWrapper>
        </MainCenterWrapper>
        <MainRightWrapper>
          <Link to={"/setting"}>
            <SigButton>설정</SigButton>
          </Link>
        </MainRightWrapper>
      </MainContentContainer>
    </>
  );
};

export default Profile;
