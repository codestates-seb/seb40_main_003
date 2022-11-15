import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import  CareCard  from "../../Components/main/CareCard";
import { caringTypes } from "../../types/caringTypes";
import { Link } from "react-router-dom";
import { MainContentContainer, MainCenterWrapper, MainRightWrapper } from "../../Components/main/Wrapper";
import { SigButton } from "../../Components/GlobalComponents";


type props = [caringTypes];

const Care = (props:any) => {
  const [data, setData] = useState<props>();
  const [isLoading, setIsLoading] = useState(true);

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
    <> loading... 로딩 그만하고 이제 내보내줘 살려줘 </>
  );
};

export default Care;