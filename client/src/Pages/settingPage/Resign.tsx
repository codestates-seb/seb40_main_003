import { LoadingSpinner } from "../../Components/Loading";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
} from "../../Components/Wrapper";
import { axiosPrivate } from "../../Hooks/api";

const Resign = () => {
  const data = axiosPrivate("/");
  return data!==undefined?
  (
    <MainContentContainer>
      <MainCenterWrapper>회원탈퇴</MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  ):<LoadingSpinner/>
};

export default Resign;
