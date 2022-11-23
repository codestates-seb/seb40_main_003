import CommunityCard from "../../Components/community/CommunityCard";
import { communityTypes } from "../../types/communityTypes";
import { Link } from "react-router-dom";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper
} from "../../Components/Wrapper";
import { SigButton } from "../../Components/GlobalComponents";
import usePageTitle from "../../Hooks/usePageTitle";
import useFetch from "../../Hooks/useFetch";

const Community = () => {
  usePageTitle("커뮤니티")
  const data = useFetch<communityTypes>("/community", { page: 1, size: 5 })
  
  return data?(
    <MainContentContainer>
      <MainCenterWrapper>
        {data.data.map((e) => {
          return (
            <Link
              to={`/community/${e.communityId}`}
              key={"member" + e.communityId}
            >
              <CommunityCard data={e} />
            </Link>
          );
        })}
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className='h5 bold font-main mr-16'>반려식물을 자랑하고 궁금한 것을 물어보세요.🌱
          </p></SectionWrapper>
        <Link to={"/community/write"}>
          <SigButton type='submit'>새 글쓰기</SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer >
  ):<></>
};

export default Community;
