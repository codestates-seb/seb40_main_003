import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isExpert, userState } from "../Recoil/atoms/user";
import { cleanLS } from "./useLogout";
import { getLS } from "./useSecureLS";

export const useInitailSetup = () => {
  const [user, setUser] = useRecoilState(userState);
  const setIsExpertNow = useSetRecoilState(isExpert);

  useEffect(() => {
    const expertInfo = getLS("expertInfo");
    const accessToken = getLS("accessToken");
    const refreshToken = getLS("refreshToken");
    const userInfo = getLS("userInfo");

    /**  로컬스토리지에 유저정보가 있고, 액세스토큰, 리프레시토큰 모두 있을때 (토큰 유효성검사는 안함)*/
    if (accessToken && refreshToken && userInfo) {
      setUser(userInfo);
      const socketURL = process.env.REACT_APP_WS_BASE_URL;
      const socket = new WebSocket(socketURL !== undefined ? socketURL : "");
      socket.onopen = () => {
        console.log("소켓연결 성공");
        socket.send(
          JSON.stringify({
            type: "JOIN_WEB_SOCKET",
            memberId: user?.memberId,
          })
        );
      };
      expertInfo && setIsExpertNow(true);
    } else {
      cleanLS();
      setUser(null);
      setIsExpertNow(false);
    }
  }, [setUser]);
};