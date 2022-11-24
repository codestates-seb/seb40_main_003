import secureLocalStorage from "react-secure-storage";
import { axiosPrivate } from "./api";

const useRefreshToken = () => {

  const refresh = async () => {
    console.log("refresh시도함")
    const response = await axiosPrivate.post(
      "/users/refresh",
      JSON.stringify({refreshToken:secureLocalStorage.getItem("refreshToken")})
    );
    secureLocalStorage.setItem("accessToken", response.data.accessToken)
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
