import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useRecoilState, useRecoilValue } from "recoil";
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
import { NoticeboardWrapper } from "../../Components/community/CommunityCard";
import { Link } from "react-router-dom";
import CommentInput from "../../Components/UserInput";
import usePageTitle from "../../Hooks/usePageTitle";
import useFetch from "../../Hooks/useFetch";
import { getDateAgo } from "../../utils/controller";
import { ErrorBoundary } from "react-error-boundary";
import { ErrorMessage } from "../../Components/ErrorHandle";
import { cannotLoad, confirmRemove } from "../../Const/message";
import { CommentCard } from "../../Components/CommentCard";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { editDataAtom } from "../../Recoil/atoms/editData";

const CommunityDetail = () => {
  const { id } = useParams();
  const user = useRecoilValue(userState);
  const data = useFetch<communityDetailTypes>(`/community/${id}`);
  const [editData, setEditData] = useRecoilState(editDataAtom)
  
  usePageTitle("커뮤니티");
  const axiosPrivate = useAxiosPrivate()
  const navigate = useNavigate()
  
  return data !== undefined ? (
    <MainContentContainer>
      <MainCenterWrapper>
        <ErrorBoundary fallback={<ErrorMessage content={cannotLoad} />}>
          <NoticeboardWrapper>
            <span className="h4 bold font-main mb-16">{data.title}</span>
            {/* 게시글 수정, 삭제 버튼 */}
            {String(data.member.memberId) === String(user?.memberId) && (
              <div>
                {/* 수정버튼 */}
                <button className="sub mr-16" onClick={()=>{
                  setEditData(data)
                  navigate("/community/modify")
                }}>수정</button>
                {/* 삭제버튼 */}
                <button className="sub" onClick={()=>{
                  if (window.confirm(confirmRemove("게시물을"))) {
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
          </NoticeboardWrapper>
          {data.images[0] ? (
            <ImageWrapper
              className="communityImage"
              size={"240"}
              src={data.images[0]}
              alt={`상품명 ${data.title}의 대표이미지`}
            />
          ) : null}
          <p className="font-black mt-16 text-overflow">{data.content}</p>
          <NoticeboardWrapper className="mt-16">
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
          </NoticeboardWrapper>
          <CommentInput url={id} />
          {data.comments.length!==0?data.comments.map((e: communityCommentType) => {
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
                communityId={id ? id : ""}
              />
            );
          }):<></>}
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
