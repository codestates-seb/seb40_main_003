// import { useState } from "react";
// import { useEffect } from "react";
// import axios from "axios";
import  CareCard  from "../Components/main/CareCard";

type Props = {}

// useEffect(() => {
//   axios.get("https://testserver.com/caring").then(({ data }) => {
//     console.log(data.caring);
//     setData(data.caring);
//     setIsLoading(false);
// })
// })


const Care = (props: Props) => {
  // const [data, setData] = useState<elemMaps>();
  // const [isLoading, setIsLoading] = useState(true);
  return (
    <div>
      <CareCard>Care</CareCard>
    </div>
  )
}

export default Care;