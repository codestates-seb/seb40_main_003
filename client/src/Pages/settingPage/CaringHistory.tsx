import { LoadingSpinner } from "../../Components/Loading";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
} from "../../Components/Wrapper";
import useFetch from "../../Hooks/useFetch";

const CaringHistory = () => {
  const data = useFetch("/");
  return data!==undefined?
  (
    <MainContentContainer>
      <MainCenterWrapper>돌봄 기록 컴포넌트</MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  ):<LoadingSpinner/>
};

export default CaringHistory;
