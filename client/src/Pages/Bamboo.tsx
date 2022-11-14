import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import BambooCard from '../Components/bamboo/BambooCard';
import { bambooTypes } from '../types/bambooTypes'
import { Link } from 'react-router-dom';

const Community = () => {
  const [data, setData] = useState<bambooTypes>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/bamboo")
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
        return <Link to={`/bamboo/${e.communityId}`}><BambooCard key={e.communityId} data={e} /></Link>
      })}
    </>
  ) : (
    <>loading...</>
  );
};

export default Community