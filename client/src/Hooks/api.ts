import axios from "../../node_modules/axios/index";

// axios.defaults.baseURL = "https://fbc9-121-162-186-109.jp.ngrok.io";
const BASE_URL = "http://localhost:3000/";
axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.xsrfHeaderName = "x-CSRFToken";

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



