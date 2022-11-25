import styled from "@emotion/styled";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import useWindowSize from "../Hooks/windowSize";
import { currentPage } from "../Recoil/atoms/currentPage";
import gobackIcon from "../images/gobackIcon.svg";
import { NavContent } from "./Navbar";
import { ReactComponent as Search } from "../images/searchIcon.svg";

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--line-light-gray);
  background-color: var(--pure-white);
  position: fixed;
  top: ${(props: { top?: number; mt?: number }) =>
    props.top ? props.top + "px" : 0};
  margin-top: ${(props: { top?: number; mt?: number }) =>
    props.mt ? props.mt + "px" : 0};
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
  @media screen and (max-width: 1024px) {
    max-width: 730px;
  }
`;

const BackButton = () => {
  const navigate = useNavigate();
  return (
    <button
      onClick={() => {
        navigate(-1);
      }}
    >
      <img src={gobackIcon} alt="뒤로가기버튼"></img>
    </button>
  );
};
const PlaceHolder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const Header = () => {
  const { title } = useRecoilValue(currentPage);
  const { width } = useWindowSize();
  const url = () => {
    let result = "";
    switch (title) {
      case "돌봄":
        result = "caring";
        break;
      case "거래":
        result = "product";
        break;
      case "커뮤니티":
        result = "community";
        break;
    }
    return result;
  };

  return (
    <HeaderWrapper className="bold h4">
      <HeaderContent>
        <PlaceHolder>
          <BackButton />
          <span className="display-none-pc h4 bold">{title}</span>
          <Link to={`/search/${url()}`}>
            <Search />
          </Link>
        </PlaceHolder>
        {width !== undefined && width > 1024 ? <NavContent /> : null}
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
