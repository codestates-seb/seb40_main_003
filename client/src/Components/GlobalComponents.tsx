import styled from "@emotion/styled";
import { overKillo } from "../utils/controller";
import { ColumnWrapper, RowWrapper } from "./Wrapper";
import { UserStateType } from "../Recoil/atoms/user";

// 버튼앨리먼트
export const SigButton = styled.button`
  padding: 16px 0;
  background-color: var(--main);
  color: var(--pure-white);
  font-weight: var(--bold);
  text-align: center;
  min-width: 173px;
  border-radius: var(--sig-border-16);
  transition-duration: 300ms;
  cursor: pointer;
  &.ghost {
    color: var(--main);
    background-color: var(--pure-white);
    border: 2px solid var(--main);
  }
  &.disable {
    background-color: var(--line-gray);
    color: var(--pure-white);
    &:hover {
      background-color: var(--main);
    }
  }
`;
export const SubText = styled.span`
  display: block;
  font-size: var(--sub-font-size);
`;

// 태그 랩퍼
export const TagWrapper = styled.div`
  width: 100%;
  height: 21px;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  overflow: hidden;
  /* background-color: aliceblue; */
`;

// 태그 앨리먼트
type sigtagProps = {
  width?: number;
  height?: number;
};
export const SigTag = styled.div`
  width: ${(props: sigtagProps) => (props.width ? props.width + "px" : "auto")};
  height: ${(props: sigtagProps) =>
    props.height ? props.height + "px" : "auto"};

  padding: 2px 4px;
  background-color: var(--main);
  color: var(--pure-white);
  font-size: var(--sub-font-size);
  text-align: center;
  border-radius: var(--sig-border-4);
  padding: 2px 4px;
  margin-right: 4px;

  &.ghost {
    color: var(--main);
    background-color: var(--pure-white);
    border: 1px solid var(--main);
  }
  &.ghostgray {
    color: var(--line-black);
    background-color: var(--pure-white);
    border: 1px solid var(--line-gray);
  }
  &.disabled {
    color: var(--pure-white);
    background-color: var(--line-gray);
  }
`;
// 이미지 랩퍼
export const ImageWrapper = styled.img`
  width: ${(props: imageWrapperProps) => (props.size ? props.size : "36")}px;
  height: ${(props: imageWrapperProps) => (props.size ? props.size : "36")}px;
  min-width: ${(props: imageWrapperProps) =>
    props.size ? props.size : "36"}px;
  min-height: ${(props: imageWrapperProps) =>
    props.size ? props.size : "36"}px;
  background-color: var(--bg-gray);
  border-radius: ${(props: imageWrapperProps) =>
    props.circle ? `${props.size}px` : "8px 0px"};
  display: block;
  object-fit: cover;
  margin-right: 16px;
  &.bambooImage {
    width: 100%;
    margin-right: 0;
  }
  &.soldOut {
    opacity: 0.5;
  }
`;

