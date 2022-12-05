import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper
} from "../../Components/Wrapper";
import CareCard from "../../Components/care/CareCard";
import { caringPreviewDataTypes } from "../../types/caringTypes";
import { Link } from "react-router-dom";
import usePageTitle from "../../Hooks/usePageTitle";
import { FetchByParams } from "../../Hooks/useFetch";
import { ErrorMessage } from "../../Components/ErrorHandle";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import { LoadingSkeleton } from "../../Components/Loading";
import { cannotLoad } from "../../Const/message";

const careQueryClient = new QueryClient();

export const CareMain = () => {
  const { data, isLoading, error } = useQuery(["careQuery"], () => {
    const data = FetchByParams("/experts", { keyword:"tag-id", page: 1, size: 5 });
    return data;    
  });
  if (isLoading) return <LoadingSkeleton />;
  if (error) {
    return <ErrorMessage content={cannotLoad} />;}
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
const CaringHistory = () => {
  usePageTitle("돌봄 기록")
  return (
    <MainContentContainer>
      <MainCenterWrapper>

        <ErrorBoundary fallback={<ErrorMessage content={cannotLoad}/>}>
          <QueryClientProvider client={careQueryClient} >
            <CareMain />
          </QueryClientProvider>
        </ErrorBoundary>

      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
          내가 서비스를 받았던 돌봄 전문가의 프로필입니다.
          </p>
        </SectionWrapper>
      </MainRightWrapper>
    </MainContentContainer>
  )
};

export default CaringHistory;
