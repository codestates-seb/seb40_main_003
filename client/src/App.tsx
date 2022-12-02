import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";

import { HeaderLayout, LogOutOnly } from "./Route";
import Product from "./Pages/Product/Product";
import Navbar from "./Components/Navbar";

import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";

import Setting from "./Pages/settingPage/SettingPage";
import CareBookmarks from "./Pages/settingPage/CareBookmarks";
import DealBookmarks from "./Pages/settingPage/DealBookmarks";
import SalesHistory from "./Pages/settingPage/SalesHistory";
import PurchaseHistory from "./Pages/settingPage/PurchaseHistory";
import CaringHistory from "./Pages/settingPage/CaringHistory";
import MyHistory from "./Pages/settingPage/MyHistory";
import EditAccount from "./Pages/settingPage/EditAccount";

import Missing from "./Pages/Missing";

import Care from "./Pages/Care/Care";
import CareDetail from "./Pages/Care/CareDetail";
import CareReviewEditor from "./Pages/Talk/CareReviewEditor";

import ProductDetail from "./Pages/Product/ProductDetail";
import ProductEditor from "./Pages/Product/ProductEditor";
import ProductReviewEditor from "./Pages/Talk/ProductReviewEditor";

import Community from "./Pages/Community/Community";
import CommunityDetail from "./Pages/Community/CommunityDetail";
import CommunityEditor from "./Pages/Community/CommunityEditor";
import CommunityModify from "./Pages/Community/CommunityModify";

import Talk from "./Pages/Talk/Talk";
import { DefaultLayout } from "./Route";
import { useEffect } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import { isExpert, userState } from "./Recoil/atoms/user";
import { getLS } from "./Hooks/useSecureLS";
import ProductModify from "./Pages/Product/ProductModify";
import Main from "./Pages/Main/Main";
import { cleanLS } from "./Hooks/useLogout";
import ExpertProfileTransfer from "./Pages/Profile/ExpertProfileTransfer";


const App = () => {
  const [user,setUser] = useRecoilState(userState);
  const setIsExpertNow = useSetRecoilState(isExpert);  
  useEffect(() => {
    const expertInfo = getLS("expertInfo");
    const accessToken = getLS("accessToken");
    const refreshToken = getLS("refreshToken");
    const userInfo = getLS("userInfo");

    //로컬스토리지에 유저정보가 있고, 액세스토큰, 리프레시토큰 모두 있을때 (토큰 유효성검사는 안함)
    if (accessToken && refreshToken && userInfo) {
      setUser(userInfo);
      expertInfo&&setIsExpertNow(true);
    } else {
      cleanLS();
      setUser(null);
      setIsExpertNow(false);
    }
  }, [setUser]);

  return (
    <BrowserRouter>
      {/* 모바일용 navbar*/}
      <Navbar />
      {/* <DevTools/> */}
      <Routes>
        {/* 보호된 라우팅 */}
        {/* <Route element={<AuthProvider />}> */}
        <Route path="/profile" element={<HeaderLayout />}>
          <Route path=":id" element={<Profile />} />
        </Route>
        {/* </Route> */}

        {/* 오픈된 라우팅 */}
        {/* 헤더가 있는 컴포넌트들 */}
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Main />} />
          </Route>
          {/* 케어 */}
          <Route path="/caring" element={<DefaultLayout />}>
            <Route index element={<Care />} />
            <Route path=":id" element={<CareDetail />} />
          </Route>
          {/* 장터 */}
          <Route path="/product" element={<DefaultLayout />}>
            <Route index element={<Product />} />
            <Route path=":id" element={<ProductDetail />} />
            <Route path="write" element={<ProductEditor />} />
            <Route path="modify" element={<ProductModify />} />
          </Route>
          {/* 커뮤니티 */}
          <Route path="/community" element={<DefaultLayout />}>
            <Route index element={<Community />} />
            <Route path=":id" element={<CommunityDetail />} />
            <Route path="modify" element={<CommunityModify />} />
            <Route path="write" element={<CommunityEditor />} />
            <Route path="transfer" element={<ExpertProfileTransfer />} />
          </Route>
          {/* 로그인 */}
          <Route path="/login" element={<Login />} />
          <Route element={<LogOutOnly />}>
            <Route path="/signup" element={<Signup />} />
          </Route>
          {/* 대화 */}
          <Route path="/talk" element={<DefaultLayout />}>
            <Route index element={<Talk />} />
            <Route path="product-write" element={<ProductReviewEditor />} />
            <Route path="care-write" element={<CareReviewEditor />} />
          </Route>
          {/* 세팅 */}
          <Route>
            <Route path="/setting" element={<DefaultLayout />}>
              <Route index element={<Setting />} />
              <Route path="bookmarks" element={<DefaultLayout />}>
                <Route path="care" element={<CareBookmarks />} />
                <Route path="deal" element={<DealBookmarks />} />
              </Route>
              <Route path="history" element={<DefaultLayout />}>
                <Route path="sales" element={<SalesHistory />} />
                <Route path="purchase" element={<PurchaseHistory />} />
                <Route path="experts" element={<CaringHistory />} />
                <Route path="my" element={<MyHistory />} />
              </Route>
              <Route path="edit" element={<EditAccount />} />
            </Route>
          </Route>
        </Route>
        {/* 잘못된 경로일때 보내는 곳*/}
        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
