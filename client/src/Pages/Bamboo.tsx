import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
// import BambooCard from '../Components/bamboo/BambooCard';
import { bambooTypes } from '../types/bambooTypes'

type elemMaps = [bambooTypes]

const Community = () => {
  const [data, setData] = useState<elemMaps>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("https://testserver.com/bamboo")
    .then(({ data }) => {
      setData(data.communityId);
      setIsLoading(false);
    });
  }, []);

    console.log(data);
  
  return isLoading && data !== undefined ? (
    <>
      
    </>
  ) : (
    <>loading...</>
  );
};

export default Community