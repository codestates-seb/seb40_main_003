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
  background-color: aliceblue;
`;

const Title = styled.span`
font-size: 15px;
width: fit-content;
`;

const CareCard = ({ data }: any) => {
    return (
        <>asdf
    <CardWrapper>
      <LeftWrapper>
      <Title>{data.image}</Title>
        </LeftWrapper>
        <RightWrapper>
            <span className="medium">{data.adress}</span>
            <span className="sub">{data.gender}</span>

        </RightWrapper>
      {}
    </CardWrapper>
        </>
    );
  };
  
  export default CareCard;