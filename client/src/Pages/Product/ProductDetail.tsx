import axios from "axios";
import { useEffect, useState } from "react";
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
import usePageTitle from "../../Hooks/usePageTitle";
import { userState } from "../../Recoil/atoms/user";
import { ProductDetailType } from "../../types/productTypes";


const ProductDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<ProductDetailType | null>(null);
  const { id } = useParams();
  const isLogin = useRecoilValue(userState);
  useEffect(() => {
    try {
      axios.get(`/shopping/${id}`).then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
    } catch (err) {
      console.log(err);
    }
  }, [id]);

  return !isLoading && data !== null ? (
    // 메인 컨테이너 (반응형 제공!)
    <MainContentContainer>
      {/* 실제 메인이 되는 내용! */}
      <MainCenterWrapper>
        {/* 캐로샐로 바꾸기 */}
        <TopCarousel>
          {data.image.map((e, i) => {
            return (
              <div key={i}>
                <img src={e.imgUrl} alt={`${data.title}의 ${i}번째사진`} />
              </div>
            );
          })}
        </TopCarousel>

        <Link to={isLogin ? `/profile/${data.member.memberId}` : ""}>
          <ProfileCard
            src={data.member.image.imgUrl}
            alt={`${data.member.nickname}의 대표사진`}
            name={data.member.nickname}
            location={data.areaTag[0].areaTagName}
            circle={true}
          />
        </Link>
        <h1 className="h4 bold mt-16">{data.title}</h1>
        <span className="sub font-gray mb-8">{data.createdAt}</span>
        <ViewCounter like={data.memberLikeDeal} view={data.view} />
        <p className="mt-16">{data.content}</p>
        {/* 반응형으로 바뀌면 하단에 버튼이 생기므로 가려짐, 따라서 길이를 늘려줌 */}
        {/* <BottomPlaceHolder /> */}
      </MainCenterWrapper>

      <MainRightWrapper>
        <span className="h4 bold">{data.price.toLocaleString()}원</span>
        <SigButton>채팅하기</SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <>loading...</>
  );
};

export default ProductDetail;
