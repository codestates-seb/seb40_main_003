import { LoadingSpinner } from "../../Components/Loading";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
} from "../../Components/Wrapper";
import useFetch from "../../Hooks/useFetch";

const EditAccout = () => {
  const data = useFetch("/");
  return data!==undefined?
  (
    <MainContentContainer>
      <MainCenterWrapper>계정수정</MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  ):<LoadingSpinner/>
};

export default EditAccout;
