import styled from "@emotion/styled";
import { BambooImageWrapper, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper, SectionWrapper } from "../Wrapper";
import { SpaceEnd } from "../../Components/product/ProductCard";

const BambooWrapper = styled.div`
  border-bottom: 1px solid var(--line-light-gray);
  padding: 5px 0;
`;

const BambooCard = ({ data }: any) => {
  return (
    <BambooWrapper>
      <ColumnWrapper>
      <SectionWrapper title={data.title} content={data.content}>
          {data.image[0]?<BambooImageWrapper
          size={"100"}
          src={data.image[0].imgUrl}
          alt={`상품명 ${data.title}의 대표이미지`}
        />:<></>}
        </SectionWrapper>
        <SpaceEnd>
          <ViewCounter view={data.view} like={data.likes}/>
        </SpaceEnd>
      </ColumnWrapper>
      </BambooWrapper>

        // <SectionWrapper title={data.title} content={data.content}>
        // {data.image[0] ? (
        //   <BambooImageWrapper
        //     size={"100"}
        //     src={data.image[0].imgUrl}
        //     alt={`상품명 ${data.title}의 대표이미지`}
        //   />
        // ):<></>}
        // </SectionWrapper>
        //   <ViewCounter view={data.view} like={data.likes} />
      
  );
};

export default BambooCard;
