import axios from './api';
import {useState,useEffect} from 'react'
import { useRecoilState} from 'recoil';
import {loading} from "../Recoil/atoms/loadingStatus"


// URL을 받아서 DATA 를 리턴하는 Hooks
const useFetch=<T>(url:string,params?:object)=>{
  const [data, setData] = useState<T>();
  const [isLoading,setIsLoadng] = useRecoilState(loading)

  useEffect(() => {
    setIsLoadng(true)
    axios.get(url,{params}).then((res) => {
      setData(res.data)
    }).finally(()=>{
      setIsLoadng(false)
    })
    }, [url]);
  return data;
}
export const FetchByParams = async(url:string,params?:object)=>{
  const data = await axios.get(url,{params})
  return data
}
export const FetchByBody = async(url:string,body?:object)=>{
  const data = await axios.get(url,body)
  return data
}

export default useFetch