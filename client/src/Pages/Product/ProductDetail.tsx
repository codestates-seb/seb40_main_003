import { Link, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import { TopCarousel } from "../../Components/Carousel";
import {
  ProfileCard,
  SigButton,
  ViewCounter,
} from "../../Components/GlobalComponents";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper,
  SpaceBetween,
  SpaceEnd,
} from "../../Components/Wrapper";
import { userState } from "../../Recoil/atoms/user";
import { ProductDetailDataType } from "../../types/productTypes";
import { LoadingSpinner } from "../../Components/Loading";
import useFetch from "../../Hooks/useFetch";
import { getDateAgo } from "../../utils/controller";
import styled from "@emotion/styled";
import { productEditDataAtom } from "../../Recoil/atoms/editData";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { completeDelete, confirmRemove } from "../../Const/message";
import { useIsAuthor } from "../../Hooks/useAuth";
import { EditAndDeleteButton } from "../../Components/profile/plantCardCarousel";
import LikeButton from "../../Components/LikeButton";

const CarouselImage = styled.img`
  width: 100%;
  max-height: 45vh;
  overflow: hidden;
  object-fit: cover;
  background-color: var(--bg-gray);
`;

const Product = () => {
  const { id } = useParams();
  const axiosprivate = useAxiosPrivate();

  const user = useRecoilValue(userState);
  const isAuthor = useIsAuthor();

  const data = useFetch<ProductDetailDataType>(id ? `/deal/${id}` : "");
  const [productEditData, setProductEditData] =
    useRecoilState(productEditDataAtom);
  const axiosPrivate = useAxiosPrivate();
  const LikeOnClick = () => {
    axiosPrivate
      .post(`/deal/like/${id}`, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {});
  };

  const navigate = useNavigate();

  return data !== undefined ? (
    // 메인 컨테이너 (반응형 제공!)
    <MainContentContainer>
      <MainCenterWrapper>
        <SpaceEnd className="mb-8 cursor">
          <LikeButton onClick={LikeOnClick} />
        </SpaceEnd>
        {/* 실제 메인이 되는 내용! */}
        <TopCarousel>
          {data.images.map((e, i) => {
            return (
              <CarouselImage
                key={i}
                src={e}
                alt={`${data.title}의 ${i}번째사진`}
              />
            );
          })}
        </TopCarousel>
        <Link to={`/profile/${data.member.memberId}`}>
          <ProfileCard
            src={data.member.image.imgUrl}
            alt={`${data.member.nickname}의 대표사진`}
            name={data.member.nickname}
            area={data.area}
            circle={true}
          />
        </Link>
        <SpaceBetween>
          <h1 className="h3 bold mt-16 mb-4">{data.title}</h1>
          {/* 게시글 수정, 삭제 버튼 */}
          {isAuthor(data.member.memberId) && (
            // 수정삭제 버튼팝업
            <EditAndDeleteButton
              // 삭제함수
              deleteFunction={() => {
                if (window.confirm(confirmRemove("게시물을"))) {
                  axiosPrivate.delete(`/deal/${data.dealId}`).then((res) => {
                    console.log(res);
                    window.alert(completeDelete);
                    navigate("/product");
                  });
                }
              }}
              // 수정함수
              editFunction={() => {
                setProductEditData(data);
                navigate("/product/modify");
              }}
            />
          )}
        </SpaceBetween>
        <SpaceBetween>
          <span className="sub font-gray mb-8">
            {getDateAgo(data.createdAt)}
          </span>
          <ViewCounter like={data.likeNum} view={data.view} />
        </SpaceBetween>
        <p className="mt-16">{data.content}</p>
      </MainCenterWrapper>

      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <span className="h4 bold">{data.price.toLocaleString()}원</span>
        </SectionWrapper>
        <SigButton
          onClick={() => {
            axiosprivate
              .post(`/chat/experts/${data.member.memberId}`)
              .then((e) => {
                navigate(`/talk/${e.data.roomName}`);
                console.log();
              });
          }}
        >
          채팅하기
        </SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <LoadingSpinner />
  );
};

export default Product;
