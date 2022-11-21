import styled from "@emotion/styled";
import { Children } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useWindowSize from "../Hooks/windowSize";
import { currentPage } from "../Recoil/atoms/currentPage";
import Navbar, { NavContent } from "./Navbar";

const HeaderWrapper = styled.header`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--line-light-gray);
  background-color: var(--pure-white);
  position: fixed;
  top: 0;
  z-index: 9999;
`;
const HeaderContent = styled.div`
  width: 100%;
  max-width: 1000px;
  height: 52px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const BackButton = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  const NavigateBack = () => {
    navigate(from, { replace: true });
  };

  return <button onClick={NavigateBack}>뒤로가기</button>;
};

const Header = () => {
  const { title } = useRecoilValue(currentPage);
  const{width}=useWindowSize()
  return (
    <HeaderWrapper className="bold h4">
      <HeaderContent>
        <BackButton />
        <span className="display-none-pc h4 bold">{title}</span>
        <BackButton />
        {width!==undefined&&width>1024?<NavContent/>:null}
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
