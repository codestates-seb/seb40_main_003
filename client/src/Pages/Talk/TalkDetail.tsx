import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { SigButton } from "../../Components/GlobalComponents";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  RowWrapper,
} from "../../Components/Wrapper";
import axios from "../../Hooks/api";

import usePageTitle from "../../Hooks/usePageTitle";
import { userState } from "../../Recoil/atoms/user";
import { talkDetail } from "../../types/talk";

export const TalkDetail = () => {
  usePageTitle("");
  const { id } = useParams();
  const [data, setData] = useState<talkDetail>();
  const [isLoading, setIsLoading] = useState(true);
  const user = useRecoilValue(userState);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);
  const divRef = useRef<HTMLDivElement>(null);
  console.log(data)

  // 패칭함수
  const Fetching = () => {
    axios.get(`/chat/deal/${id}`).then((res) => {
      setIsLoading(true);
      setData(res.data);
      setIsLoading(false);
    });
  };

  // 초기 패칭
  useEffect(() => {
    Fetching();
  }, []);
  
  const socketURL = process.env.REACT_APP_WS_BASE_URL
  const socket = new WebSocket(socketURL!==undefined?socketURL:"");

  // 새로운 메시지가 생기면 자동으로 밑으로
  useEffect(() => {
    divRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [data]);

  // 소켓 연결
  useEffect(() => {
    socket.onopen = () => {
      console.log("소켓연결 성공");
      socket.send(
        JSON.stringify({
          type: "JOIN_WEB_SOCKET",
          memberId: 2,
        })
      );
      console.log(
        JSON.stringify({
          type: "JOIN_WEB_SOCKET",
          memberId: user?.memberId,
        })
      );
    };
    socket.onmessage = (e: any) => {
      Fetching();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user?.memberId]);

  // 메세지 보내는 함수
  const sendMessage = (message: string) => {
    socket.send(
      JSON.stringify({
        type: "EXPERT_CHAT",
        roomId: 1,
        roomName: id,
        senderId: user?.memberId,
        senderNickname: user?.nickname,
        message: `${message}`,
      })
    );
  };

  return !isLoading && data !== undefined ? (
    <MainContentContainer className="mg-0">
      <MainCenterWrapper className="mg-0">
        <MessageWrapper>
          <>
            {data.length === 0 ? (
              <span>아직 대화가 없습니다 대화를 시작해보세요</span>
            ) : (
              data.map((e) => {
                if (e.message.length === 0) {
                  return null;
                } else
                  return (
                    <Message
                      key={e.messageId}
                      className={
                        e.messageSender.memberId === user?.memberId
                          ? ""
                          : "notMine"
                      }
                    >
                      {e.message}
                    </Message>
                  );
              })
            )}
            <div ref={divRef}></div>
          </>
        </MessageWrapper>
        <RowWrapper className="mt-8">
          <input
            className="width-100"
            type="text"
            onChange={(e) => {
              setMessage(e.target.value);
            }}
            ref={inputRef}
          />
          <SubmitButton
            onClick={() => {
              if (message.length === 0) {
                return;
              } else if (inputRef.current !== null) {
                sendMessage(message);
                inputRef.current.value = "";
              }
            }}
          >
            보내기
          </SubmitButton>
        </RowWrapper>
      </MainCenterWrapper>
      <MainRightWrapper>
        <SigButton>약속잡기</SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <></>
  );
};

const SubmitButton = styled.button`
  padding: 8px;
  color: var(--pure-white);
  background-color: var(--main);
  border-radius: 4px;
`;

const MessageWrapper = styled.main`
  height: 60vh;
  display: flex;
  flex-direction: column;
  overflow-y: scroll;
`;
const Message = styled.div`
  width: fit-content;
  align-self: flex-end;
  max-width: 40vw;
  align-self: end;
  padding: 8px;
  border-radius: var(--sig-border-8);
  margin: 4px;
  background-color: var(--main);
  color: var(--pure-white);
  &.notMine {
    align-self: flex-start;
    color: var(--font-black);
    background-color: var(--bg-light-gray);
    border: 1px solid var(--line-gray);
  }
`;
