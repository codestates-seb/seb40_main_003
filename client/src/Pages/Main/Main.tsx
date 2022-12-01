import styled from "@emotion/styled";
import { Carousel } from "react-responsive-carousel";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
} from "../../Components/Wrapper";
import MainBanner1 from '../../images/banner/mainBanner1.png'
import MainBanner2 from '../../images/banner/mainBanner2.png'
import MainBanner3 from '../../images/banner/mainBanner3.png'
import MainBanner4 from '../../images/banner/mainBanner4.png'

import { axiosPrivate } from "../../Hooks/api";

const Main = () => {
  return (
    <MainContentContainer>
      <MainCenterWrapper className="pd-0">
        <Carousel showStatus={false} autoPlay={true} infiniteLoop={true} showThumbs={false}>
          <BannerWrapper>
            <BannerImgWrapper image={MainBanner1}>
              <BannerTextLeft>
                <p className="h4">먹이고~ 볕쬐고~ 애지중지 키운</p>
                <p className="h1">반려식물 자랑하기!</p>
              </BannerTextLeft>
            </BannerImgWrapper>
          </BannerWrapper>
          <BannerImgWrapper image={MainBanner2}></BannerImgWrapper>
          <BannerImgWrapper image={MainBanner3}></BannerImgWrapper>
          <BannerImgWrapper image={MainBanner4}></BannerImgWrapper>

        </Carousel>
      </MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  );
};

const BannerWrapper = styled.div`
  width: 100%;
  margin: 10px auto;
  position: relative;
`
const BannerImgWrapper = styled.div`
  background-image: ${(props:{image:string})=> `url(${props.image})`};
  width: 100%;
  height: 30vw;
  max-height:300px;
  min-height:200px;
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
`
const BannerTextLeft = styled.div`
  background-color: aqua;
  position: absolute;
  top: 40%;
  left: 40%;
  width: 50%;
  transform: translate(-50%, -50%);
  font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
`
const BannerTextRight = styled.div`
  background-color: aqua;
  position: absolute;
  top: 40%;
  left: 50%;
  width: 50%;
  transform: translate(-50%, -50%);
  font-family: 'GmarketSansMedium';
    src: url('https://cdn.jsdelivr.net/gh/projectnoonnu/noonfonts_2001@1.1/GmarketSansMedium.woff') format('woff');
`

export default Main;
