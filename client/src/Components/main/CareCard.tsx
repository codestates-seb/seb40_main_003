import styled from "@emotion/styled";
import { ImageWrapper, ViewCounter } from "../GlobalComponents";

const CardWrapper = styled.div`
background-color: aliceblue;
  width: 100%;
  min-width: 312px;
  max-width: 730px;
  padding: 24px 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--line-light-gray);
`;
const LeftWrapper = styled.div`
background-color: yellow;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
const RightWrapper = styled.div`
background-color: yellowgreen;
  display: flex;
  flex-direction: column;
`;
const DescriptionColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;
const Title = styled.span`
background-color: aquamarine;
font-size: 15px;
width: fit-content;
`;

const CareCard = ({ data }: any) => {
    console.log(data)
  return (
        <>
    <CardWrapper>
      <LeftWrapper>
      <ImageWrapper
          size={"100"}
          src={data.member.image.imgUrl}
          alt={`상품명 ${data.member.name}의 대표이미지`}
        />
        </LeftWrapper>
        <RightWrapper>
            <span>{data.member.name} / {data.member.age}세 / {data.member.gender}</span>
            <span>{data.simpleContent}</span>
            <span>{data.techTagId}</span>
            <span className="medium">{data.address}</span>
            <ViewCounter view={data.view} like={data.like} />
        </RightWrapper>
        <DescriptionColumnWrapper>
        <ViewCounter view={data.view} like={data.like} />
      </DescriptionColumnWrapper>
    </CardWrapper>
        </>
    );
  };
  
  export default CareCard;