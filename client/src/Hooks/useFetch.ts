import axios from './api';
import {useState,useEffect} from 'react'
import { useRecoilState} from 'recoil';
import {loading} from "../Recoil/atoms/loadingStatus"


// URL을 받아서 DATA 를 리턴하는 Hooks
const useFetch=<T>(url:string)=>{
  const [data, setData] = useState<T>();
  const [isLoading,setIsLoadng] = useRecoilState(loading)

  useEffect(() => {
    setIsLoadng(true)
    axios.get(url).then((res) => {
      setData(res.data)
    }).finally(()=>{
      setIsLoadng(false)
    })
    }, [url]);
  return data;
}

export default useFetch