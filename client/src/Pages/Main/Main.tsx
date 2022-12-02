import styled from "@emotion/styled";
import { Carousel } from "react-responsive-carousel";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import MainBanner1 from "../../images/banner/mainBanner1.png";
import MainBanner2 from "../../images/banner/mainBanner2.png";
import MainBanner3 from "../../images/banner/mainBanner3.png";
import MainBanner4 from "../../images/banner/mainBanner4.png";
import usePageTitle from "../../Hooks/usePageTitle";
import { QueryClientProvider } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorMessage } from "../../Components/ErrorHandle";
import { CareMain, careQueryClient } from "../Care/Care";
import { ProductMain, productQueryClient } from "../Product/Product";
import { CommunityMain, communityQueryClient } from "../Community/Community";
import { cannotLoad } from "../../Const/message";
import { Link } from "react-router-dom";

const Main = () => {
  usePageTitle("홈");
  return (
    <MainContentContainer>
      <MainCenterWrapper className="pd-0">
        <article title="배너">
          <Carousel
            showStatus={false}
            autoPlay={true}
            infiniteLoop={true}
            showThumbs={false}
          >
            {/* 배너1 */}
            <BannerImgWrapper image={MainBanner1}>
              <BannerText
                sub="먹이고~ 볕쬐고~ 애지중지 키운"
                main="반려식물 자랑하기!"
                type="left"
              />
            </BannerImgWrapper>
            {/* 배너2 */}
            <BannerImgWrapper image={MainBanner2}>
              <BannerText
                sub="식물은 내가 살릴게, 의뢰는 누가 할래?"
                main="전문가에게 맡겨봐!"
                type="right"
              />
            </BannerImgWrapper>
            {/* 배너3 */}
            <BannerImgWrapper image={MainBanner3}>
              <BannerText
                sub="플랜트하이커가 처음이신가요?"
                main="첫 돌봄 비용 20% 지원!"
                type="left"
              />
            </BannerImgWrapper>
            {/* 배너4 */}
            <BannerImgWrapper image={MainBanner4}>
              <BannerText
                sub="무한 증식하는 우리집 다육이, 선인장"
                main="이웃에게 분양해요!"
                type="right"
              />
            </BannerImgWrapper>
          </Carousel>
        </article>
        {/* 거래 */}
        <article className="pd-24" title="거래하기">
          <Link to={"/product"} className="text-align-start">
            <SectionWrapper title="거래하기" width={100} borderNone={false} />
          </Link>
          <ErrorBoundary fallback={<ErrorMessage content={cannotLoad} />}>
            <QueryClientProvider client={productQueryClient}>
              <ProductMain size={3} />
            </QueryClientProvider>
          </ErrorBoundary>
          {/* 돌봄 */}
          <Link to={"/caring"} className="text-align-start">
            <SectionWrapper
              title="돌봄 요청하기"
              width={100}
              borderNone={false}
            />
          </Link>
          <ErrorBoundary fallback={<ErrorMessage content={cannotLoad} />}>
            <QueryClientProvider client={careQueryClient}>
              <CareMain size={3} />
            </QueryClientProvider>
          </ErrorBoundary>
          {/* 커뮤니티 */}
          <Link to={"/community"} className="text-align-start">
            <SectionWrapper title="커뮤니티" width={100} borderNone={false} />
          </Link>
          <ErrorBoundary fallback={<ErrorMessage content={cannotLoad} />}>
            <QueryClientProvider client={communityQueryClient}>
              <CommunityMain size={3} />
            </QueryClientProvider>
          </ErrorBoundary>
        </article>
      </MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  );
};

const BannerImgWrapper = styled.div`
  background-image: ${(props: { image: string }) => `url(${props.image})`};
  width: 100%;
  height: 30vw;
  max-height: 300px;
  min-height: 200px;
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
`;

const BannerText = ({
  main,
  sub,
  type = "left",
}: {
  main?: string;
  sub?: string;
  type?: "right" | "left";
}) => {
  return (
    <CenterWrapper type={type}>
      <div className={type === "left" ? "text-align-start" : "text-align-end"}>
        <p className=" h4">{sub}</p>
        <h2 className="h1 bold">{main}</h2>
      </div>
    </CenterWrapper>
  );
};
const CenterWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  top: calc(50% - 40px);
  right: ${(props: { type: string }) =>
    props.type === "left" ? "10%" : "-10%"};
`;
export default Main;
