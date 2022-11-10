import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import { SigTag } from "../Components/GlobalComponents";
import  CareCard  from "../Components/main/CareCard";
// import { careType } from "../types/careTypes";

// type props = [careType];

const Care = (props:any) => {
  const [data, setData] = useState();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("https://testserver.com/caring")
    .then(({ data }) => {
      console.log(data);
      setData(data);
      setIsLoading(false);
    });
  }, []);

  return (
    ! isLoading ?
    <div>
      <CareCard data={data}/>
      <SigTag>배고파</SigTag>
      <SigTag className="variant2">배고파</SigTag>
      <SigTag className="variant3">배고파</SigTag>
      <SigTag className="variant4">배고파</SigTag>
    </div> : <>loading</>
  )
}

export default Care;