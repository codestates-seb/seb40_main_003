import styled from "@emotion/styled";


const MainLeftWrapper = styled.aside`
  min-width: 164px;
  min-height: 600px;
  display: flex;
  flex-direction: column;
  background-color: #333;
  min-height: 600;
`;
export const MainCenterWrapper = styled.section`
  display: flex;
  flex-direction: column;
`;
export const MainRightWrapper = styled.aside`
  min-width: 298px;
  display: flex;
  flex-direction: column;
  min-height: 600px;
  background-color: #333;
`;
export const MainContentContainer  = styled.div`
  display: flex;
  flex-direction: row;
`
export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`

export default MainLeftWrapper;
