import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  CommentCard,
  CommentEdit,
  ImageWrapper,
  SigButton,
  ViewCounter,
} from "../../Components/GlobalComponents";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  RowWrapper,
} from "../../Components/Wrapper";
import { userState } from "../../Recoil/atoms/user";
import { bambooDetailTypes } from "../../types/bambooDetailTypes";
import { BambooWrapper } from "../../Components/bamboo/BambooCard";

const BambooDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<bambooDetailTypes | null>(null);
  const { id } = useParams();
  const user = useRecoilValue(userState);

  useEffect(() => {
    try {
      axios.get(`/bamboo/${id}`).then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
    } catch (err) {}
  }, []);

  return !isLoading && data !== null ? (
    <MainContentContainer>
      <MainCenterWrapper>
        <CommentEdit userId={user} author={data.member.memberId} />
        <span className="h4 bold font-main mb-16">{data.title}</span>
        {data.image[0] ? (
          <ImageWrapper
            className="bambooImage"
            size={"360"}
            src={data.image[0].imgUrl}
            alt={`상품명 ${data.title}의 대표이미지`}
          />
        ) : null}
        <p className="font-black mt-8 text-overflow">{data.content}</p>
        <BambooWrapper>
          <RowWrapper>
            <span className="sub font-gray">{data.createdAt}</span>
            <span className="sub font-gray ml-16">{data.member.nickname}</span>
          </RowWrapper>
          <ViewCounter
            view={data.view}
            renameLike="좋아요"
            like={data.likeNum}
          />
        </BambooWrapper>
        {data.comment.map((e) => {
          return (
            <CommentCard
              // 댓글 이미지 안날아옴
              // src={data.comment}
              name={e.member.nickname}
              createdAt={e.createdAt}
              content={e.content}
              key={e.commentId}
              author={e.member.memberId}
              user={user}
            />
          );
        })}
      </MainCenterWrapper>
      <MainRightWrapper>
        <SigButton>글작성</SigButton>
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <>loading...</>
  );
};

export default BambooDetail;
