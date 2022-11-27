import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useRecoilValue } from "recoil";
import {
  ImageWrapper,
  SigButton,
  ViewCounter,
} from "../../Components/GlobalComponents";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  RowWrapper,
  SectionWrapper,
} from "../../Components/Wrapper";
import { userState } from "../../Recoil/atoms/user";
import { communityCommentType, communityDetailTypes } from "../../types/communityTypes";
import { CommunityWrapper } from "../../Components/community/CommunityCard";
import { Link } from "react-router-dom";
import CommentInput from "../../Components/UserInput";
import usePageTitle from "../../Hooks/usePageTitle";
import useFetch from "../../Hooks/useFetch";
import { getDateAgo } from "../../utils/controller";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorMessage } from "../../Components/ErrorHandle";
import { cannotLoad } from "../../Const/ErrorContent";
import { CommentCard } from "../../Components/CommentCard";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";

const CommunityDetail = () => {
  const { id } = useParams();
  const user = useRecoilValue(userState);
  const data = useFetch<communityDetailTypes>(`/community/${id}`);
  
  usePageTitle("커뮤니티");
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  console.log(data?.comments)
  return data !== undefined ? (
    <MainContentContainer>
      <MainCenterWrapper>
        <ErrorBoundary fallback={<ErrorMessage content={cannotLoad} />}>
          <CommunityWrapper>
            <span className="h4 bold font-main mb-16">{data.title}</span>{" "}
            {/* 게시글 수정, 삭제 버튼 */}
            {String(data.member.memberId) === String(user?.memberId) && (
              <div>
                {/* 수정버튼 */}
                <button className="sub mr-16">수정</button>
                {/* 삭제버튼 */}
                <button className="sub" onClick={()=>{
                  if (window.confirm("게시글을 삭제 하시겠습니까?")) {
                    axiosPrivate.delete(
                      `/community/${data.communityId}`
                    ).then((res)=>{
                      window.alert("삭제가 완료되었습니다")
                      navigate("/community")
                    });
                  }
                }}>삭제</button>
              </div>
            )}
          </CommunityWrapper>
          {data.images[0] ? (
            <ImageWrapper
              className="communityImage"
              size={"240"}
              src={data.images[0].imgUrl}
              alt={`상품명 ${data.title}의 대표이미지`}
            />
          ) : null}
          <p className="font-black mt-16 text-overflow">{data.content}</p>
          <CommunityWrapper className="mt-16">
            <RowWrapper>
              <span className="sub font-gray">
                {getDateAgo(data.createdAt)}
              </span>
              {/* <span className='sub font-gray ml-16'>{data.member.nickname}</span> */}
            </RowWrapper>
            <ViewCounter
              view={data.view}
              renameLike="좋아요"
              like={data.likeNum}
            />
          </CommunityWrapper>
          <CommentInput url={id} />
          {data.comments.map((e: communityCommentType) => {
            return (
              <CommentCard
                src={e.writer.image}
                alt={`${e.writer.nickname}의 대표이미지`}
                size={"36"}
                name={e.writer.nickname}
                createdAt={e.createdAt}
                content={e.content}
                commentId={e.commentId}
                key={e.commentId}
                author={e.writer.memberId}
                user={user}
                communityId={id ? id : ""}
              />
            );
          })}
        </ErrorBoundary>
      </MainCenterWrapper>
      <MainRightWrapper>
        <SectionWrapper borderNone={true}>
          <p className="h5 bold font-main mr-16">
            반려식물을 자랑하고 궁금한 것을 물어보세요.🌱
          </p>
        </SectionWrapper>
        <Link to={"/community/write"}>
          <SigButton type="submit">새 글쓰기</SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer>
  ) : (
    <></>
  );
};

export default CommunityDetail;