type imageWrapperProps = {
  src: string;
  size?: string;
  alt: string;
  circle?: boolean;
  width?: number;
  height?: number;
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
  justify-content: flex-end;
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

type centeringWrapper = {
  pb?: number;
  pt?: number;
  borderNone?: boolean;
};
export const CenteringWrapper = styled.section`
  width: 100%;
  padding-top: ${(props: centeringWrapper) => (props.pt ? props.pt : 8)}px;
  padding-bottom: ${(props: centeringWrapper) => (props.pb ? props.pb : 8)}px;
  border-bottom: ${(props: centeringWrapper) =>
    props.borderNone ? "none" : "1px solid var(--line-light-gray)"};
  display: flex;
  align-items: center;
  &.space-between {
    justify-content: space-between;
  }
`;

// 프로필
type ProfileCardTypes = {
  size?: "16" | "36" | "56" | "66" | "100";
  src: string;
  alt: string;
  name: string;
  location: string;
  circle?: boolean;
  tag?: number;
  border?: boolean;
};
export const ProfileCard = (props: ProfileCardTypes) => {
  // 비구조화할당
  const { size = "36", src, alt, name, location, circle = false, tag } = props;
  return (
    <CenteringWrapper className="space-between" borderNone={true}>
      <RowWrapper className="align-center">
        <ImageWrapper
          src={src}
          alt={alt}
          size={size}
          className="mr-16"
          circle={circle}
        />

        <ColumnWrapper>
          <span className="medium">{name}</span>
          <span className="sub font-gray">{location}</span>
        </ColumnWrapper>
      </RowWrapper>

      {tag && <SigTag className="ghost sub">{tag}번 고용</SigTag>}
    </CenteringWrapper>
  );
};

// 프로필 반려식물
export const ProfilePlantCardWrapper = styled.div`
  max-width: 250px;
  padding: 8px;
  margin-right: 8px;
  border: 1px solid var(--line-light-gray);
  display: flex;
  align-items: center;
  border-radius: var(--sig-border-8);
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
        size={size === "sm" ? "36" : "66"}
        className="mr-16"
        loading="lazy"
      ></ImageWrapper>
      <ColumnWrapper>
        <span className="medium">{name}</span>
        <span className="sub font-gray">{type}</span>
        <div className="sub font-gray ml-54">{age}년차</div>
      </ColumnWrapper>
    </ProfilePlantCardWrapper>
  );
};

// Comment 컴포넌트, 돌봄리뷰
export const CommentCardWrapper = styled.div`
  width: 100%;
  padding: 8px;
  margin-top: 8px;
  border: 1px solid var(--line-light-gray);
  border-radius: var(--sig-border-8);
  display: flex;
`;

export const CommentButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const CommentColumnWrapper = styled.div`
  display: flex;
  justify-content: center;
`;

export type CommentCardTypes = {
  size?: string;
  src?: string;
  alt?: string;
  name?: string;
  createdAt?: string;
  content?: string;
  tag?: [{ techId: number; name: string }];
  user: UserStateType | null;
  author: number;
};
export const CommentCard = (props: CommentCardTypes) => {
  // 비구조화할당
  const { size, src, alt, name, createdAt, content, tag, user, author } = props;
  return (
    <CommentCardWrapper>
      {src && alt !== undefined ? (
        <ImageWrapper
          src={src}
          alt={alt}
          size={size === "sm" ? "16" : "36"}
          className="mr-16 mt-8"
          loading="lazy"
        />
      ) : null}

      <CommentColumnWrapper>
        <ColumnWrapper>
          <span className="sub mt-8">{name}</span>
          {tag ? (
            <TagWrapper>
              {tag.map((e) => {
                return <SigTag key={e.techId}>{e.name}</SigTag>;
              })}
            </TagWrapper>
          ) : null}
          <span className="font-gray medium">{content}</span>
        </ColumnWrapper>
        <ColumnWrapper>
          <div className="sub font-gray mt-7 mb-20">{createdAt}</div>
          <CommentEdit
            userId={user!==null?user.userId:""}
            author={author?author:""}
            callback1={undefined}
            callback2={undefined}
          />
        </ColumnWrapper>
      </CommentColumnWrapper>
    </CommentCardWrapper>
  );
};


// 댓글 수정삭제 버튼
export type CommentEditType = {
  userId: string | number | null;

  author: string | number;
  callback1?: Function;
  callback2?: Function;
};
export const CommentEdit = ({
  userId,
  author,
  callback1,
  callback2,
}: CommentEditType) => {
  return  String(userId) === String(author) ?(
    <CommentButtonWrapper>
      <span className="sub font-gray mr-8" onClick={callback1 && callback1()}>
        수정
      </span>
      <span className="sub font-gray" onClick={callback2 && callback2()}>
        삭제
      </span>
    </CommentButtonWrapper>
  ) : (
    <></>
  );
};
