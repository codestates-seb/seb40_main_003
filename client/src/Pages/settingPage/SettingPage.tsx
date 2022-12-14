import styled from "@emotion/styled";
import { Link, useNavigate } from "react-router-dom";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import { cleanLS, useLogout } from "../../Hooks/useLogout";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { useSetRecoilState } from "recoil";
import { userState } from "../../Recoil/atoms/user";

const ContentWrapper = styled.div`
    margin-left: 18px;
`

const SettingPage = () => {
  usePageTitle("설정");
  const setUser = useSetRecoilState(userState)
  const logout = useLogout();
  const axiosPrivate = useAxiosPrivate();
	const navigate = useNavigate();
  const handleSubmit = async () => {
    if (window.prompt('탈퇴를 원하시면 "굿바이 플랜트하이커"라고 작성해주세요.') === "굿바이 플랜트하이커") {
        axiosPrivate.delete(`/users`)
        .then (()=>{
          cleanLS()
          setUser(null)
          navigate("/")
          })
        } else {
          window.alert("다시 입력해주세요.")
        }
      }

  // const data = useFetch("/");
  // return data !== undefined ? (
  return (
    <MainContentContainer>
      <MainCenterWrapper>
          <SectionWrapper title="북마크">
          </SectionWrapper>
          <ContentWrapper>
            <Link to={"/setting/bookmarks/care"}>
              <SectionWrapper>
                돌봄 전문가 찜 목록(2)
              </SectionWrapper>
            </Link>
            <Link to={"/setting/bookmarks/deal"}>
              <SectionWrapper>
                거래글 찜 목록(2)
              </SectionWrapper>
            </Link>
          </ContentWrapper>
          <SectionWrapper title="내역">
          </SectionWrapper>
        <ContentWrapper>
            <Link to={"/setting/history/sales"}>
              <SectionWrapper>
                판매 내역(3)
              </SectionWrapper>
            </Link>
            <Link to={"/setting/history/purchase"}>
              <SectionWrapper>
                구매 내역(3)
              </SectionWrapper>
            </Link>
            <Link to={"/setting/history/experts"}>
              <SectionWrapper>
                돌봄 기록(3)
              </SectionWrapper>
            </Link>
            <Link to={"/setting/history/my"}>
              <SectionWrapper>
                내 게시물(3)
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
      </MainCenterWrapper>
      <MainRightWrapper></MainRightWrapper>
    </MainContentContainer>
  );
  //  : (
  //   <LoadingSpinner />);
};

export default SettingPage;
