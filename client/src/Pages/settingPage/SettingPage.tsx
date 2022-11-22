import { LoadingSpinner } from "../../Components/Loading";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
} from "../../Components/Wrapper";
import useFetch from "../../Hooks/useFetch";

const SettingPage = () => {
  const data = useFetch("/");
  return data!==undefined?
  (
    <MainContentContainer>
      <MainCenterWrapper>세팅페이지 컴포넌트</MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  ):<LoadingSpinner/>
};

export default SettingPage;
