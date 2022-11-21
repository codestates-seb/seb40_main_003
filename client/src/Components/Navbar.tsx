import styled from "@emotion/styled";
// 이미지의 경우, 상단에 변수로 Import해서 사용할 시 자동으로 경로를 관리해줍니다
// 아래와같이 변수로 import시 이미지의 경로를 string 형태로 리턴해줍니다
import { Link, Outlet, useParams, NavLink } from "react-router-dom";
import { SubText } from "./GlobalComponents";
import { ReactComponent as Home } from "../images/homeIcon.svg";
import { ReactComponent as Community } from "../images/communityIcon.svg";
import { ReactComponent as Chat } from "../images/chatIcon.svg";
import { ReactComponent as Market } from "../images/marketIcon.svg";
import { ReactComponent as Login } from "../images/loginIcon.svg";
import ProfileIcon from "../images/emptyProfileIcon.svg";
import { useRecoilValue } from "recoil";
import { userState } from "../Recoil/atoms/user";

const NavContainer = styled.nav`
  width: 100%;
  height: 52px;
  border-top: 1px solid var(--line-gray);
  background-color: var(--pure-white);
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 24px;
  position: fixed;
  bottom: 0;
  @media screen and (min-width:1024px) {
    display: none;
}
`;
const NavElemWrapper = styled.ul`
  width: 100%;
  max-width: 360px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 8px;
`;

const ButtonWrapper = styled.div`
  width: 60px;
  display: flex;
  align-items: center;
  flex-direction: column;
`;
const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

type ProfileProps = {
  userImage: string;
};
const ProfilePhotoWrapper = styled.div`
  width: 22px;
  height: 22px;
  overflow: hidden;
  border-radius: 16px;
  background-image: url(${(props: ProfileProps) =>props.userImage ? props.userImage : ProfileIcon});
  background-size: cover;
`;
type NavElemProps = {
  title?: string;
  children?: JSX.Element;
  className?: any;
};
const NavElem = ({ title = "Untitled", children }: NavElemProps) => {
  return (
    <ButtonWrapper>
      <IconWrapper>{children}</IconWrapper>
      <SubText className={"text-align-center"}>{title}</SubText>
    </ButtonWrapper>
  );
};
export const NavContent = () => {
  const user = useRecoilValue(userState);
  return (<>
    <NavElemWrapper>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? "activeIcon" : "disableIcon")}
      >
        <NavElem title="홈">
          <Home />
        </NavElem>
      </NavLink>

      <NavLink
        to="/product"
        className={({ isActive }) => (isActive ? "activeIcon" : "disableIcon")}
      >
        <NavElem title="거래">
          <Market />
        </NavElem>
      </NavLink>
      <NavLink
        to="/bamboo"
        className={({ isActive }) => (isActive ? "activeIcon" : "disableIcon")}
      >
        <NavElem title="커뮤니티">
          <Community />
        </NavElem>
      </NavLink>
      <NavLink
        to="/talk"
        className={({ isActive }) => (isActive ? "activeIcon" : "disableIcon")}
      >
        <NavElem title="대화">
          <Chat />
        </NavElem>
      </NavLink>
      <NavLink
        to={user ? `/profile/${user.userId}` : "/login"}
        className={({ isActive }) => (isActive ? "activeIcon" : "disableIcon")}
      >
        <NavElem title={user ? "프로필" : "로그인"}>
          {user ? (
            <ProfilePhotoWrapper userImage={user.userImage} />
          ) : (
            <Login />
          )}
        </NavElem>
      </NavLink>
    </NavElemWrapper>
    </>
  );
};

const Navbar = () => {
  return (
    <>
      <NavContainer>
        <NavContent></NavContent>
      </NavContainer>
      <Outlet />
    </>
  );
};

export default Navbar;
