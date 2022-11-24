import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "./Recoil/atoms/user";
import Header from "./Components/Header";
import useAxiosPrivate from "./Hooks/useAxiosPrivate";


function AuthProvider() {
  const auth = useRecoilValue(userState);
  const axiosPrivate=useAxiosPrivate()
  return auth ? <Outlet /> : <Navigate to="/" />;
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

export default AuthProvider;
