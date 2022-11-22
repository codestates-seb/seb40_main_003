import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";
import AuthProvider, { HeaderLayout } from "./Route";
import Product from "./Pages/Product/Product";
import Navbar from "./Components/Navbar";
import Profile from "./Pages/Profile/Profile";
import Login from "./Pages/User/Login";
import Signup from "./Pages/User/Signup";
import Setting from "./Pages/User/Setting";
import Missing from "./Pages/Missing";
import Care from "./Pages/Main/Care";
import CareDetail from "./Pages/Main/CareDetail";
import Community from "./Pages/Community/Community";
import CommunityDetail from "./Pages/Community/CommunityDetail";
import CommunityEditor from "./Pages/Community/CommunityEditor";
import ProductCategory from "./Pages/Product/ProductCategory";
import Talk from "./Pages/Talk/Talk";
import ProductReviewEditor from "./Pages/Talk/ProductReviewEditor";
import CareReviewEditor from "./Pages/Talk/CareReviewEditor";
import DevTools from "./Components/DevTools";
import ProductDetail from "./Pages/Product/ProductDetail";
import ProductEditor from "./Pages/Product/ProductEditor";
import axios from "axios";
import { DefaultLayout } from "./Route";
import CareCategory from "./Pages/Main/CareCategory";

axios.defaults.baseURL = "https://testserver.com";
// axios.defaults.baseURL = "";
// axios.defaults.baseURL = "https://fbc9-121-162-186-109.jp.ngrok.io";
axios.defaults.withCredentials = false;

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
            <Route path="/caring/category" element={<CareCategory/>} />
          </Route>
          <Route path="/product" element={<DefaultLayout />}>
            <Route index element={<Product />} />
            <Route path=":id" element={<ProductDetail />} />
            <Route path="/product/write" element={<ProductEditor />} />
            <Route path="/product/category" element={<ProductCategory/>} />
          </Route>
          <Route path="/community" element={<DefaultLayout />}>
            <Route index element={<Community />} />
            <Route path=":id" element={<CommunityDetail />} />
            <Route path="/community/write" element={<CommunityEditor />} />
          </Route>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/setting" element={<Setting />} />
          <Route>
            <Route path="/talk" element={<Talk />} />
            <Route path="/talk/product-write" element={<ProductReviewEditor />} />
            <Route path="/talk/care-write" element={<CareReviewEditor />} />
          </Route>
        </Route>
        {/* 수정 필요 */}
        {/* 잘못된 경로일때 보내는 곳*/}
        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
