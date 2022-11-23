import { Link } from "react-router-dom";
import { LoadingSpinner } from "../../Components/Loading";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import useFetch from "../../Hooks/useFetch";

const SettingPage = () => {
  // const data = useFetch("/");
  // return data !== undefined ? (
    return(
    <MainContentContainer>
      <MainCenterWrapper>
        <Link to={"/setting/sales-history"}>
          <SectionWrapper>
            <>판매 내역(3)</>
          </SectionWrapper>
        </Link>
        <Link to={"/setting/purchase-history"}>
          <SectionWrapper>
            <>구매 내역(3)</>
          </SectionWrapper>
        </Link>
        <Link to={"/setting/caring-history"}>
          <SectionWrapper>
            <>돌봄 기록(3)</>
          </SectionWrapper>
        </Link>
        <Link to={"/setting/my-history"}>
          <SectionWrapper>
            <>내 게시물(3)</>
          </SectionWrapper>
        </Link>
      </MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  )
  //  : (
  //   <LoadingSpinner />);
};

export default SettingPage;
