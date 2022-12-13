import { useResetRecoilState } from "recoil";
import { userState } from "../Recoil/atoms/user";
import axios from "./api";
import { getLS, setLS } from "./useSecureLS";

const useRefreshToken = () => {
  // 유저정보 아톰 리셋
  const resetUserState = useResetRecoilState(userState);
  /**ㅇ */
  const refresh = async () => {
    const refreshToken = getLS("refreshToken");
    const response = await axios
      .post("/users/refresh", { refreshToken: refreshToken })
      .then((res) => {
        setLS("accessToken", res.data.accessToken);
        setLS("refreshToken", res.data.refreshToken);
        return res.data;
      })
      .catch((err) => {
        /**로컬 스토리지 비우기 */
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");
        localStorage.removeItem("userInfo");
        /**아톰 초기화 */
        resetUserState();
        alert("로그인 후 이용가능합니다")
      });
    return response.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
