import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
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
} from "../../Components/Wrapper";
import { userState } from "../../Recoil/atoms/user";
import { ProductDetailDataType, ProductDetailType } from "../../types/productTypes";
import { LoadingSpinner } from "../../Components/Loading";
import usePageTitle from "../../Hooks/usePageTitle";
import useFetch from "../../Hooks/useFetch";
import { getDateAgo } from "../../utils/controller";




const ProductDetail = () => {
  const { id } = useParams();
  const isLogin = useRecoilValue(userState);
  const data = useFetch<ProductDetailDataType>(id?`/deal/${id}`:"")

  console.log(data)
  return data !== undefined ? (
    // 메인 컨테이너 (반응형 제공!)
    <MainContentContainer>
      <MainCenterWrapper>
      {/* 실제 메인이 되는 내용! */}
        <TopCarousel>
          {data.images.map((e, i) => {
            return (
              <div key={i}>
                <img src={e} alt={`${data.title}의 ${i}번째사진`} />
              </div>
            );
          })}
        </TopCarousel>

        {/* <Link to={isLogin ? `/profile/${data.member.memberId}` : ""}>
          <ProfileCard
            src={data.member.image.imgUrl}
            alt={`${data.member.nickname}의 대표사진`}
            name={data.member.nickname}
            area={data.area}
            circle={true}
          />
        </Link> */}
        
        <h1 className="h4 bold mt-16">{data.title}</h1>
        <span className="sub font-gray mb-8">{getDateAgo(data.createdAt)}</span>
        <ViewCounter like={data.memberLikeNum} view={data.view} />
        <p className="mt-16">{data.content}</p>
      </MainCenterWrapper>

      <MainRightWrapper>
        <span className="h4 bold">{data.price.toLocaleString()}원</span>
        <Link to={"/talk"}>
          <SigButton>채팅하기</SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer>

  ) : (
    <LoadingSpinner/>
  );
};

export default ProductDetail;
