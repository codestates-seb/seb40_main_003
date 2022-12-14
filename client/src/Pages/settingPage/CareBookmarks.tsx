import CareCard from "../../Components/care/CareCard";
import { CareLikeType, caringPreviewTypes } from "../../types/caringTypes";
import { Link } from "react-router-dom";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import { InfiniteFetchPrivate } from "../../Hooks/useFetch";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "react-query";

import { ErrorMessage } from "../../Components/ErrorHandle";
import { LoadingSkeleton } from "../../Components/Loading";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import React from "react";

// 쿼리클라이언트
const CareBookmarksQueryClient = new QueryClient();

export const CareBookmarksMain = () => {

  // 무한스크롤 감지 Ref
  const { ref, inView } = useInView();
  // useInfiniteQuery
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "CareBookmarksQuery",
    ({ pageParam = 1 }) => InfiniteFetchPrivate("/experts/like", pageParam),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
    }
  );


  // 스크롤감지
  useEffect(() => {
    if (inView) fetchNextPage();
  }, [inView]);

  if (status === "loading") return <LoadingSkeleton />;
  if (status === "error")
    return <ErrorMessage content="컨텐츠를 불러오지 못했습니다" />;
  return (
    <>
      {data?.pages.map((page, index) => (

        <React.Fragment key={index}>
          {page.data.map((e: caringPreviewTypes&CareLikeType) => (
            <Link
              key={e.memberLikeExpertId}
              to={`/experts/${e.memberLikeExpertId}`}
            >
              <CareCard data={e.data} />
            </Link>

          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage ? <LoadingSkeleton /> : <div ref={ref}></div>}
    </>
  );
};

// 전체 페이지
const CareBookmarks = () => {
  usePageTitle("돌봄 전문가 찜 목록");
  return (
    
    <MainContentContainer>
      <MainCenterWrapper>
        {/* 쿼리클라이언트로 감쌈 */}
        <ErrorBoundary
          fallback={<ErrorMessage content={"정보를 불러오는데 실패했습니다"} />}
        >
          <QueryClientProvider client={CareBookmarksQueryClient}>
            <CareBookmarksMain />
          </QueryClientProvider>
        </ErrorBoundary>
        {/* 쿼리클라이언트로 감쌈 */}
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
            내가 찜한 돌봄 전문가 프로필입니다.
          </p>
        </SectionWrapper>
        <span className="h4 bold"></span>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default CareBookmarks;
