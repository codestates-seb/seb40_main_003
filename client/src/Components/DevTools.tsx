import styled from "@emotion/styled";
import axios, { axiosPrivate } from "../Hooks/api";
import React from "react";
import { useRecoilState } from "recoil";
import { userState } from "../Recoil/atoms/user";
import { SigButton } from "./GlobalComponents";
import Pattern from "../images/pattern.png";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import secureLocalStorage from "react-secure-storage";

const DevBack = styled.section`
  background-image: url(${Pattern});
  background-size: 8%;
  width: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
  opacity: 0.3;
  position: absolute;
  bottom: 70px;
  z-index: 10000;
  :hover {
    opacity: 1;
  }
`;

type Props = {};

const DevTools = (props: Props) => {
  const [user, setUser] = useRecoilState(userState);
  const axiosPrivate = useAxiosPrivate();

  const forceLogin = async (e: React.SyntheticEvent) => {
    if (!user) {
      e.preventDefault();
      axios.post("/login", { id: 123, password: 123 }).then((res) => {
        const userInfo = {
          memberId: res.data.memberId,
          nickname: res.data.nickname,
          image: res.data.image,
        };
        setUser(userInfo);
        secureLocalStorage.setItem("accessToken", res.data.accessToken);
        secureLocalStorage.setItem("refreshToken", res.data.refreshToken);
        console.log(secureLocalStorage.getItem("accessToken"))
      });
    }
  };
  const forceLogout = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosPrivate.post("logout", { id: 123, password: 123 }).then((res) => {
      console.log(res.status);
      setUser(null);
    });
  };
  const failLogin = async (e: React.SyntheticEvent) => {
    e.preventDefault();
    axiosPrivate
      .post("/axiospravateTest")
      .then((res) => {})
      .catch((err) => {
        console.log(`새로 발급받은 토큰 ${secureLocalStorage.getItem("accessToken")}`);
      });
  };

  return (
    <DevBack>
      <SigButton onClick={forceLogin} className={user ? "disable" : ""}>
        개발용 강제로그인
      </SigButton>
      <SigButton onClick={forceLogout} className={user ? "" : "disable"}>
        개발용 강제로그아웃
      </SigButton>
      <SigButton onClick={failLogin} className={user ? "" : "disable"}>
        개발용 로그인실패
      </SigButton>
      {/* <SigButton onClick={handleModal} className={user?"":"disable"}>모달 열기</SigButton> */}
    </DevBack>
  );
};

export default DevTools;
