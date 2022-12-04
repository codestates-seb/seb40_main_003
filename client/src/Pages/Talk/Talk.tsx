import usePageTitle from "../../Hooks/usePageTitle";
import { Link } from "react-router-dom";
import {
  ColumnWrapper,
  MainCenterWrapper,
  MainContentContainer,
  SpaceEnd,
} from "../../Components/Wrapper";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorMessage } from "../../Components/ErrorHandle";
import { cannotLoad } from "../../Const/message";
import { LoadingSkeleton } from "../../Components/Loading";
import { talkPreview } from "../../types/talk";
import { FetchByBody } from "../../Hooks/useFetch";
import CareCard from "../../Components/care/CareCard";
import styled from "@emotion/styled";

const talkQueryClient = new QueryClient();

const TalkElem = () => {
  const { data, isLoading, error } = useQuery(["expert/chat"], () => {
    const data = FetchByBody("/chat/experts");
    return data;
  });
  if (isLoading) return <LoadingSkeleton />;
  if (error) {
    return <ErrorMessage content="컨텐츠를 불러오지 못했습니다" />;
  }
  return (
    <>
      {data &&
        data.map((e: talkPreview) => {
          return <TalkCard data={e} />;
        })}
    </>
  );
};

const TalkCard: React.FC<any> = ({ data }) => {
  console.log(data);
  return (
    <Link to={`/talk/${data.roomName}`}>
      <ColumnWrapper>
        {data.notReadNum!==0?<NotReadNum/>:null}
        <CareCard data={data.expertInfo} />
      </ColumnWrapper>
      <ColumnWrapper>
        {data.notReadNum!==0?<NotReadNum/>:null}
        <CareCard data={data.expertInfo} />
      </ColumnWrapper>
    </Link>
  );
};

const NotReadNum=styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background-color: var(--main);
  align-self: flex-end;
  margin-top: 8px;
  margin-bottom: -8px;
`

const Talk = () => {
  usePageTitle("대화");

  return (
    <>
      <MainContentContainer>
        <MainCenterWrapper>
          <ErrorBoundary fallback={<ErrorMessage content={cannotLoad} />}>
            <QueryClientProvider client={talkQueryClient}>
              <TalkElem />
            </QueryClientProvider>
          </ErrorBoundary>
        </MainCenterWrapper>
      </MainContentContainer>
    </>
  );
};
export default Talk;
