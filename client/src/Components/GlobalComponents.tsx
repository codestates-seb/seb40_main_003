import styled from "@emotion/styled";

// 버튼앨리먼트
export const SigButton = styled.button`
  padding: 16px 0;
  background-color: var(--main);
  color: var(--pure-white);
  font-weight: var(--bold);
  text-align: center;
  min-width: 173px;
  border-radius: 16px 0 16px 0;
  cursor: pointer;
  &.ghost {
    color: var(--main);
    background-color: var(--pure-white);
    border: 2px solid var(--main);
  }
  &.disable {
    background-color: var(--line-gray);
    color: var(--pure-white);
  }
`;
export const SubText = styled.span`
  display: block;
  font-size: var(--sub-font-size);
`;

// 태그 앨리먼트
export const SigTag = styled.span`
  padding: 2px 4px;
  background-color: var(--main);
  color: var(--pure-white);
  font-weight: var(--sub);
  text-align: center;
  min-width: 33px;
  border-radius: 4px 0px;
  &.variant2 {
    color: var(--pure-white);
    background-color: var(--line-gray);
  }
  &.variant3 {
    color: var(--main);
    background-color: var(--pure-white);
    border: 1px solid var(--main);
  }
  &.variant4 {
    color: var(--line-gray);
    background-color: var(--pure-white);
    border: 1px solid var(--line-gray);
  }
`;

// 이미지 랩퍼
const ImageElem = styled.img`
  width: ${(props: imageWrapperProps) => (props.size ? props.size : "36")}px;
  height: ${(props: imageWrapperProps) => (props.size ? props.size : "36")}px;
  background-color: var(--bg-gray);
  overflow: hidden;
  border-radius: 8px 0px;
  display: block;
`;

type imageWrapperProps = {
  src: string;
  size?: "36" | "56" | "100";
  alt: string;
};

export const ImageWrapper = ({ size = "36", src, alt }: imageWrapperProps) => {
  return <ImageElem src={src} size={size} alt={alt} />;
};

// 좋아요 카운트
type ViewCounterProps = {
  view?: number;
  like?: number;
};
const ViewCounterWrapper = styled.div`
  width: 60px;
  height: 16px;
  display: flex;
  justify-content: space-between;
`;
const IconElem = styled.img`
  width: 16px;
  height: 16px;
`;

export const ViewCounter = ({ view, like }: ViewCounterProps) => {
  return (
    <ViewCounterWrapper>
      {view ? (
        <div>
          <SubText className="medium font-gray">조회수</SubText>
          <SubText className="ml-4 font-gray">{view}</SubText>
        </div>
      ) : null}
      {like ? (
        <div>
          <SubText className="medium font-gray">좋아요</SubText>
          <SubText className="ml-4 font-gray">{like}</SubText>
        </div>
      ) : null}
    </ViewCounterWrapper>
  );
};

// ㄴㄴ
const GlobalComponents = () => {};

export default GlobalComponents;
