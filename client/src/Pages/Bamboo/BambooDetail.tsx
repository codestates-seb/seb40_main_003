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
        <BambooWrapper>
          <span className='h4 bold font-main mb-16'>{data.title}</span>
          <CommentEdit
            userId={user !== null ? user.userId : ""}
            author={data.member.memberId}
          />
        </BambooWrapper>
        {data.image[0] ? (
          <ImageWrapper
            className='bambooImage'
            size={"240"}
            src={data.image[0].imgUrl}
            alt={`상품명 ${data.title}의 대표이미지`}
          />
        ) : null}
        <p className='font-black mt-16 text-overflow'>{data.content}</p>
        <BambooWrapper className='mt-16'>
          <RowWrapper>
            <span className='sub font-gray'>{data.createdAt}</span>
            <span className='sub font-gray ml-16'>{data.member.nickname}</span>
          </RowWrapper>
          <ViewCounter
            view={data.view}
            renameLike='좋아요'
            like={data.likeNum}
          />
        </BambooWrapper>
        {data.comment.map((e) => {
          return (
            <CommentCard
              src={e.member.image.imgUrl}
              alt={`${e.member.nickname}의 대표이미지`}
              size={"36"}
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
