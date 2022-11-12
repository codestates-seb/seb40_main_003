import styled from "@emotion/styled";
// 이미지의 경우, 상단에 변수로 Import해서 사용할 시 자동으로 경로를 관리해줍니다
// 아래와같이 변수로 import시 이미지의 경로를 string 형태로 리턴해줍니다
import { Link,Outlet } from "react-router-dom";

const NavContainer = styled.nav`
  width: 100%;
  max-width: 360px;
  height: 52px;
  border-top: 1px solid var(--line-gray);
  display: flex;
  align-items: center;
  padding: 0 24px;
  position: fixed;
  bottom: 0;
`;
const NavElemWrapper = styled.ul`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  padding: 0 8px;
`;
const NavElem = styled.li`
  cursor: pointer;
  width: 36px;
  height: 36px;
  border-radius: 18px;
  background-color: #999;
`;


const Logo = styled.h1`
  background-image: url();
`;

const SearchInput = styled.input`
  box-sizing: border-box;
  width: 100%;
  border-radius: 3px;
  border: 1px solid gray;
  padding: 8px;
  padding-right: 400px;
`;

type Props = {};

const Navbar = (props: Props) => {
  return (
    <>
    <NavContainer>
      <NavElemWrapper>
        <Link to="/">
          <NavElem />
        </Link>
        <Link to="/product">
          <NavElem />
        </Link>
        <Link to="/board">
          <NavElem />
        </Link>
        <Link to="/talk">
          <NavElem />
        </Link>
        <Link to="/profile">
          <NavElem />
        </Link>
      </NavElemWrapper>
    </NavContainer>
    <Outlet/>
    </>
  );
};

export default Navbar;
