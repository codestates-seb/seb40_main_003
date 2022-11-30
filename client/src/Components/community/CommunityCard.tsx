import styled from "@emotion/styled";
import { getDateAgo } from "../../utils/controller";
import { ImageWrapper, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper, RowWrapper, SectionWrapper } from "../Wrapper";

export const NoticeboardWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
`;

const CommunityCard = ({ data }: any) => {
  // console.log(data)
  return (
    <ColumnWrapper>
      <SectionWrapper title={data.title} content={data.content} width={100}>
        <>
          {data.images[0] ? (
            <ImageWrapper
              className='communityImage mt-8'
              size={"112"}
              src={data.images[0]}
              alt={`상품명 ${data.title}의 대표이미지`}
              loading='lazy'
            />
          ) : (
            <></>
          )}

          <NoticeboardWrapper className='mt-8'>
            <RowWrapper>
              <span className='sub font-gray mr-8'>{getDateAgo(data.createdAt)}</span>
              {/* <span className='sub font-gray ml-16'>
                {data.member.nickname}
              </span> */}
            </RowWrapper>
            <ViewCounter
              view={data.likeNum}
              renameView="좋아요"
              renameLike='댓글'
              like={data.commentNum}
            />
          </NoticeboardWrapper>
        </>
      </SectionWrapper>
    </ColumnWrapper>
  );
};

export default CommunityCard;