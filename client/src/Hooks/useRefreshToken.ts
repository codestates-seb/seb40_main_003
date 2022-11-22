import { useRecoilState } from "recoil";
import { userState } from "../Recoil/atoms/user";
import { axiosPrivate } from "./api";

const useRefreshToken = () => {

  const [auth, setAuth] = useRecoilState(userState);
  const refresh = async () => {
    const response = await axiosPrivate.post(
      // 수정필요
      "/users/refresh",
      JSON.stringify({ refreshToken: auth.refreshToken })
    );

    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log(response.data.access);
      return { ...prev, accessToken: response.data.access };
    });
    return response.data.access;
  };
  return refresh;
};

export default useRefreshToken;
