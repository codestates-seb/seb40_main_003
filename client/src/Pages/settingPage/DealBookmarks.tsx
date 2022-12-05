import ProductCard from "../../Components/product/ProductCard";
import { ProductLikeType } from "../../types/productTypes";
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
import { cannotLoad } from "../../Const/message";

// 쿼리클라이언트
const productBookmarksQueryClient = new QueryClient();

export const ProductBookmarksMain = () => {
  // 무한스크롤 감지 Ref
  const { ref, inView } = useInView();

  // useInfiniteQuery
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["productBookmarksQuery"],
    ({ pageParam = 1 }) => InfiniteFetchPrivate("/deal/like", pageParam),
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
    return <ErrorMessage content={cannotLoad} />;

  return (
    <>
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((e: ProductLikeType) => (
            <Link key={e.dealId} to={`/product/${e.dealId}`}>
              <ProductCard data={e} />
            </Link>
          ))}
        </React.Fragment>
      ))}
      {isFetchingNextPage ? <LoadingSkeleton /> : <div ref={ref}></div>}
    </>
  );
};

// 전체 페이지
const ProductBookmarks = () => {
  usePageTitle("거래글 찜 목록");
  return (
    <MainContentContainer>
      <MainCenterWrapper>
        {/* 쿼리클라이언트로 감쌈 */}
        <ErrorBoundary
          fallback={<ErrorMessage content={cannotLoad} />}
        >
          <QueryClientProvider client={productBookmarksQueryClient}>
            <ProductBookmarksMain />
          </QueryClientProvider>
        </ErrorBoundary>
        {/* 쿼리클라이언트로 감쌈 */}
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
            내가 찜한 거래 게시물입니다.
          </p>
        </SectionWrapper>
        <span className="h4 bold"></span>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default ProductBookmarks;
