import styled from "@emotion/styled";
import { NavLink, useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
import useWindowSize from "../Hooks/windowSize";
import { currentPage } from "../Recoil/atoms/currentPage";
import gobackIcon from "../images/gobackIcon.svg";
import { NavContent, NavElem } from "./Navbar";
import { ReactComponent as Chat } from "../images/chatIcon.svg";
import { RowWrapper } from "./Wrapper";
import { noReadNum } from "../Recoil/atoms/socket";
import { userState } from "../Recoil/atoms/user";

export const HeaderWrapper = styled.header`
  width: 100%;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--line-light-gray);
  background-color: var(--pure-white);
  position: sticky;
  top: ${(props: { top?: number; mt?: number }) =>
    props.top ? props.top + "px" : 0};
  margin-top: ${(props: { top?: number; mt?: number }) =>
    props.mt ? props.mt + "px" : 0};
  z-index: 9999;
`;
const HeaderContent = styled.div`
  width: 100%;
  max-width: 1330px;
  height: 52px;
  padding: 0 24px;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const ButtonWrapper = styled.button`
  width: 60px;
  display: flex;
  justify-content: center;
`;
const BackButton = () => {
  const navigate = useNavigate();
  return (
    <ButtonWrapper
      onClick={() => {
        navigate(-1);
      }}
    >
      <img src={gobackIcon} alt="뒤로가기버튼" />
    </ButtonWrapper>
  );
};
const PlaceHolder = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
const UnReadIcon = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--alert-red);
  margin-right: -22px;
`;

const Header = () => {
  const { title } = useRecoilValue(currentPage);
  const { width } = useWindowSize();
  const noReadMessage = useRecoilValue(noReadNum);
  const isLogin = useRecoilValue(userState);

  return (
    <HeaderWrapper className="bold h4">
      <HeaderContent>
        <PlaceHolder>
          {title !== "플랜트하이커" ? <BackButton /> : <NavElem title="" />}
          <span className="display-none-pc h4 bold">{title}</span>
          {isLogin ? (
            <NavLink
              to="/talk"
              className={({ isActive }) =>
                isActive ? "activeIcon" : "disableIcon"
              }
            >
              <RowWrapper>
                {noReadMessage !== undefined && noReadMessage !== 0 && (
                  <UnReadIcon />
                )}
                <NavElem
                  title={
                    noReadMessage !== undefined && noReadMessage !== 0
                      ? `${noReadMessage}건`
                      : "채팅"
                  }
                >
                  <Chat />
                </NavElem>
              </RowWrapper>
            </NavLink>
          ) : (
            <ButtonWrapper />
          )}
        </PlaceHolder>
        {width !== undefined && width > 1024 ? <NavContent /> : null}
      </HeaderContent>
    </HeaderWrapper>
  );
};

export default Header;
