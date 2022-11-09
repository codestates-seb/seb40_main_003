import styled from "@emotion/styled";
// 이미지의 경우, 상단에 변수로 Import해서 사용할 시 자동으로 경로를 관리해줍니다
// 아래와같이 변수로 import시 이미지의 경로를 string 형태로 리턴해줍니다
import { Link } from "react-router-dom";

const NavContainer = styled.header`
  width: 100%;
  height: 48px;
  background-color: #f8f9f9;
  border-top: 2px solid orange;
  display: flex;
  align-items: center;
  padding: 0 112px;
  box-shadow: 0 1px 2px hsla(0, 0%, 0%, 0.05), 0 1px 4px hsla(0, 0%, 0%, 0.05),
    0 2px 8px hsla(0, 0%, 0%, 0.05);
  /* position: fixed; */
`;
const NavMenu = styled.nav`
  display: flex;
  flex-direction: row;
`;
const NavElemWrapper = styled.ul`
  display: flex;
  flex-direction: row;
  width: 220px;
  justify-content: space-between;
  padding:0 8px;
`;
const NavElem = styled.li`

  padding: 8px;
  cursor: pointer;
  border-radius: 18px;
  &:hover{
      background-color:#999;
  }
`

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
    <NavContainer>
    </NavContainer>
  );
};

export default Navbar;
