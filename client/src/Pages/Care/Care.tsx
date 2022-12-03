import CareCard from "../../Components/main/CareCard";
import { caringPreviewDataTypes } from "../../types/caringTypes";
import { Link } from "react-router-dom";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
  SpaceBetween,
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
import { cannotLoad, } from "../../Const/message";
import Modal from "../../Components/Modal";
import { ReactComponent as Hamburger } from "../../images/hamburgerIcon.svg";
import CategoryModal from "../../Components/care/CategoryModal";

export const careQueryClient = new QueryClient();

type CareMain = {
  searchKeyword?: string;
  size?: number;
};
export const CareMain = ({ searchKeyword, size }: CareMain) => {
  // 무한스크롤 감지 Ref
  const { ref, inView } = useInView();
  // useInfiniteQuery
  const { data, status, fetchNextPage, isFetchingNextPage } = useInfiniteQuery(
    ["careQueryClient", searchKeyword, size],
    ({ pageParam = 1 }) => InfiniteFetch("/experts", pageParam, searchKeyword, size),
    {
      getNextPageParam: (lastPage) =>
        !lastPage.isLast ? lastPage.nextPage : undefined,
    }
  );
  // 스크롤감지
  useEffect(() => {
    if (size&&size>10&&inView) fetchNextPage();
  }, [inView,size])

  if (status === "loading") return <LoadingSkeleton />;
  if (status === "error") return <ErrorMessage content={cannotLoad} />;
  return (
    <>
      {data?.pages.map((page, index) => (
        <React.Fragment key={index}>
          {page.data.map((e: caringPreviewDataTypes) => {
              return (
                <Link key={e.expertId} to={`/caring/${e.expertId}`}>
                  <CareCard data={e} />
                </Link>
              );
            })
          }
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

  return (
    <MainContentContainer>
      <MainCenterWrapper>
        <SpaceBetween>
          <select name="sorting" className="medium font-gray" id="option">
            <option value="정렬">최신순</option>
            <option value="정렬">찜 많은 순</option>
            <option value="정렬">찜순</option>
          </select>
          <button className="ml-16" onClick={onClickModal}>
            <Hamburger />
          </button>
        </SpaceBetween>
        <>
          {isOpenModal && (
            <Modal onClickModal={onClickModal} confirm={false}>
              <CategoryModal
                onClickFunction={setSearchKeyWord}
                closeModal={setOpenModal}
              />
            </Modal>
          )}
        </>
        <ErrorBoundary
          fallback={<ErrorMessage content="예상치 못한 에러가 발생했습니다" />}
        >
          <QueryClientProvider client={careQueryClient}>
            <CareMain searchKeyword={searchKeyWord} />
          </QueryClientProvider>
        </ErrorBoundary>
      </MainCenterWrapper>
      <MainRightWrapper>
        <p className="h5 bold font-main mr-16">
          우리 동네 식물 전문가에게 맡겨보세요.🌳
        </p>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default Care;
