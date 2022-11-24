import CareCard from "../../Components/main/CareCard";
import { caringPreviewDataTypes } from "../../types/caringTypes";
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
import { ErrorBoundary } from "react-error-boundary";
import { LoadingSkeleton } from "../../Components/Loading";

const careQueryClient = new QueryClient();

const CareMain = () => {
  const { data, isLoading, error } = useQuery(["careQuery"], () => {
    const data = FetchByParams("/experts", { page: 1, size: 5 });
    return data;    
  });
  if (isLoading) return <LoadingSkeleton />;
  if (error) {console.log(data)
    return <ErrorMessage content="컨텐츠를 불러오지 못했습니다" />;}
  return (
    <>
      {data &&
        data.data.data.map((e: caringPreviewDataTypes) => {
          return(
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

        <ErrorBoundary fallback={<ErrorMessage content="예상치 못한 발생했습니다"/>}>
          <QueryClientProvider client={careQueryClient} >
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
