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
import usePageTitle from "../../Hooks/usePageTitle";
import { LoadingSpinner } from '../../Components/Loading';

const Community = () => {
  const [data, setData] = useState<bambooTypes>();
  const [isLoading, setIsLoading] = useState(true);
  usePageTitle("게시판")
  useEffect(() => {
    axios.get("/bamboo").then((res) => {
      setData(res.data);
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
        <Link to={"/bamboo/write"}>
          <SigButton>새글 쓰기</SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <LoadingSpinner />
  );
};

export default Community;
