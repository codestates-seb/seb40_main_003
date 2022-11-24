import secureLocalStorage from "react-secure-storage";
import { axiosPrivate } from "./api";

const useRefreshToken = () => {

  const refresh = async () => {
    const refreshToken = secureLocalStorage.getItem("refreshToken")
    const response = await axiosPrivate.post(
      "/users/refresh",
      JSON.stringify({"refreshToken":refreshToken})
    );
    secureLocalStorage.setItem("accessToken", await response.data.accessToken)
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
