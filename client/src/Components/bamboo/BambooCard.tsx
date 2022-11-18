import styled from "@emotion/styled";
import { ImageWrapper, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper, RowWrapper, SectionWrapper } from "../Wrapper";

export const BambooWrapper = styled.footer`
  display: flex;
  justify-content: space-between;
`;

const BambooCard = ({ data }: any) => {
  return (
    <ColumnWrapper>
      <SectionWrapper title={data.title} content={data.content} width={100}>
        <>
          {data.image[0] ? (
            <ImageWrapper
              className='bambooImage mb-16 mt-8'
              size={"112"}
              src={data.image[0].imgUrl}
              alt={`상품명 ${data.title}의 대표이미지`}
              loading="lazy"
            />
          ) : (
            <></>
          )}

          <BambooWrapper>
            <RowWrapper>
              <span className='sub font-gray'>{data.createdAt}</span>
              <span className='sub font-gray ml-16'>
                {data.member.nickname}
              </span>
            </RowWrapper>
            <ViewCounter
              view={data.view}
              renameLike='좋아요'
              like={data.likes}
            />
          </BambooWrapper>
        </>
      </SectionWrapper>
    </ColumnWrapper>
  );
};

export default BambooCard;
