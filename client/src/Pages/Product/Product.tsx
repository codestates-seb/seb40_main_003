import ProductCard from "../../Components/product/ProductCard";
import { Link } from "react-router-dom";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper,
  SpaceBetween,
} from "../../Components/Wrapper";
import { SigButton } from "../../Components/GlobalComponents";
import usePageTitle from "../../Hooks/usePageTitle";
import { InfiniteFetch } from "../../Hooks/useFetch";
import {
  QueryClient,
  QueryClientProvider,
  useInfiniteQuery,
} from "react-query";

import { ErrorMessage } from "../../Components/ErrorHandle";
import { LoadingSkeleton } from "../../Components/Loading";
import { ErrorBoundary } from "react-error-boundary";
import { useEffect, useState } from "react";
import { useInView } from "react-intersection-observer";
import React from "react";
import { ProfileDealType } from "../../types/profileType";
import { cannotLoad, searchbarComment } from "../../Const/message";

// 쿼리클라이언트
export const productQueryClient = new QueryClient();
type productMain = {
  searchKeyword?: string;
  size?: number;
};

export const ProductMain = ({ searchKeyword, size }: productMain) => {
  // 무한스크롤 감지 Ref
  const { ref, inView } = useInView();

  // useInfiniteQuery
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["productQuery", searchKeyword, size],
    ({ pageParam = 1 }) =>
      InfiniteFetch("/deal", pageParam, searchKeyword, size),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
    }
  );
  // 스크롤감지
  
  useEffect(() => {
    if (size!==3&&inView) fetchNextPage();
  }, [inView,size])

  if (status === "loading") return <LoadingSkeleton />;
  if (status === "error") return <ErrorMessage content={cannotLoad} />;

  return (
    <>
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((e: ProfileDealType) => (
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
const Product = () => {
  const [searchKeyWord, setSearchKeyWord] = useState<string | undefined>(
    undefined
  );

  usePageTitle("거래");
  return (
    <>
      <MainContentContainer>
        <MainCenterWrapper>
          <input
            type="text"
            className="mb-4 width-100"
            placeholder={searchbarComment}
            onChange={(e) => {
              setSearchKeyWord(e.target.value);
            }}
          />
          <SpaceBetween>
            <div className="justify-center mt-8">
              <input
                type={"checkbox"}
                id="autoLogin"
                className="border-none checkbox mr-8"
                defaultChecked
              />
              <label className="medium " htmlFor={"autoLogin"}>
                판매중인 글만 보기
              </label>
            </div>
          </SpaceBetween>
          {/* 쿼리클라이언트로 감쌈 */}

          <ErrorBoundary fallback={<ErrorMessage content={cannotLoad} />}>
            <QueryClientProvider client={productQueryClient}>
              <ProductMain searchKeyword={searchKeyWord} size={15}/>
            </QueryClientProvider>
          </ErrorBoundary>

          {/* 쿼리클라이언트로 감쌈 */}
        </MainCenterWrapper>
        <MainRightWrapper>
          <SectionWrapper borderNone={true}>
            <p className="h5 bold font-main mr-16">
              반려식물을 분양하고 원예 용품을 판매해보세요.🌵
            </p>
          </SectionWrapper>
          <span className="h4 bold"></span>
          <Link to={"/product/write"}>
            <SigButton type="submit">새 글쓰기</SigButton>
          </Link>
        </MainRightWrapper>
      </MainContentContainer>
    </>
  );
};

export default Product;
