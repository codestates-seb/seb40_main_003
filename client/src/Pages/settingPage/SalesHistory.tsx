import { LoadingSpinner } from "../../Components/Loading";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
} from "../../Components/Wrapper";
import useFetch from "../../Hooks/useFetch";

const SalesHistory = () => {
  const data = useFetch("/");
  return data!==undefined?
  (
    <MainContentContainer>
      <MainCenterWrapper>판매기록</MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  ):<LoadingSpinner/>
};

export default SalesHistory;
