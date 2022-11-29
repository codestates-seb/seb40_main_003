import styled from "@emotion/styled";
import { Link } from "react-router-dom";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import { useLogout } from "../../Hooks/useLogout";

const ContentContainer = styled.div`
    
`

const ContentWrapper = styled.div`
    margin-left: 18px;
`

const SettingPage = () => {
  usePageTitle("설정");
  const logout = useLogout();
  // const data = useFetch("/");
  // return data !== undefined ? (
  return (
    <MainContentContainer>
      <MainCenterWrapper>
        <ContentContainer>
          <SectionWrapper title="북마크">
            <></>
          </SectionWrapper>
          <ContentWrapper>
            <Link to={"/setting/carebookmarks"}>
              <SectionWrapper>
                <>돌봄 전문가 찜 목록(2)</>
              </SectionWrapper>
            </Link>
            <Link to={"/setting/dealbookmarks"}>
              <SectionWrapper>
                <>거래글 찜 목록(2)</>
              </SectionWrapper>
            </Link>
          </ContentWrapper>
          <SectionWrapper title="내역">
            <></>
          </SectionWrapper>
        <ContentWrapper>
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
            <SectionWrapper>
                <button onClick={logout}
                  >로그아웃</button>
            </SectionWrapper>
          </ContentWrapper>
        </ContentContainer>
      </MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  );
  //  : (
  //   <LoadingSpinner />);
};

export default SettingPage;
