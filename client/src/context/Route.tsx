import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState } from "recoil";
import { userState } from "../Recoil/atoms/user";
import Header from "../Components/Header";
import { getLS } from "../Hooks/useSecureLS";
import { cleanLS } from "../Hooks/useLogout";
import { useSetModal } from "../Hooks/useSetModal";

export const LogOutOnly = () => {
  const auth = useRecoilValue(userState);
  return !auth ? <Outlet /> : <Navigate to="/" />;
};

export const AuthProvider = () => {
  const resetUserState = useResetRecoilState(userState);
  const hasUserInfo = useRecoilValue(userState);
  const auth = () => {
    const access = getLS("accessToken");
    const userInfo = hasUserInfo || getLS("userInfo");
    const refresh = getLS("refreshToken");
    if (refresh && userInfo && access) {
      return true;
    } else {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useSetModal("로그인 후 이용가능합니다")
      cleanLS();
      resetUserState();
      return false;
    }
  };
  return auth() ? <Outlet /> : <Navigate to="/login" />;
};

export const HeaderLayout = () => {
  return (
    <>
      <Header />
      <Outlet />
    </>
  );
};

export const DefaultLayout = () => {
  return <Outlet />;
};
