import { LoadingSpinner } from "../../Components/Loading";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
} from "../../Components/Wrapper";
import { axiosPrivate } from "../../Hooks/api";


const CareBookmarks = () => {
  const data = axiosPrivate("/");
  return data!==undefined?
  (
    <MainContentContainer>
      <MainCenterWrapper>북마크 컴포넌트</MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  ):<LoadingSpinner/>
};

export default CareBookmarks;
