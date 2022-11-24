import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "./Recoil/atoms/user";
import Header from "./Components/Header";

export const LogOutOnly=()=>{
  const auth = useRecoilValue(userState);
  return !auth ? <Outlet /> : <Navigate to="/" />;
}

export const  AuthProvider=()=>{
  const auth = useRecoilValue(userState);
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

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
export const SearchLayout = () => {
  return (
    <>
      <Outlet />
    </>
  );
};

