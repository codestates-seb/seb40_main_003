import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import  CareCard  from "../../Components/main/CareCard";
import { caringTypes } from "../../types/caringTypes";
import { Link } from "react-router-dom";
import { MainContentContainer, MainCenterWrapper, MainRightWrapper } from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import useFetch from "../../Hooks/basicFetching";


type props = [caringTypes];

const Care = (props:any) => {
  const [data, setData] = useState<props>();
  const [isLoading, setIsLoading] = useState(true);
  usePageTitle("돌봄")
  useEffect(() => {
    axios.get("/caring")
    .then(( res ) => {
      // console.log(res.data)
      setData(res.data.data);
      // console.log(`저장된값 ${data}`)
      setIsLoading(false);
    });
  }, []);

  return !isLoading && data !== undefined ? (
    <MainContentContainer>
      <MainCenterWrapper>
      {data.map((e) => {
        return (
        <Link to={`/caring/${e.expertProfileId}`}>
          <CareCard key={e.expertProfileId} data={e} />
        </Link>
        )
    })}
      </MainCenterWrapper>

      <MainRightWrapper>
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <> loading... </>
  );
};

export default Care;