import { LoadingSpinner } from "../../Components/Loading";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
} from "../../Components/Wrapper";
import useFetch from "../../Hooks/useFetch";

const MyHistory = () => {
  const data = useFetch("/");
  return data!==undefined?
  (
    <MainContentContainer>
      <MainCenterWrapper>내 기록 컴포넌트</MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  ):<LoadingSpinner/>
};

export default MyHistory;
