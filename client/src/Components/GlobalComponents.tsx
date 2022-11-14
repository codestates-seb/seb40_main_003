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

// 태그 랩퍼
export const TagWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
`

// 태그 앨리먼트
export const SigTag = styled.span`
padding: 2px 4px;
background-color: var(--main);
color: var(--pure-white);
font-weight: var(--sub);
text-align: center;
min-width: 33px;
border-radius: 4px 0px;
margin: 4px 4px 4px 0px;
&.ghost{
  color: var(--pure-white);
  background-color: var(--font-gray);
}
&.active{
  color: var(--main);
  background-color: var(--pure-white);
  border: 1px solid var(--main);
}
&.disabled{
  color: var(--line-black);
  background-color: var(--pure-white);
  border: 1px solid var(--line-black);
}
`
// 이미지 랩퍼
const ImageElem = styled.img`
  width: ${(props: imageWrapperProps) => (props.size ? props.size : "36")}px;
  height: ${(props: imageWrapperProps) => (props.size ? props.size : "36")}px;
  background-color: var(--bg-gray);
  overflow: hidden;
  border-radius: 8px 0px;
  display: block;
  object-fit : cover;
  margin-right: 16px;
`;

type imageWrapperProps = {
  src: string;
  size?: "36" | "56" | "100";
  alt: string;
};

export const ImageWrapper = ({ size = "36", src, alt }: imageWrapperProps) => {
  return <ImageElem src={src} size={size} alt={alt} />;
};

// 커뮤니티 이미지 랩퍼
const BambooImageElem = styled.img`
  /* width: ${(props: BambooimageWrapperProps) => (props.size ? props.size : "36")}px;
  height: ${(props: BambooimageWrapperProps) => (props.size ? props.size : "36")}px; */
  background-color: var(--bg-gray);
  overflow: hidden;
  width: 730px;
  height: 265px;
  border-radius: 8px 0px;
  display: block;
  object-fit : cover;
  margin-right: 16px;
`;

type BambooimageWrapperProps = {
  src: string;
  size?: "36" | "56" | "100";
  alt: string;
};

export const BambooImageWrapper = ({ size = "100", src, alt }: BambooimageWrapperProps) => {
  return <BambooImageElem src={src} size={size} alt={alt} />;
};

// 좋아요 카운트
type ViewCounterProps = {
  view?: number;
  like?: number;
};
const ViewCounterWrapper = styled.div`
  display: flex;
  height: 100%;
  justify-content: space-between;
`;
const IconElem = styled.img`
  width: 16px;
  height: 16px;
`;
const ViewCounterColumn = styled.div`
  display: flex;
  flex-direction: column;
`

export const ViewCounter = ({ view, like }: ViewCounterProps) => {
  return (
    <ViewCounterWrapper>
      {view&&(
        <ViewCounterColumn className="text-align-center mr-16">
          <SubText className="medium font-gray">조회수</SubText>
          <SubText className="font-gray">{view}</SubText>
        </ViewCounterColumn>
      )}
      {like && (
        <ViewCounterColumn className="text-align-center mr-16">
          <SubText className="medium font-gray">찜</SubText>
          <SubText className="font-gray">{like}</SubText>
        </ViewCounterColumn>
      )}
    </ViewCounterWrapper>
  );
};

// 스켈레톤

// ㄴㄴ
const GlobalComponents = () => {};

export default GlobalComponents;
