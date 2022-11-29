import styled from "@emotion/styled";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { SigButton } from "../Components/GlobalComponents";
import { ColumnWrapper, MainCenterWrapper } from "../Components/Wrapper";
import { noExistPage } from "../Const/message";
import logo from "../images/logoMain.svg";
const Missing = () => {
  const [timer, setTimer] = useState(5);
  const navigate = useNavigate();
  useEffect(() => {
  const timeReducer = setInterval(() => {
    if(timer>0){
      setTimer(timer - 1);
    }
    if(timer===0){
      clearInterval(timeReducer)
      navigate("/")
    }
  }, 1000);
  return()=>clearInterval(timeReducer);
  }, [timer]);
  return (
    <BackGround>
      <MainCenterWrapper>
        <ColumnWrapper as={"main"} center={true}>
          <PaddingWrapper>
            <Link to={"/"}>
              <img src={logo} alt="로고" />
            </Link>
            <h1 className="h3 medium">{noExistPage}</h1>
            <p className="mt-8">{timer}초 후 메인페이지로 이동합니다</p>
            <Link to={"/"}>
              <SigButton className="mt-16 ghost_hover">홈으로 이동</SigButton>
            </Link>
          </PaddingWrapper>
        </ColumnWrapper>
      </MainCenterWrapper>
    </BackGround>
  );
};

const BackGround = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--bg-gray);
  display: flex;
  align-items: center;
  justify-content: center;
`;
const PaddingWrapper = styled.div`
  padding: 36px;
  text-align: center;
`;
export default Missing;
