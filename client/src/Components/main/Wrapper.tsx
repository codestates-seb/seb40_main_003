import styled from "@emotion/styled";



// 전체를 감싸는 컨테이너, 반응형 제공
export const MainContentContainer  = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
    @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
  }
`
// 내용 영역(모바일~테블릿 크기까지 커짐과 유사)
export const MainCenterWrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 312px;
  max-width: 730px;
  padding: 24px;
  margin-bottom: 156px;
  border: 1px solid var(--line-light-gray);
  border-radius: var(--sig-border-16);
  @media screen and (max-width: 1024px) {
    margin-bottom: 156px;
  }
`;
export const MainRightWrapper = styled.aside`
  min-width: 298px;
  display: flex;
  margin-left: 18px;
  flex-direction: column;
  background-color: var(--pure-white);
  padding: 16px 24px;

  @media screen and (max-width: 1024px) {
    margin-left: 0;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    bottom: 52px;
    align-items: center;
    border-top: 1px solid var(--line-light-gray);
  }
`;

const MainLeftWrapper = styled.aside`
  min-width: 164px;
  min-height: 600px;
  background-color: #333;
  min-height: 600;
`;
export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
`


export default MainLeftWrapper;
