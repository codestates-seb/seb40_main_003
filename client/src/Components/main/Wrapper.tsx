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
  padding: 36px;
  border: 1px solid var(--line-gray);
`;
export const MainRightWrapper = styled.aside`
  min-width: 298px;
  display: flex;
  margin-left: 18px;
  flex-direction: column;
  min-height: 600px;
  background-color: #333;
  padding: 16px;

  @media screen and (max-width: 1024px) {
    min-height: 0;
    margin-left: 0;
    position: fixed;
    width: 100%;
    bottom: 52px;
    align-items: center;
  }
`;
export const BottomPlaceHolder = styled.div`
  width:100%;
  height:120px;
`

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
