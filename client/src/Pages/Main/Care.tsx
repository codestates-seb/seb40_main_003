import CareCard from "../../Components/main/CareCard";
import { caringPreviewDataTypes } from "../../types/caringTypes";
import { Link } from "react-router-dom";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import { InfiniteFetch } from "../../Hooks/useFetch";
import { ErrorMessage } from "../../Components/ErrorHandle";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import { LoadingSkeleton } from "../../Components/Loading";

import { useInView } from "react-intersection-observer";
import { useEffect } from "react";
import React from "react";

const careQueryClient = new QueryClient();

export const CareMain = () => {
  // 무한스크롤 감지 Ref
  const { ref, inView } = useInView();
  // useInfiniteQuery
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    "careQueryClient",
    ({ pageParam = 1 }) => InfiniteFetch("/experts", pageParam),
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
          {page.data.map((e: caringPreviewDataTypes) => (
            <Link key={e.expertId} to={`/experts/${e.expertId}`}>
              <CareCard data={e} />
            </Link>
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage ? <LoadingSkeleton /> : <div ref={ref}></div>}
    </>
  );
};

const Care = () => {
  usePageTitle("돌봄");

  return (
    <MainContentContainer>
      <MainCenterWrapper>
        <ErrorBoundary
          fallback={<ErrorMessage content="예상치 못한 발생했습니다" />}
        >
          <QueryClientProvider client={careQueryClient}>
            <CareMain />
          </QueryClientProvider>
        </ErrorBoundary>
      </MainCenterWrapper>
      <MainRightWrapper>
        <p>윤정's 페이지의 오류가 다른곳에 침범하지 못하게 막음</p>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default Care;
