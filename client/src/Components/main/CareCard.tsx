import styled from "@emotion/styled";
import { ImageWrapper, ViewCounter } from "../GlobalComponents";

const CardWrapper = styled.div`
  width: 100%;
  min-width: 312px;
  max-width: 730px;
  padding: 24px 8px;
  display: flex;
  align-items: center;
  border-bottom: 1px solid var(--line-light-gray);
`;
const LeftWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
`;
const RightWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Price = styled.span`
  display: block;
  color: var(--font-main);
`;
const Title = styled.span`
font-size: 15px;
width: fit-content;
`;

const CareCard = ({ data }: any) => {
    return (
        <>
    <CardWrapper>
      <LeftWrapper>

        </LeftWrapper>
        <RightWrapper>
          <span>{``}</span>
          <p className="sub">{}</p>
          <Price className="bold h4">{}</Price>
        </RightWrapper>
      {}
    </CardWrapper>
        </>
    );
  };
  
  export default CareCard;