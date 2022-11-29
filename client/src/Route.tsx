import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "./Recoil/atoms/user";
import Header from "./Components/Header";
import { getLS } from "./Hooks/useSecureLS";

export const LogOutOnly = () => {
  const auth = useRecoilValue(userState);
  return !auth ? <Outlet /> : <Navigate to="/" />;
};

export const AuthProvider = () => {

  const auth = ()=>{
    const access = getLS("accessToken")
    const userInfo = getLS("userInfo")
    const refresh = getLS("refreshToken")
    if (refresh&userInfo&access){
      return true
    }else return false
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