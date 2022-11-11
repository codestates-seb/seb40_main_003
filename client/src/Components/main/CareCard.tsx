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
      <LeftWrapper>왼쪽
        <span>{data[0]}</span>
        </LeftWrapper>
        <RightWrapper>오른쪽
            <span className="medium">{data.address}</span>
            <span className="sub">{data.member.gender}</span>

        </RightWrapper>
      {}
    </CardWrapper>
        </>
    );
  };
  
  export default CareCard;