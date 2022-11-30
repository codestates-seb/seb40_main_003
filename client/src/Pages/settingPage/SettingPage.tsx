import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import { useLogout } from "../../Hooks/useLogout";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { confirmSignout } from "../../Const/message";

const ContentContainer = styled.div`
    
`

const ContentWrapper = styled.div`
    margin-left: 18px;
`

const SettingPage = () => {
  usePageTitle("설정");
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
  const signout = prompt('탈퇴를 원하시면 "굿바이 플랜트하이커" 라고 입력해주세요.');
  const handleSubmit = async () => {
    if (window.confirm(confirmSignout)) {
      if (signout === "굿바이 플랜트하이커") {
        axiosPrivate.delete(`/users`)
        .then (()=>{
          navigate("/")
        })
      } 
    } 
}
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
            <Link to={"/setting/experts-history"}>
              <SectionWrapper>
                <>돌봄 기록(3)</>
              </SectionWrapper>
            </Link>
            <Link to={"/setting/my-history"}>
              <SectionWrapper>
                <>내 게시물(3)</>
              </SectionWrapper>
            </Link>
            </ContentWrapper>
            <SectionWrapper title="계정">    
            </SectionWrapper>
            <ContentWrapper>
              <SectionWrapper>
                <button onClick={logout}
                  >로그아웃(1)</button>
              </SectionWrapper>
              <SectionWrapper>
                <button onClick={()=>{handleSubmit()}}
                  >회원 탈퇴(1)</button>
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
