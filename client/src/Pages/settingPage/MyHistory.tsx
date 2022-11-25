import CommunityCard from "../../Components/community/CommunityCard";
import { Link } from "react-router-dom";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import { SigButton } from "../../Components/GlobalComponents";
import usePageTitle from "../../Hooks/usePageTitle";
import { FetchByParams } from "../../Hooks/useFetch";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorMessage } from "../../Components/ErrorHandle";
import { LoadingSkeleton } from "../../Components/Loading";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { communityPreviewDataTypes } from "../../types/communityTypes";

const communityQueryClient = new QueryClient();

export const CommunityMain = () => {
  const { data, isLoading, error } = useQuery(["productQuery"], () => {
    const data = FetchByParams("/community", { page: 1, size: 5 });
    return data;
  });
  if (isLoading) return <LoadingSkeleton />;
  if (error) return <ErrorMessage content="컨텐츠를 불러오지 못했습니다" />;
  console.log(data)
  return (
    <>
      {data &&
        data.data.data.map((e: communityPreviewDataTypes) => {
          return (
            <Link
              to={`/community/${e.communityId}`}
              key={"member" + e.communityId}
            >
              <CommunityCard data={e} />
            </Link>
          );
        })}
    </>
  );
};

const MyHistory = () => {
  usePageTitle("내 게시물");
  return (
    <MainContentContainer>
      <MainCenterWrapper>
        {/* 에러바운더리 */}
        <ErrorBoundary fallback={<ErrorMessage content={"정보를 불러오는데 실패했습니다"} />}>
          {/* 쿼리클라이언트 */}
          <QueryClientProvider client={communityQueryClient}>
            <CommunityMain />
          </QueryClientProvider>
        </ErrorBoundary>
        
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
            내가 작성한 커뮤니티 글입니다.
          </p>
        </SectionWrapper>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default MyHistory;
