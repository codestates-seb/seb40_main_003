import { useNavigate } from "react-router-dom";
import { useResetRecoilState } from "recoil";
import { confirmLogout } from "../Const/message";
import { userState } from "../Recoil/atoms/user";

/** 로그아웃을 하는 함수를 반환하는 훅입니다. (accessToken, refreshToken, recoil의 userInfo를 삭제합니다.) */
export const useLogout = () => {
	const resetUserState = useResetRecoilState(userState)
	const navigate = useNavigate();
	const logout = () => {	
		if (window.confirm(confirmLogout)) {
		/**로컬 스토리지 비우기 */
		localStorage.removeItem("accessToken")
		localStorage.removeItem("refreshToken")
		localStorage.removeItem("userInfo")
		/**아톰 초기화 */
		resetUserState()
		/**로그인 페이지로 이동 */
		navigate("/")
		}}
	return(logout)
	}