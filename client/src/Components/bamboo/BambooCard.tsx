import styled from "@emotion/styled";
import { BambooImageWrapper, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper } from "../main/Wrapper";
import {SpaceEnd} from"../../Components/product/ProductCard"


const BambooWrapper = styled.div`
  padding: 24px 22px;
  display: flex;
  align-items: center;
  justify-content: flex-start;
  border-bottom: 1px solid var(--line-light-gray);
`;




const BambooCard = ({ data }: any) => {
  console.log(data);
  
  return (
    <BambooWrapper>
      <ColumnWrapper>
          <span className='medium font-main mb-3'>{data.title}</span>
          <span className='sub font-gray mb-20'>{data.content}</span>
          {data.image?<BambooImageWrapper
          size={"100"}
          src={data.image[0].imgUrl}
          alt={`상품명 ${data.title}의 대표이미지`}
        />:null}
        <SpaceEnd>
          <ViewCounter view={data.view} like={data.likes}/>
        </SpaceEnd>
          </ColumnWrapper>
    </BambooWrapper>
  );
};

export default BambooCard;