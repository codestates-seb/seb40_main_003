import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";

import AuthProvider from "./Route";
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
import Talk from "./Pages/Talk";
import DevTools from "./Components/DevTools";
import ProductDetail from "./Pages/Product/ProductDetail";
import axios from "axios";
import { DefaultLayout } from "./Route";
// type Props = {
//   id: number;
//   vote: number;
//   title: string;
//   content: string;
//   createdAt: string;
//   view: number;
//   like: number;
//   nickname: string;
// };
axios.defaults.baseURL = "https://testserver.com";
// axios.defaults.baseURL = "";
// axios.defaults.baseURL = "https://fbc9-121-162-186-109.jp.ngrok.io";
axios.defaults.withCredentials = false;

function App() {
  return (
    <BrowserRouter>
      {/* Navbar는 리랜더링 되지않고, URL에 따라 하위 컴포넌트만 리랜더링 되게하기 위한 구조입니다 */}
      <DevTools />
      <Navbar />
      {/* 양옆 Padding을 제공하는 Wrapper 입니다 */}
      <Routes>
        {/* 보호된 라우팅 */}
        <Route element={<AuthProvider />}>
          <Route path="/talk" element={<Talk />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        {/* 오픈된 라우팅 */}
        <Route path="/" element={<Care />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        <Route path="/careing" element={<DefaultLayout />}>
          <Route index element={<Care />} />
          <Route path=":id" element={<CareDetail />} />
        </Route>

        <Route path="/product" element={<DefaultLayout />}>
          <Route index element={<Product />} />
          <Route path=":id" element={<ProductDetail />} />
        </Route>

        <Route path="/bamboo" element={<DefaultLayout />}>
          <Route index element={<Community />} />
          <Route path=":id" element={<CommunityDetail />} />
        </Route>

        {/* 잘못된 경로일때 보내는 곳*/}
        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
