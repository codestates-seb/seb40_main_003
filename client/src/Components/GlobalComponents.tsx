import styled from "@emotion/styled";
import { overKillo } from "../utils/controller";
import { ColumnWrapper } from "./main/Wrapper";
import { SpaceEnd } from "./product/ProductCard";

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

  flex-wrap: wrap;
`;

// 태그 앨리먼트
export const SigTag = styled.div`
  padding: 2px 4px;
  background-color: var(--main);
  color: var(--pure-white);
  font-weight: var(--sub);
  text-align: center;
  min-width: 33px;
  border-radius: 4px 0px;
  margin: 4px 4px 4px 0px;
  &.ghost {
    color: var(--pure-white);
    font-weight: var(--sub);
    text-align: center;
    min-width: 33px;
    border-radius: 4px 0px;
    margin: 4px 4px 4px 0px;
  }

  &.active {
    color: var(--main);
    background-color: var(--pure-white);
    border: 1px solid var(--main);
  }
  &.disabled {
    color: var(--line-black);
    background-color: var(--pure-white);
    border: 1px solid var(--line-black);
  }
`;
// 이미지 랩퍼
export const ImageWrapper = styled.img`
  width: ${(props: imageWrapperProps) => (props.size ? props.size : "36")}px;
  height: ${(props: imageWrapperProps) => (props.size ? props.size : "36")}px;
  background-color: var(--bg-gray);
  overflow: hidden;
  border-radius: ${(props: imageWrapperProps) =>
    props.circle ? `${props.size}px` : "8px 0px"};
  display: block;
  object-fit: cover;
  margin-right: 16px;
`;

type imageWrapperProps = {
  src: string;
  size?: "16" | "36" | "56" | "66" |"100";
  alt: string;
  circle?: boolean;
};


// 커뮤니티 이미지 랩퍼
const BambooImageElem = styled.img`
  /* width: ${(props: BambooimageWrapperProps) =>
    props.size ? props.size : "100"}px;
  height: ${(props: BambooimageWrapperProps) =>
    props.size ? props.size : "100"}px; */
  background-color: var(--bg-gray);
  overflow: hidden;
  height: 265px;
  border-radius: 8px 0px;
  display: block;
  object-fit: cover;
  margin-right: 16px;
  padding-bottom: 5px;
`;

type BambooimageWrapperProps = {
  src: string;
  size?: "36" | "56" | "100";
  alt: string;
};

export const BambooImageWrapper = ({
  size = "100",
  src,
  alt,
}: BambooimageWrapperProps) => {
  return <BambooImageElem src={src} size={size} alt={alt} />;
};

// 좋아요 카운트
type ViewCounterProps = {
  view?: number;
  like?: number;
  renameView?: string;
  renameLike?: string;
};
const ViewCounterWrapper = styled.div`
  display: flex;
  max-width: 100px;
  justify-content: space-between;
`;
const IconElem = styled.img`
  width: 16px;
  height: 16px;
`;
const ViewCounterColumn = styled.div`
  display: flex;
  flex-direction: row;
`;

export const ViewCounter = ({
  view,
  like,
  renameView = "조회수",
  renameLike = "찜",
}: ViewCounterProps) => {
  return (
    <ViewCounterWrapper>
      {view && (
        <ViewCounterColumn className="text-align-center mr-16">
          <SubText className="medium font-gray mr-8">{renameView}</SubText>
          <SubText className="font-gray ">{overKillo(view)}</SubText>
        </ViewCounterColumn>
      )}
      {like && (
        <ViewCounterColumn className="text-align-center ">
          <SubText className="medium font-gray mr-8">{renameLike}</SubText>
          <SubText className="font-gray">{overKillo(like)}</SubText>
        </ViewCounterColumn>
      )}
    </ViewCounterWrapper>
  );
};

export const ProfileCardWrapper = styled.div`
  width: 100%;
  padding: 8px 0;
  border-bottom: 1px solid var(--line-light-gray);
  display: flex;
  align-items: center;
`;

export const CardWrapper = styled.div`
  width: 100%;
  padding: 8px 0;
  border-top: 1px solid var(--line-light-gray);
  display: flex;
  align-items: center;
`;

// 프로필
type ProfileCardTypes = {
  size?: "16"|"36"|"56"|"66"|"100";
  src: string;
  alt: string;
  name: string;
  location: string;
  circle?:boolean;
};
export const ProfileCard = (props: ProfileCardTypes) => {
  // 비구조화할당
  const { size = "36", src, alt, name, location, circle=false } = props;
  return (
    <ProfileCardWrapper>
      <ImageWrapper
        src={src}
        alt={alt}
        size={size}
        className="mr-16"
        circle={circle}
      ></ImageWrapper>
      <ColumnWrapper>
        <span className="medium">{name}</span>
        <span className="sub font-gray">{location}</span>
      </ColumnWrapper>
    </ProfileCardWrapper>
  );
};

// 프로필 반려식물
export const ProfilePlantCardWrapper = styled.div`
  width: 100%;
  padding: 8px 0;
  border: 1px solid var(--line-light-gray);
  display: flex;
  align-items: center;
`;
type ProfilePlantCardTypes = {
  size?: string;
  src: string;
  alt: string;
  name: string;
  type: string;
  age: number;
};
export const ProfilePlantCard = (props: ProfilePlantCardTypes) => {
  // 비구조화할당
  const { size, src, alt, name, type, age } = props;
  return (
    <ProfilePlantCardWrapper>
      <ImageWrapper
        src={src}
        alt={alt}
        size={size === "sm" ? "16" : "36"}
        className="mr-16"
      ></ImageWrapper>
      <ColumnWrapper>
        <span className="medium">{name}</span>
        <span className="sub font-gray">{type}</span>
        <div className="sub font-gray ml-54">{age}년차</div>
      </ColumnWrapper>
      <SpaceEnd></SpaceEnd>
    </ProfilePlantCardWrapper>
  );
};

const GlobalComponents = () => {};

export default GlobalComponents;
