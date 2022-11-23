import CareCard from "../../Components/main/CareCard";
import { caringTypes } from "../../types/caringTypes";
import { Link } from "react-router-dom";
import {
  MainContentContainer,
  MainCenterWrapper,
  MainRightWrapper,
} from "../../Components/Wrapper";
import usePageTitle from "../../Hooks/usePageTitle";
import { FetchByParams } from "../../Hooks/useFetch";
import { ErrorMessage } from "../../Components/ErrorHandle";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { LoadingSkeleton } from "../../Components/Loading";

const careQueryClient = new QueryClient();

const CareMain = () => {
  const { data, isLoading, error } = useQuery(
    ["careQuery"],
    () => {
      const data = FetchByParams("/experts", { page: 1, size: 5 });
      return data;
    }
  );
  if (isLoading)
    return (
        <LoadingSkeleton/>
    );
  if (error) return <ErrorMessage content="컨텐츠를 불러오지 못했습니다" />;
  return (
    <>
      {data &&
      // ===============any고치기===========
        data.data.map((e:any) => {
          return (
            <Link key={e.expertId} to={`/experts/${e.expertId}`}>
              <CareCard data={e} />
            </Link>
          );
        })}
    </>
  );
};

const Care = () => {
  usePageTitle("돌봄");

  return (
    <MainContentContainer>
      <MainCenterWrapper>
        <QueryClientProvider client={careQueryClient}>
          <CareMain />
        </QueryClientProvider>
      </MainCenterWrapper>
      <MainRightWrapper>
        <p>윤정's 페이지의 오류가 다른곳에 침범하지 못하게 막음</p>
      </MainRightWrapper>
    </MainContentContainer>
  );
};

export default Care;
