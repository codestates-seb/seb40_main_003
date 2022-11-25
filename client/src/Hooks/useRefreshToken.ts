import secureLocalStorage from "react-secure-storage";
import  axios  from "./api";

const useRefreshToken = () => {

  const refresh = async () => {
    const refreshToken = secureLocalStorage.getItem("refreshToken")
    const response = await axios.post(
      "/users/refresh",
      JSON.stringify({"refreshToken":refreshToken})
    );
    secureLocalStorage.setItem("accessToken", response.data.accessToken)
    console.log(`발급받은 토큰 저장쓰! ${response.data.accessToken +"암호화됨->"+ secureLocalStorage.getItem("accessToken")}`);
    
    secureLocalStorage.setItem("refreshToken", response.data.refreshToken)
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
