import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import BambooCard from "../../Components/bamboo/BambooCard";
import { bambooTypes } from "../../types/bambooTypes";
import { Link } from "react-router-dom";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
} from "../../Components/Wrapper";
import { SigButton } from "../../Components/GlobalComponents";

const Community = () => {
  const [data, setData] = useState<bambooTypes>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    axios.get("/bamboo").then((res) => {
      console.log(res.data);
      setData(res.data);
      console.log(`저장된 값 ${data}`);
      setIsLoading(false);
    });
  }, []);

  return !isLoading && data !== undefined ? (
    <MainContentContainer>
      <MainCenterWrapper>
        {data.data.map((e) => {
          return (
            <Link
              to={`/bamboo/${e.communityId}`}
              key={"menber" + e.communityId}
            >
              <BambooCard data={e} />
            </Link>
          );
        })}
      </MainCenterWrapper>
      <MainRightWrapper>
        <span className="h4 bold">새글을 적어보아요~</span>
        <SigButton>새글 쓰기</SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <>loading...</>
  );
};

export default Community;
