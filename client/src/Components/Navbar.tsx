import styled from "@emotion/styled";
// 이미지의 경우, 상단에 변수로 Import해서 사용할 시 자동으로 경로를 관리해줍니다
// 아래와같이 변수로 import시 이미지의 경로를 string 형태로 리턴해줍니다
import { Link, Outlet, useParams } from "react-router-dom";
import { SubText } from "./GlobalComponents";
import { ReactComponent as Home } from "../images/homeIcon.svg";
import { ReactComponent as Community } from "../images/communityIcon.svg";
import { ReactComponent as Chat } from "../images/chatIcon.svg";
import { ReactComponent as Market } from "../images/marketIcon.svg";
import ProfileIcon from "../images/emptyProfileIcon.svg";

const NavContainer = styled.nav`
  width: 100%;
  height: 52px;
  border-top: 1px solid var(--line-gray);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  position: fixed;
  bottom: 0;
`;
const NavElemWrapper = styled.ul`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 8px;
`;

const IconWrapper = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;

type ProfileProps = {
  url?: string;
};
const ProfilePhotoWrapper = styled.div`
  width: 22px;
  height: 22px;
  overflow: hidden;
  border-radius: 16px;
  background-image: url(${(props: ProfileProps) =>
    props.url ? props.url : ProfileIcon});
  background-size: cover;
`;
type NavElemProps = {
  title?: string;
  children?: JSX.Element;
  className?:any
};
const NavElem = ({ title = "Untitled", children }: NavElemProps) => {
  return (
    <IconWrapper>
      {children}
      <SubText className={"text-align-center"}>{title}</SubText>
    </IconWrapper>
  );
};

interface Auth {
  img?: "string";
}
const Navbar = ({ img }: Auth) => {
  return (
    <>
      <NavContainer>
        <NavElemWrapper>
          <Link to="/">
            <NavElem title="홈">
              <Home />
            </NavElem>
          </Link>
          <Link to="/product">
            <NavElem title="장터" className="123">
              <Market />
            </NavElem>
          </Link>
          <Link to="/board">
            <NavElem title="커뮤니티">
              <Community />
            </NavElem>
          </Link>
          <Link to="/talk">
            <NavElem title="대화">
              <Chat />
            </NavElem>
          </Link>
          <Link to="/profile">
            <NavElem title="프로필" >
              <ProfilePhotoWrapper url="https://search.pstatic.net/common/?src=http%3A%2F%2Fimage.nmv.naver.net%2Fcafe_2022_02_25_1067%2Ff3f966cc-95ff-11ec-b69c-a0369ff94ed0_01.jpg&type=sc960_832"/>
            </NavElem>
          </Link>
        </NavElemWrapper>
      </NavContainer>
      <Outlet />
    </>
  );
};

export default Navbar;