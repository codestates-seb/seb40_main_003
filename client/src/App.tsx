import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";

import AuthProvider, { HeaderLayout } from "./Route";
import Product from "./Pages/Product/Product";
import Navbar from "./Components/Navbar";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import Missing from "./Pages/Missing";
import Care from "./Pages/Main/Care";
import CareDetail from "./Pages/Main/CareDetail";
import Community from "./Pages/Community/Community";
import CommunityDetail from "./Pages/Community/CommunityDetail";
import CommunityEditor from "./Pages/Community/CommunityEditor";
import Talk from "./Pages/Talk/Talk";
import ProductReviewEditor from "./Pages/Talk/ProductReviewEditor";
import CareReviewEditor from "./Pages/Talk/CareReviewEditor";
import DevTools from "./Components/DevTools";
import ProductDetail from "./Pages/Product/ProductDetail";
import ProductEditor from "./Pages/Product/ProductEditor";
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
          {/* 케어 */}
          <Route path="/" element={<DefaultLayout />}>
            <Route index element={<Care />} />
            <Route path="/caring/:id" element={<CareDetail />} />
          </Route>
          {/* 장터 */}
          <Route path="/product" element={<DefaultLayout />}>
            <Route index element={<Product />} />
            <Route path=":id" element={<ProductDetail />} />
            <Route path="write" element={<ProductEditor />} />
          </Route>
          {/* 커뮤니티 */}
          <Route path="/community" element={<DefaultLayout />}>
            <Route index element={<Community />} />
            <Route path=":id" element={<CommunityDetail />} />
            <Route path="write" element={<CommunityEditor />} />
          </Route>
          {/* 로그인 */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          {/* 대화 */}
          <Route>
            <Route path="/talk" element={<DefaultLayout />}>
              <Route index element={<Talk />} />
              <Route path="product-write" element={<ProductReviewEditor />} />
              <Route path="care-write" element={<CareReviewEditor />} />
            </Route>
          </Route>
        </Route>

        {/* 잘못된 경로일때 보내는 곳*/}
        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
