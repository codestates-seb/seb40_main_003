import styled from "@emotion/styled";
import { ImageWrapper, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper } from "../main/Wrapper";

import {SpaceEnd,DescriptionColumnWrapper} from"../../Components/product/ProductCard"
import { SigTag } from "../GlobalComponents";



const CardWrapper = styled.div`
/* background-color: aliceblue; */
  width: 100%;
  min-width: 312px;
  max-width: 730px;
  padding: 24px 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--line-light-gray);
`;
const CareDescription = styled.div`
  /* background-color: yellow; */
  width: 100%;
  height: 100px;
  display: flex;
  justify-content: flex-start;
  align-items: center;
`;

const TagWrapper = styled.div`
  margin: 4px;
  display: flex;
  justify-content: space-between;

`
const CareCard = ({ data }: any) => {
    console.log(data.techTag)

  return (
        <>
    <CardWrapper>
      <CareDescription>
        <ImageWrapper
          size={"100"}
          src={data.member.image.imgUrl}
          alt={`상품명 ${data.member.name}의 대표이미지`}
        />
        <DescriptionColumnWrapper>
          <ColumnWrapper>
              <span className="medium">{data.member.name} / {data.member.age}세 / {data.member.gender}</span>
              <span>{data.simpleContent}</span>
              <span>{data.techTagId}</span>
              <span className="medium">{data.address}</span>
          </ColumnWrapper>
        </DescriptionColumnWrapper>
        <TagWrapper>
          <SigTag className="disabled">{data.techTag.techTagName}물주기</SigTag>
          <SigTag className="disabled">{data.techTag.techTagName}분재</SigTag>
          <SigTag className="disabled">{data.techTag.techTagName}병/해충</SigTag>
          <SigTag className="disabled">{data.techTag.techTagName}가지치기</SigTag>
        </TagWrapper>
        </CareDescription>
        <SpaceEnd>
          <ViewCounter view={data.view} like={data.like} />
        </SpaceEnd>
    </CardWrapper>
        </>
    );
  };
  
  export default CareCard;