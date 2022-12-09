import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import { AuthProvider, HeaderLayout, LogOutOnly } from "./context/Route";

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
import ProductModify from "./Pages/Product/ProductModify";
import Main from "./Pages/Main/Main";

import ExpertProfileTransfer from "./Pages/Profile/ExpertProfileTransfer";
import { DefaultLayout } from "./context/Route";
import { TalkDetail } from "./Pages/Talk/TalkDetail";
import { GlobalModal } from "./Components/Modal";
import { useInitailSetup } from "./Hooks/initialSetup";

const App = () => {
  useInitailSetup()

  return (
    
    <BrowserRouter>
      {/* 모바일용 navbar*/}
      <GlobalModal />
      <Navbar />
      {/* <DevTools/> */}
      <Routes>
        {/* 보호된 라우팅 */}
        <Route element={<HeaderLayout />}>
          <Route element={<AuthProvider />}>
            {/* 대화 */}
            <Route path="/talk" element={<DefaultLayout />}>
              <Route index element={<Talk />} />
              <Route path=":id" element={<TalkDetail />} />
              <Route path="product-write" element={<ProductReviewEditor />} />
              <Route path="care-write" element={<CareReviewEditor />} />
            </Route>
            {/* 세팅 */}
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
            <Route path="/profile" element={<DefaultLayout />}>
              <Route path=":id" element={<Profile />} />
              <Route path="expert-form" element={<ExpertProfileTransfer />} />
            </Route>
          </Route>
          {/* ============================================================================= */}
          {/* 오픈된 라우팅 */}
          {/* 헤더가 있는 컴포넌트들 */}

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
            <Route element={<AuthProvider />}>
              <Route path="write" element={<ProductEditor />} />
              <Route path="modify" element={<ProductModify />} />
            </Route>
          </Route>
          {/* 커뮤니티 */}
          <Route path="/community" element={<DefaultLayout />}>
            <Route index element={<Community />} />
            <Route path=":id" element={<CommunityDetail />} />
            <Route element={<AuthProvider />}>
              <Route path="modify" element={<CommunityModify />} />
              <Route path="write" element={<CommunityEditor />} />
            </Route>
          </Route>
          {/* 로그인 */}
          <Route path="/login" element={<Login />} />
          <Route element={<LogOutOnly />}>
            <Route path="/signup" element={<Signup />} />
          </Route>
        </Route>
        {/* 잘못된 경로일때 보내는 곳*/}
        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
