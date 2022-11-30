import CareCard from "../../Components/main/CareCard";
import { caringPreviewDataTypes } from "../../types/caringTypes";
import { Link } from "react-router-dom";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SpaceBetween,
  SpaceEnd,
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
import { useCallback, useEffect, useState } from "react";
import React from "react";
import { cannotLoad, noContent, searchbarComment } from "../../Const/message";
import Modal from "../../Components/Modal";
import CategoryModal from "../../Components/product/CategoryModal";
import { ReactComponent as Hamburger } from "../../images/hamburgerIcon.svg";

const careQueryClient = new QueryClient();

type CareMain = {
  searchKeyword?: string;
};
export const CareMain = ({searchKeyword}:CareMain) => {

  // 무한스크롤 감지 Ref
  const { ref, inView } = useInView();
  // useInfiniteQuery
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["careQueryClient",searchKeyword],
    ({ pageParam = 1 }) => InfiniteFetch("/experts", pageParam, searchKeyword),
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
  if (status === "error") return <ErrorMessage content={cannotLoad} />;
  return (
    <>
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.length === 0 ? (
            <ErrorMessage  className="pt-16 width-100" content={noContent} />
          ) : (
            page.data.map((e: caringPreviewDataTypes) => {
              return (
                <Link key={e.expertId} to={`/caring/${e.expertId}`}>
                  <CareCard data={e} />
                </Link>
              );
            })
          )}
        </React.Fragment>
      ))}
      {isFetchingNextPage ? <LoadingSkeleton /> : <div ref={ref}></div>}
    </>
  );
};

const Care = () => {
  usePageTitle("돌봄");
  const [searchKeyWord, setSearchKeyWord] = useState<string | undefined>(
    undefined
  );
  const [isOpenModal, setOpenModal] = useState<boolean>(false);
  const onClickModal = useCallback(() => {
    setOpenModal(!isOpenModal);
  }, [isOpenModal]);
  console.log(searchKeyWord)

  return (
    <MainContentContainer>
      <MainCenterWrapper>
        <SpaceEnd>
          <button className="ml-16" onClick={onClickModal}>
            <Hamburger />
          </button>
        </SpaceEnd>
        <>
          {isOpenModal && (
            <Modal onClickModal={onClickModal} confirm={false}>
              <CategoryModal onClickFunction={setSearchKeyWord} closeModal={setOpenModal} />
            </Modal>
          )}
        </>
        <ErrorBoundary
          fallback={<ErrorMessage content="예상치 못한 에러가 발생했습니다" />}
        >
          <QueryClientProvider client={careQueryClient}>
            <CareMain searchKeyword={searchKeyWord}/>
          </QueryClientProvider>
        </ErrorBoundary>
      </MainCenterWrapper>
      <MainRightWrapper>
        <p className="h5 bold font-main mr-16">
          우리 동네 식물 전문가를 만나보세요.🌿
        </p>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default Care;
