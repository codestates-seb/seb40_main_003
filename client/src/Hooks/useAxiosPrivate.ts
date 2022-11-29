import { useEffect } from "react";
import { axiosPrivate } from "./api";
import { getLS } from "./useSecureLS";
// 수정하기
import useRefreshToken from "./useRefreshToken";

// 
const useAxiosPrivate = () => {
    // 수정하기
    const refresh = useRefreshToken();
    const accessToken = getLS("accessToken")

    useEffect(() => {
        // 요청을 가로채는 인터셉터 (필요할때만 토큰을 싣기 위해)
        const requestIntercept = axiosPrivate.interceptors.request.use(
            config => {
                if (config.headers&&config.headers['Authorization']){
                    config.headers['Authorization'] = `Bearer ${accessToken}`;
                }
                return config;
            }, (error) => Promise.reject(error)
        );
        // 답변을 가로채는 인터셉터
        const responseIntercept = axiosPrivate.interceptors.response.use(
            response => response,
            async (error) => {
                const prevRequest = error?.config;
                if ((error?.response?.status === 403||error?.response?.status === 401) && !prevRequest?.sent){
                    console.log("403이라 가로챔")
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    console.log(`리프레시 토큰 성공함${newAccessToken}`);
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            // axios interceptor은 자동으로 이젝트 되지않으므로 다음 사용을 위해 eject함
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;