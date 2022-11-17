import axios from 'axios';
import React, {useState,useEffect} from 'react'

type useFetchtypes ={
  url:string,
  types:any
}
function useFetch({url}:useFetchtypes) {

  const [data, setData] = useState();
  useEffect(() => {
    axios.get(`${url}}`).then((res) => {
      setData(res.data)
    })
    }, []);
  return data;
}

export default useFetch