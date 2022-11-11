import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
// import BambooCard from '../Components/bamboo/BambooCard';
import { bambooTypes } from '../types/bambooTypes'

const Community = () => {
  const [data, setData] = useState<bambooTypes>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("https://testserver.com/bamboo")
    .then(( res ) => {
      console.log(res.data);
      setData(res.data);
      console.log(`저장된 값 ${data}`)
      setIsLoading(false);
    });
  }, []);
  console.log(data);

  return !isLoading && data !== undefined ? (
    <>
      {data.data.map((e) => {
        console.log(e.communityId);
        return <p key={e.communityId} >{e.communityId}</p>
      })}
    </>
  ) : (
    <>loading...</>
  );
};

export default Community