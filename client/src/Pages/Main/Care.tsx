import { useState } from "react";
import { useEffect } from "react";
import axios from "axios";
import CareCard from "../../Components/main/CareCard";
import { caringTypes } from "../../types/caringTypes";
import { Link } from "react-router-dom";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
} from "../../Components/Wrapper";
import { SigButton } from "../../Components/GlobalComponents";
import usePageTitle from "../../Hooks/usePageTitle";
import { LoadingSpinner } from "../../Components/Loading";

type props = [caringTypes];

const Care = (props: any) => {
  const [data, setData] = useState<props>();
  const [isLoading, setIsLoading] = useState(true);
  usePageTitle("돌봄");
  useEffect(() => {
    axios.get("/caring").then((res) => {
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
            <Link key={e.expertProfileId} to={`/caring/${e.expertProfileId}`}>
              <CareCard data={e} />
            </Link>
          );
        })}
      </MainCenterWrapper>

      <MainRightWrapper>
        <Link to={"/caring/category"}>
          <SigButton>돌봄 카테고리</SigButton>
        </Link>
          
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <MainContentContainer>
      <MainCenterWrapper>
        <LoadingSpinner />
      </MainCenterWrapper>
    </MainContentContainer>
  );
};

export default Care;
