import { useLocation, useNavigate } from "react-router-dom";

export const NaviateToFrom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  return navigate(from, { replace: true });
};
