import { useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  CommentCard,
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
import { communityDetailTypes } from "../../types/communityDetailTypes";
import { CommunityWrapper } from "../../Components/community/CommunityCard";
import { Link } from "react-router-dom";
import CommentInput from '../../Components/UserInput';
import usePageTitle from "../../Hooks/usePageTitle";
import useFetch from "../../Hooks/useFetch";
import { getDateAgo } from "../../utils/controller";

const CommunityDetail = () => {
  const { id } = useParams();
  const user = useRecoilValue(userState);
  const data = useFetch<communityDetailTypes>(`/community/${id}`)
  usePageTitle("커뮤니티")

  const onSubmit = (form : {description: string;}) => {
    console.log(form)
  }

  return data !== undefined ? (
    <MainContentContainer>
      <MainCenterWrapper>
        <CommunityWrapper>
          <span className='h4 bold font-main mb-16'>{data.title}</span>
        </CommunityWrapper>
        {data.images[0] ? (
          <ImageWrapper
            className='communityImage'
            size={"240"}
            src={data.images[0]}
            alt={`상품명 ${data.title}의 대표이미지`}
          />
        ) : null}
        <p className='font-black mt-16 text-overflow'>{data.content}</p>
        <CommunityWrapper className='mt-16'>
          <RowWrapper>
            <span className='sub font-gray'>{getDateAgo(data.createdAt)}</span>
            {/* <span className='sub font-gray ml-16'>{data.member.nickname}</span> */}
          </RowWrapper>
          <ViewCounter
            view={data.view}
            renameLike='좋아요'
            like={data.likes}
          />
        </CommunityWrapper>
        <CommentInput onSubmit={onSubmit}/>
        {data.comments.map((e:any) => {
          return (
            <CommentCard
              src={e.writer.image}
              alt={`${e.writer.nickname}의 대표이미지`}
              size={"36"}
              name={e.writer.nickname}
              createdAt={e.createdAt}
              content={e.content}
              key={e.commentId}
              author={e.writer.memberId}
              user={user}
            />

          );
        })}
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className='h5 bold font-main mr-16'>반려식물을 자랑하고 궁금한 것을 물어보세요.🌱
          </p></SectionWrapper>
        <Link to={"/community/write"}>
          <SigButton type='submit'>새 글쓰기</SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer>
  ):<></>
};

export default CommunityDetail;