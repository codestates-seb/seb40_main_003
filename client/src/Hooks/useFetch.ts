import { fetchingImageLimit } from "../Const/fetchImage";
import axios, { axiosPrivate } from "./api";
import { useState, useEffect } from "react";


export type FetchByParamsType = {
  keyword?: null | string;
  page: number;
  size?: number;
  gugun?:string;
};
// /** params로 페치하는 훅으로, url, Params{page:불러올페이지, size:한번에 불러올 사이즈(기본값 15, const폴더에 정의 되어있음)}를 인자로 가짐 */
// export const FetchByParams = async(url:string,params:FetchByParamsType={keyword:null,page:1,size:fetchingImageLimit})=>{
//   const data = await axios.get(url,{params})
//   return data
// }
/** params로 페치하는 훅으로, url, Params{page:불러올페이지, size:한번에 불러올 사이즈(기본값 15, const폴더에 정의 되어있음)}를 인자로 가짐*/
export const FetchByParams = async (
  url: string,
  params: FetchByParamsType = {
    keyword: null,
    page: 1,
    size: fetchingImageLimit,

  }
) => {
  const data = await axios.get(url, { params });
  return data;
};
/** body로 페치하는 훅으로, url->string, Body->오브젝트 형태 를 인자로 가짐 */
export const FetchByBody = async <T>(url: string, body?: object) => {
  const { data } = await axiosPrivate.get(url, body);
  return data;
};
/** url,pageParam,keyword를 받아서 data, nextpage, isLast를 반환하는 함수 */
export const InfiniteFetch = async (
  url: string,
  pageParam: number,
  keyword?: string,
  size:number=fetchingImageLimit
) => {
  const res = await axios.get(
    `${url}?${
      keyword !== undefined ? `keyword=${keyword}` : ""
    }&page=${pageParam}&size=${size}`
  );
  const { data } = res.data;
  const { page, totalPages } = res.data.pageInfo;
  const isLast=  page === totalPages||totalPages === 0

  return { data, nextPage: pageParam + 1, isLast };
};
/** url,pageParam,keyword를 받아서 data, nextpage, isLast를 반환하는 함수 */
export const InfiniteFetchPrivate = async (
  url: string,
  pageParam: number,
  keyword?: string
) => {
  const res = await axiosPrivate.get(
    `${url}?${
      keyword !== undefined ? `keyword=${keyword}` : ""
    }&page=${pageParam}&size=${fetchingImageLimit}`
  );
  const { data } = res.data;
  const { page, totalPages } = res.data.pageInfo;
  const isLast=  page === totalPages||totalPages === 0
  return { data, nextPage: pageParam + 1, isLast };
};
// =============리액트 쿼리 사용으로 당분간 안쓸예정===============

// URL을 받아서 DATA 를 리턴하는 Hooks
const useFetch = <T>(url: string, params?: object) => {
  const [data, setData] = useState<T>();
  const [isLoading, setIsLoadng] = useState(true);

  useEffect(() => {
    setIsLoadng(true);
    axios
      .get(url, { params })
      .then((res) => {
        setData(res.data);
      })
      .finally(() => {
        setIsLoadng(false);
      });
  }, [url]);
  return data;
};
// =================================================================

export default useFetch;
