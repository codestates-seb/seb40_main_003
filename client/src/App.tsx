import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";

import AuthProvider, { HeaderLayout } from "./Route";
import Product from "./Pages/Product/Product";
import Navbar from "./Components/Navbar";

import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";

import Setting from "./Pages/Setting/Setting";
import Bookmarks from "./Pages/Setting/Bookmarks";
import SalesHistory from "./Pages/Setting/SalesHistory";
import PurchaseHistory from "./Pages/Setting/PurchaseHistory";
import CaringHistory from "./Pages/Setting/CaringHistory";
import MyHistory from "./Pages/Setting/MyHistory";
import EditAccount from "./Pages/Setting/EditAccount";
import Logout from "./Pages/Setting/Logout";
import Resign from "./Pages/Setting/Resign";

import Missing from "./Pages/Missing";

import Care from "./Pages/Main/Care";
import CareDetail from "./Pages/Main/CareDetail";
import CareReviewEditor from "./Pages/Talk/CareReviewEditor";

import ProductDetail from "./Pages/Product/ProductDetail";
import ProductEditor from "./Pages/Product/ProductEditor";
import ProductReviewEditor from "./Pages/Talk/ProductReviewEditor";

import Community from "./Pages/Community/Community";
import CommunityDetail from "./Pages/Community/CommunityDetail";
import CommunityEditor from "./Pages/Community/CommunityEditor";

import Talk from "./Pages/Talk/Talk";

import DevTools from "./Components/DevTools";

import { DefaultLayout } from "./Route";



function App() {
  return (
    <BrowserRouter>
      <DevTools />
      {/* 모바일용 navbar*/}
        <Navbar />
      <Routes>
        {/* 보호된 라우팅 */}
        <Route element={<AuthProvider />}>
          <Route path="/profile" element={<HeaderLayout />}>
            <Route path=":id" element={<Profile />} />
          </Route>
        </Route>

        {/* 오픈된 라우팅 */}
        {/* 헤더가 있는 컴포넌트들 */}
        <Route element={<HeaderLayout />}>
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Care />} />
            <Route path="/caring/:id" element={<CareDetail />} />
          </Route>
          <Route path="/product" element={<DefaultLayout />}>
            <Route index element={<Product />} />
            <Route path=":id" element={<ProductDetail />} />
            <Route path="/product/write" element={<ProductEditor />} />
          </Route>
          <Route path="/community" element={<DefaultLayout />}>
            <Route index element={<Community />} />
            <Route path=":id" element={<CommunityDetail />} />
            <Route path="/community/write" element={<CommunityEditor />} />
          </Route>
          <Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
          </Route>
          <Route>
            <Route path="/setting" element={<Setting />} />
            <Route path="/setting/bookmarks" element={<Bookmarks />} />
            <Route path="/setting/sales-history" element={<SalesHistory />} />
            <Route path="/setting/purchase-history" element={<PurchaseHistory />} />
            <Route path="/setting/caring-history" element={<CaringHistory />} />
            <Route path="/setting/my-history" element={<MyHistory />} />
            <Route path="/setting/edit" element={<EditAccount />} />
            <Route path="/setting/logout" element={<Logout />} />
            <Route path="/setting/resign" element={<Resign />} />
            
          </Route>
            <Route path="/talk" element={<Talk />} />
            <Route path="/talk/product-write" element={<ProductReviewEditor />} />
            <Route path="/talk/care-write" element={<CareReviewEditor />} />
          </Route>
        
        {/* 수정 필요 */}
        {/* 잘못된 경로일때 보내는 곳*/}
        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
