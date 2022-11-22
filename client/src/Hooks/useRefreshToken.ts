import { useRecoilState } from "recoil";
import { userState, UserStateType } from "../Recoil/atoms/user";
import { axiosPrivate } from "./api";

const useRefreshToken = () => {
  const [auth, setAuth] = useRecoilState(userState);
  const refresh = async () => {
    const response = await axiosPrivate.post(
      // 수정필요
      "/users/refresh",
      JSON.stringify({ refreshToken: auth?.refreshToken })
    );

    setAuth((prev) => {
      // console.log(JSON.stringify(prev));
      // console.log(response.data.access);
      return prev !== null
        ? { ...prev, accessToken: response.data.access }
        : null;
    });

    return response.data.access;
  };
  return refresh;
};

export default useRefreshToken;
