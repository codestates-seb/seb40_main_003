import axios from 'axios';
import React, {useState,useEffect} from 'react'

type useFetchtypes ={
  url:string,
  method?:string
}
function useFetch({url,method="get"}:useFetchtypes) {
  const [data, setData] = useState();
  const [isLoading,setIsLoadng] = useState(true)

  useEffect(() => {
    axios.get(`${url}}`).then((res) => {
      setData(res.data)
      setIsLoadng(false)
    })
    }, []);
  return ({data,isLoading});
}

export default useFetch