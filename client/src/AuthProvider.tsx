import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "../src/Recoil/atoms/atom";

function AuthProvider() {
  const auth = useRecoilValue(userState);
  return auth ? <Outlet /> : <Navigate to="/login" />;
}

export default AuthProvider;
