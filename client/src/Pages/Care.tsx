import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import  CareCard  from "../Components/main/CareCard";
import { caringTypes } from "../types/caringTypes";

type props = [caringTypes];

const Care = (props:any) => {
  const [data, setData] = useState<props>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("https://testserver.com/caring")
    .then(({ data }) => {
      console.log(data.data)
      setData(data.data);
      setIsLoading(false);
    });
  }, []);

  return !isLoading && data !== undefined ? (
    <>
      {data.map((e) => {
        return <CareCard key={e.data[0]} data={e} />
      })}
    </>
  ) : (
    <> loading... 로딩 그만하고 이제 내보내줘 살려줘 </>
  );
};

export default Care;