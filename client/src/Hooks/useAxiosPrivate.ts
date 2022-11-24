import { useEffect } from "react";
import secureLocalStorage from "react-secure-storage";
import { axiosPrivate } from "./api";
// 수정하기
import useRefreshToken from "./useRefreshToken";

// 
const useAxiosPrivate = () => {
    // 수정하기
    const refresh = useRefreshToken();
    const accessToken = secureLocalStorage.getItem("accessToken")

    useEffect(() => {
        // 요청을 가로채는 인터셉터
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
                console.log("403이라 가로챔")
                const prevRequest = error?.config;
                if (error?.response?.status === 403 && !prevRequest?.sent){
                    prevRequest.sent = true;
                    const newAccessToken = await refresh();
                    prevRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                    return axiosPrivate(prevRequest);
                }
                return Promise.reject(error);
            }
        );

        return () => {
            axiosPrivate.interceptors.request.eject(requestIntercept);
            axiosPrivate.interceptors.response.eject(responseIntercept);
        }
    }, [accessToken, refresh])

    return axiosPrivate;
}

export default useAxiosPrivate;