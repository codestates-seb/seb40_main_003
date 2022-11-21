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
import Community from "./Pages/Bamboo/Bamboo";
import CommunityDetail from "./Pages/Bamboo/BambooDetail";
import CommunityEditor from "./Pages/Bamboo/BambooEditor";
import Talk from "./Pages/Talk/Talk";
import ReviewEditor from "./Pages/Talk/ReviewEditor";
import DevTools from "./Components/DevTools";
import ProductDetail from "./Pages/Product/ProductDetail";
import ProductEditor from "./Pages/Product/ProductEditor";
import axios from "axios";
import { DefaultLayout } from "./Route";

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
          <Route path="/talk" element={<Talk />} />
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
          <Route path="/bamboo" element={<DefaultLayout />}>
            <Route index element={<Community />} />
            <Route path=":id" element={<CommunityDetail />} />
            <Route path="/bamboo/write" element={<CommunityEditor />} />
          </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Route>
        {/* 수정 필요 */}
        <Route>
          <Route path="/talk" element={<Talk />} />
          <Route path="/talk/write" element={<ReviewEditor />} />
        </Route>

        {/* 잘못된 경로일때 보내는 곳*/}
        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
