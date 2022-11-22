import axios from 'axios';
import {useState,useEffect} from 'react'

type useFetchtypes ={
  url:string,
}
function useFetch({url}:useFetchtypes) {
  const [data, setData] = useState();
  const [isLoading,setIsLoadng] = useState(true)

  useEffect(() => {
    axios.get(`${url}}`).then((res) => {
      setData(res.data)
      setIsLoadng(false)
    })
    }, []);
  return (data);
}

export default useFetch