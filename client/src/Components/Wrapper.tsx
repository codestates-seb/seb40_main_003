import styled from "@emotion/styled";
import { CenteringWrapper, SigTag, TagWrapper } from "./GlobalComponents";

// 전체를 감싸는 컨테이너, 반응형 제공
export const MainContentContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  background-color: var(--bg-gray);
  min-height: 100vh;
  padding-bottom: 36px;
  margin-top: 52px;
  @media screen and (max-width: 1024px) {
    flex-direction: column;
    align-items: center;
    padding-bottom: 156px;
  }
`;
// 내용 영역(모바일~테블릿 크기까지 커짐과 유사)
export const MainCenterWrapper = styled.main`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-width: 312px;
  min-height: 80vh;
  max-width: 730px;
  padding: 24px;
  /* margin-bottom: 156px; */
  background-color: var(--pure-white);
  border: 1px solid var(--line-light-gray);
  border-radius: var(--sig-border-16);
  /* @media screen and (max-width: 1024px) {
    margin-bottom: 156px;
  } */
`;
export const MainRightWrapper = styled.aside`
  width: 298px;
  max-height: 50vh;
  display: flex;
  margin-left: 18px;
  flex-direction: column;
  background-color: var(--pure-white);
  padding: 16px 24px;
  position: sticky;
  top: 70px;
  border-top: 1px solid var(--line-light-gray);
  display: ${(props) => !props.children && "none"};

  @media screen and (max-width: 1024px) {
    margin: 0;
    flex-direction: row;
    justify-content: space-between;
    position: fixed;
    width: 100%;
    top: auto;
    bottom: 52px;
    align-items: center;
    border-top: 1px solid var(--line-light-gray);
  }
`;
// 글쓰기 섹션
type SectionWrapperType = {
  title?: string;
  content?: string;
  price?: number;
  tag?: [{ techTagId: number; techTagName: string }];
  children?: JSX.Element;
  width?: number;
  borderNone?: boolean;
  pb?: number;
  pt?: number;
};
export const SectionWrapper = ({
  title,
  content,
  tag,
  children,
  width,
  borderNone,
  pb = 16,
  pt = 16,
}: SectionWrapperType) => {
  return (
    <CenteringWrapper
      pt={pt}
      pb={pb}
      borderNone={borderNone ? borderNone : false}
    >
      <ColumnWrapper width={width}>
        {title ? <h2 className="bold font-main">{title}</h2> : null}
        {content ? <p className="mt-8 text-overflow3">{content}</p> : null}
        {tag ? (
          <TagWrapper>
            <>
              {tag
                ? tag.map((e) => {
                    return (
                      <SigTag className="sub" key={e.techTagId}>
                        {e.techTagName}
                      </SigTag>
                    );
                  })
                : null}
            </>
          </TagWrapper>
        ) : null}
        {children && children}
      </ColumnWrapper>
    </CenteringWrapper>
  );
};

const MainLeftWrapper = styled.aside`
  min-width: 164px;
  min-height: 600px;
  background-color: #333;
  min-height: 600;
`;
type columnWrapperType = {
  width?: number;
  center?: boolean;
};
export const ColumnWrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: ${(props: columnWrapperType) =>
    props.width ? `${props.width}%` : "auto"};
  align-items: ${(props: columnWrapperType) =>
    props.center ? `center` : "auto"};
  justify-content: ${(props: columnWrapperType) =>
    props.center ? `center` : "auto"};
`;
export const SpaceEnd = styled.div`
  display: flex;
  flex-direction: column;
  align-self: end;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  &.align-center {
    align-items: center;
  }
`;
export const SpaceBetween = styled.div`
  display: flex;
  justify-content: space-between;
`;
export default MainLeftWrapper;
