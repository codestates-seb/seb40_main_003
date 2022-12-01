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
import { axiosPrivate } from "../../Hooks/api";

const Main = () => {
  return (
    <MainContentContainer>
      <MainCenterWrapper className="pd-0">
        <Carousel showStatus={false} autoPlay={true} infiniteLoop={true}>
          <BannerWrapper image={MainBanner1}/>
          <BannerWrapper image={MainBanner2}/>
          <BannerWrapper image={MainBanner3}/>
        </Carousel>
      </MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  );
};
const BannerWrapper = styled.div`
  background-image: ${(props:{image:string})=> `url(${props.image})`};
  width: 100%;
  height: 30vw;
  max-height:300px;
  min-height:200px;
  background-repeat:no-repeat;
  background-position: center;
  background-size:cover;
`
export default Main;
