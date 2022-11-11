import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";

import AuthProvider from "./AuthProvider";
import Product from "./Pages/Product";
import Navbar from "./Components/Navbar";
import Profile from "./Pages/Profile";
import Login from "./Pages/Login";
import Signup from "./Pages/Signup";
import Missing from "./Pages/Missing";
import Care from "./Pages/Care";
import Community from "./Pages/Bamboo";
import Talk from "./Pages/Talk";
import DevTools from "./Components/DevTools";
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
          <Route path="/profile" element={<Profile />} />
          <Route path="/profile/:id" element={<Profile />} />
        </Route>
        {/* 오픈된 라우팅 */}
        <Route path="/" element={<Care />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/care" element={<Care />} />
        <Route path="/product" element={<Product />} />
        <Route path="/board" element={<Community />} />

        {/* 잘못된 경로일때 보내는 곳*/}
        <Route path="*" element={<Missing />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
