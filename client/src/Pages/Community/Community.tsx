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
import { InfiniteFetch } from "../../Hooks/useFetch";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorMessage } from "../../Components/ErrorHandle";
import { LoadingSkeleton } from "../../Components/Loading";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "react-query";
import { communityPreviewDataTypes } from "../../types/communityTypes";
import { useInView } from "react-intersection-observer";
import React, { useEffect, useState } from "react";
import { cannotLoad, searchbarComment } from "../../Const/message";

const communityQueryClient = new QueryClient();

type communityMain ={
  searchKeyword?:string
}
export const CommunityMain = ({searchKeyword}:communityMain) => {
  // 무한스크롤 감지 Ref
  const { ref, inView } = useInView();
  // useInfiniteQuery
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["communityQuery",searchKeyword],
    ({ pageParam = 1 }) => InfiniteFetch("/community", pageParam,searchKeyword),
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
    return <ErrorMessage content={cannotLoad}/>;

  return (
    <>
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((e: communityPreviewDataTypes) => (
            <Link
              to={`/community/${e.communityId}`}
              key={"member" + e.communityId}
            >
              <CommunityCard data={e} />
            </Link>
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage ? <LoadingSkeleton /> : <div ref={ref}></div>}
    </>
  );
};

const Community = () => {
  usePageTitle("커뮤니티");
  const [searchKeyWord, setSearchKeyWord] = useState("");
  return (
    <MainContentContainer>

      <MainCenterWrapper>
      <input
        type="text"
        placeholder={searchbarComment}
        className="mb-4"
        onChange={(e) => {
          setSearchKeyWord(e.target.value);
        }}
      />
        {/** 에러바운더리 fallback으로 에러시*/}
        <ErrorBoundary
          fallback={<ErrorMessage content={cannotLoad} />}
        >
          {/* 쿼리클라이언트 */}
          <QueryClientProvider client={communityQueryClient}>
            <CommunityMain searchKeyword={searchKeyWord}/>
          </QueryClientProvider>
        </ErrorBoundary>
      </MainCenterWrapper>
      <MainRightWrapper>
        {/* 우측 영역 */}
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
            반려식물을 자랑하고 궁금한 것을 물어보세요.🌱
          </p>
        </SectionWrapper>
        <Link to={"/community/write"}>
          <SigButton type="submit">새 글쓰기</SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default Community;
