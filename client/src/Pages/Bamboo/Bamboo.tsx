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
  SectionWrapper
} from "../../Components/Wrapper";
import { SigButton } from "../../Components/GlobalComponents";
import usePageTitle from "../../Hooks/usePageTitle";
import { LoadingSpinner } from '../../Components/Loading';

const Community = () => {
  const [data, setData] = useState<bambooTypes>();
  const [isLoading, setIsLoading] = useState(true);
  usePageTitle("커뮤니티")
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
        <SectionWrapper borderNone={true}>
          <p className='h5 bold font-main mr-16'>반려식물을 자랑하거나, 궁금한 점들을 물어보세요.🌱
          </p></SectionWrapper>
        <Link to={"/bamboo/write"}>
          <SigButton type='submit'>새 글쓰기</SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer >
  ) : (
    <LoadingSpinner />
  );
};

export default Community;
