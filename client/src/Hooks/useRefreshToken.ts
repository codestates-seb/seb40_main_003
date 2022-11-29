import  axios  from "./api";
import { getLS, setLS } from "./useSecureLS";

const useRefreshToken = () => {

  const refresh = async () => {
    const refreshToken = getLS("refreshToken")
    const response = await axios.post(
      "/users/refresh",
      JSON.stringify({"refreshToken":refreshToken})
    );
    setLS("accessToken", response.data.accessToken)
    console.log(`발급받은 토큰 저장쓰! ${response.data.accessToken +"암호화됨->"+ getLS("accessToken")}`);
    
    setLS("refreshToken", response.data.refreshToken)
    return response.data.accessToken;
  };
  return refresh;
};

export default useRefreshToken;
