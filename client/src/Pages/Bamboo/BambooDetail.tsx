import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  CommentCard,
  ImageWrapper,
  SigButton,
  ViewCounter,
} from "../../Components/GlobalComponents";
import { SpaceEnd } from "../../Components/product/ProductCard";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
} from "../../Components/Wrapper";
import { userState, UserStateType } from "../../Recoil/atoms/atom";
import { bambooDetailTypes } from "../../types/bambooDetailTypes";

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
        console.log(res.data);
      });
    } catch (err) {
      console.log(err);
    }
  }, []);

  return !isLoading && data !== null ? (
    <MainContentContainer>
      <MainCenterWrapper>
        <span className="h4 bold font-main">{data.title}</span>
        {data.image[0] ? (
          <ImageWrapper
            className="bambooImage"
            size={"360"}
            src={data.image[0].imgUrl}
            alt={`상품명 ${data.title}의 대표이미지`}
          />
        ) : null}
        <p className="font-black">{data.content}</p>
        <span className="sub font-gray">{data.createdAt}</span>
        <span className="sub font-gray ml-4">{data.member.nickname}</span>
        <SpaceEnd>
          <ViewCounter view={data.view} like={data.likeNum} />
        </SpaceEnd>
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
