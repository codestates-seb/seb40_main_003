import styled from "@emotion/styled";
import { getDateAgo } from "../../utils/controller";
import { ImageWrapper, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper, RowWrapper, SectionWrapper } from "../Wrapper";

export const CommunityWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
`;

const CommunityCard = ({ data }: any) => {
  return (
    <ColumnWrapper>
      <SectionWrapper title={data.title} content={data.content} width={100}>
        <>
          {data.images[0] ? (
            <ImageWrapper
              className='communityImage mt-8'
              size={"112"}
              src={data.images[0].imgUrl}
              alt={`상품명 ${data.title}의 대표이미지`}
              loading='lazy'
            />
          ) : (
            <></>
          )}

          <CommunityWrapper className='mt-7'>
            <RowWrapper>
              <span className='sub font-gray'>{getDateAgo(data.createdAt)}</span>
              {/* <span className='sub font-gray ml-16'>
                {data.member.nickname}
              </span> */}
            </RowWrapper>
            <ViewCounter
              view={data.view}
              renameLike='좋아요'
              like={data.likes}
            />
          </CommunityWrapper>
        </>
      </SectionWrapper>
    </ColumnWrapper>
  );
};

export default CommunityCard;