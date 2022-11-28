import { Outlet, Navigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { userState } from "./Recoil/atoms/user";
import Header from "./Components/Header";
import SearchBar from "./Components/SearchBar";
import { MainCenterWrapper, MainContentContainer } from "./Components/Wrapper";
import { ErrorMessage } from "./Components/ErrorHandle";
import { ErrorBoundary } from "react-error-boundary";
import { QueryClient, QueryClientProvider } from "react-query";

export const LogOutOnly = () => {
  const auth = useRecoilValue(userState);
  return !auth ? <Outlet /> : <Navigate to="/" />;
};

export const AuthProvider = () => {
  // 토큰 유효 api에서 체크를 한번 거치게하기
  const auth = useRecoilValue(userState);
  return auth ? <Outlet /> : <Navigate to="/login" />;
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
const searchQueryClient = new QueryClient();
export const SearchLayout = () => {
  return (
    <>
      <SearchBar />
      <MainContentContainer>
        <MainCenterWrapper>
          <ErrorBoundary
            fallback={
              <ErrorMessage content={"정보를 불러오는데 실패했습니다"} />
            }
          >
            <QueryClientProvider client={searchQueryClient}>
              <Outlet />
            </QueryClientProvider>
          </ErrorBoundary>
        </MainCenterWrapper>
      </MainContentContainer>
    </>
  );
};
