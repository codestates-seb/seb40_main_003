import axios from "../../node_modules/axios/index";

// axios.defaults.baseURL = "https://fbc9-121-162-186-109.jp.ngrok.io";

// 베이스 URL (기본으로 설정할 백엔드 api 주소)
const BASE_URL = process.env.REACT_APP_BASE_URL;
// const BASE_URL = "https://testserver.com";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "x-CSRFToken";

// 쿠키를 싣고가야하는 요청 axios
export const axiosPrivate = axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});

export default axios.create({
  baseURL: BASE_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});



