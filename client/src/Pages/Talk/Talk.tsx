import usePageTitle from "../../Hooks/usePageTitle";
import { Link, useParams } from "react-router-dom";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import { SigButton } from "../../Components/GlobalComponents";
import { QueryClient, QueryClientProvider, useQuery } from "react-query";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorMessage } from "../../Components/ErrorHandle";
import { cannotLoad } from "../../Const/message";
import { LoadingSkeleton } from "../../Components/Loading";
import { useEffect } from "react";
import { io } from "socket.io-client";
import { useRecoilValue } from "recoil";
import { userState } from "../../Recoil/atoms/user";
import { axiosPrivate } from "../../Hooks/api";
import { talkPreview } from "../../types/talk";
import { FetchByBody } from "../../Hooks/useFetch";

const talkQueryClient = new QueryClient();

const TalkElem = () => {
  const { data, isLoading, error } = useQuery(["expert/chat"], () => {
    const data = FetchByBody("/chat/experts");
    return data;    
  });
  if (isLoading) return <LoadingSkeleton />;
  if (error) {
    return <ErrorMessage content="컨텐츠를 불러오지 못했습니다" />;}
  return (
    <>
      {data &&
        data.map((e: talkPreview) => {
          return(
              <TalkCard data={e} />
          );
        })}
    </>)
    }

const TalkCard: React.FC<any> = ({ data }) => {
  console.log(data);

  const { roomId, roomName, sellerId, notReadNum } = data;


  return (
    <Link to={`/talk/${roomName}`}>
      <div>{`읽지않은 메세지${notReadNum}건`}</div>
    </Link>
  );
};

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
