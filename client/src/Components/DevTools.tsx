import styled from "@emotion/styled";
import axios from "axios";
import React from "react";
import { useRecoilState } from "recoil";
import { userState } from "../Recoil/atoms/user";
import { SigButton } from "./GlobalComponents";
import Pattern from "../images/pattern.png"


const DevBack = styled.section`
  background-image: url(${Pattern});
  background-size: 8%;
  width:100%;
  display:flex;
  align-items:center;
  justify-content:center;
  padding: 20px;
  opacity: 0;
  :hover{
    opacity: 1;
  }
`

type Props = {};

const DevTools = (props: Props) => {
  const [user, setUser] = useRecoilState(userState);
  const forceLogin = async (e: React.SyntheticEvent) => {
    if(!user){
    e.preventDefault();
    axios
      .post("https://testserver.com/login", { id: 123, password: 123 })
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      });
    }
  };
  const forceLogout = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    axios
      .post("https://testserver.com/logout", { id: 123, password: 123 })
      .then((res) => {
        console.log(res.status);
        setUser({
          memberId:null,
          image:null,
          nickname:null,
          accessToken:null,
          refreshToken:null
        });
      });
  };
  // const handleModal = async (e: React.SyntheticEvent) => {
  //   e.preventDefault();
  //   axios
  //   .post("")
  // }

  return (
    <DevBack>
      <SigButton onClick={forceLogin} className={user?"disable":""}>개발용 강제로그인</SigButton>
      <SigButton onClick={forceLogout} className={user?"":"disable"}>개발용 강제로그아웃</SigButton>
      {/* <SigButton onClick={handleModal} className={user?"":"disable"}>모달 열기</SigButton> */}
    </DevBack>
  );
};

export default DevTools;
