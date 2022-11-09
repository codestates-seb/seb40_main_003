import { Routes } from "react-router";
import { BrowserRouter, Route } from "react-router-dom";

import Main from "./Pages/Main";
import Navbar from './Components/Navbar';

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
    <Navbar/>
      {/* 양옆 Padding을 제공하는 Wrapper 입니다 */}

        <Routes>
          <Route path="/" element={<Main />} />
          {/* 잘못된 경로일때 보내는 곳*/}
          {/* <Route path="*" element={<Missing />} /> */}
        </Routes>

    </BrowserRouter>
  );
}


export default App;
