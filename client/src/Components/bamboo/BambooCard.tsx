import styled from "@emotion/styled";
import { ImageWrapper, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper } from "../main/Wrapper";
import {SpaceEnd,DescriptionColumnWrapper} from"../../Components/product/ProductCard"


const BambooWrapper = styled.div`
  width: 100%;
  min-width: 312px;
  max-width: 730px;
  padding: 24px 8px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid var(--line-light-gray);
`;



const BambooCard = ({ data }: any) => {
  return (
    <BambooWrapper>
      <ColumnWrapper>
          <span className='medium font-main'>{data.title}</span>
          <span className='medium'>{data.content}</span>
          </ColumnWrapper>
        {/* <ImageWrapper
          size={"100"}
          src={data.image[0].imgUrl}
          alt={`상품명 ${data.title}의 대표이미지`}
        /> */}
    </BambooWrapper>
  );
};

export default BambooCard;