import axios from 'axios';
import {useState,useEffect} from 'react'

type useFetchtypes ={
  url:string,
}
// URL을 받아서 DATA 를 리턴하는 Hooks
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