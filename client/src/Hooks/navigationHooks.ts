import { useLocation, useNavigate } from "react-router-dom";

/** 이전에 있던 페이지로 되돌려보내는 hook */
export const useNaviateToFrom = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";
  return navigate(from, { replace: true });
};
