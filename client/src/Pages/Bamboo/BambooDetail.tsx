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
  SectionWrapper
} from "../../Components/Wrapper";
import { userState } from "../../Recoil/atoms/user";
import { bambooDetailTypes } from "../../types/bambooDetailTypes";
import { BambooWrapper } from "../../Components/bamboo/BambooCard";
import { Link } from "react-router-dom";
import CommentInput from '../../Components/UserInput';
import usePageTitle from "../../Hooks/usePageTitle";

const BambooDetail = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState<bambooDetailTypes | null>(null);
  const { id } = useParams();
  const user = useRecoilValue(userState);
  usePageTitle("커뮤니티")


  const onSubmit = (form : {description: string;}) => {
    console.log(form)
  }
  

  useEffect(() => {
    try {
      axios.get(`/bamboo/${id}`).then((res) => {
        setData(res.data);
        setIsLoading(false);
      });
    } catch (err) { }
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
        <CommentInput onSubmit={onSubmit}/>
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
        <SectionWrapper borderNone={true}>
          <p className='h5 bold font-main mr-16'>귀여운 반려식물을 자랑하거나, 우리 동네의 숨겨진 식물 박사들에게 궁금한 점들을 물어보세요.🌱
          </p></SectionWrapper>
        <Link to={"/bamboo/write"}>
          <SigButton type='submit'>새 글쓰기</SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <>loading...</>
  );
};

export default BambooDetail;
