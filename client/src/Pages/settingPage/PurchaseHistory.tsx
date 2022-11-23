import { LoadingSpinner } from "../../Components/Loading";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
} from "../../Components/Wrapper";
import useFetch from "../../Hooks/useFetch";

const PurchaseHistory = () => {
  const data = useFetch("/");
  
  return data!==undefined?
  (
    <MainContentContainer>
      <MainCenterWrapper>거래 기록 컴포넌트</MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  ):<LoadingSpinner/>
};

export default PurchaseHistory;
