import styled from "@emotion/styled";
import { overKillo } from "../utils/controller";
import { ColumnWrapper, SpaceBetween } from "./Wrapper";
import { isExpert, userState, UserStateType } from "../Recoil/atoms/user";
import defaultProfile from "../images/defaultProfileImage.png";
import { useRecoilState, useRecoilValue } from "recoil";
import { ReactComponent as Exchange } from "../images/exchangeIcon.svg";
import { useIsAuthor } from "../Hooks/useAuth";
import { useNavigate } from "react-router-dom";
import axios from "../Hooks/api";

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
  &.ghost_hover {
    color: var(--main);
    background-color: var(--pure-white);
    border: 2px solid var(--main);
    &:hover {
      background-color: var(--main);
      color: var(--pure-white);
    }
  }
  &.disable {
    background-color: var(--line-gray);
    color: var(--pure-white);
    /* &:hover {
      background-color: var(--main);
    } */
  }
  &.disable_hover {
    background-color: var(--line-gray);
    color: var(--pure-white);
    &:hover {
      background-color: var(--main);
    }
  }
`;

// 카테고리 버튼(수정 중)
export const CategoryButton = styled.button`
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
export const CategoryWrapper = styled.div`
  justify-content: center;
  align-items: center;
  flex-direction: row;
  padding: 16px;
  width: 100px;
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
  display: flex;
  align-items: center;
  text-align: center;
  border-radius: var(--sig-border-4);
  padding: 2px 4px;
  margin-right: 4px;
  &.p {
    font-size: var(--p-font-size);
  }
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
  border: 1px solid var(--line-light-gray);
  display: block;
  object-fit: cover;
  margin-right: 16px;
  &.communityImage {
    width: 100%;
    min-height: 40vh;
    height: 25vw;
    margin-right: 0;
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
      {view !== undefined && (
        <ViewCounterColumn className="text-align-center mr-16">
          <SubText className="medium font-gray mr-8">
            {renameView ? renameView : "조회수"}
          </SubText>
          <SubText className="font-gray ">{overKillo(view)}</SubText>
        </ViewCounterColumn>
      )}
      {like !== undefined && (
        <ViewCounterColumn className="text-align-center ">
          <SubText className="medium font-gray mr-8">
            {renameLike ? renameLike : "찜"}
          </SubText>
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
  location?: string;
  area?: number;
  circle?: boolean;
  tag?: number;
  border?: boolean;
  pk?: number | string | undefined;
};
export const ProfileCard = (props: ProfileCardTypes) => {
  // 비구조화할당
  const {
    size = "36",
    src,
    alt,
    name,
    location,
    area,
    circle = false,
    tag,
    pk,
  } = props;
  const [isExpertNow, setIsExpertNow] = useRecoilState(isExpert);
  const navigate = useNavigate();
  const memberId = useRecoilValue(userState);
  // 작성자와 로그인유저 확인
  const isAuthor = useIsAuthor();

  return (
    <CenteringWrapper className="space-between" borderNone={true}>
      <SpaceBetween>
        <ImageWrapper
          src={src ? src : defaultProfile}
          alt={alt ? alt : "기본프로필사진"}
          size={size}
          className="mr-16"
          circle={circle}
        />

        <ColumnWrapper>
          <span className="medium h4">{name}</span>
          {location && <span className="sub font-gray">{location}</span>}
          {area && <span className="font-gray">{area}</span>}

          {isAuthor(pk) && (
            <SigTag
              as={"button"}
              className={
                isExpertNow
                  ? "ghostgray mt-8 p disableIcon"
                  : "ghost mt-8 p activeIcon"
              }
              onClick={() => {
                if (isExpertNow) {
                  setIsExpertNow((prev) => !prev);
                  memberId
                    ? navigate(`/profile/${memberId.memberId}`)
                    : navigate("/login");
                } else {
                  axios
                    .get(`/experts/is-expert/${memberId?.memberId}`)
                    .then((res) => {
                      setIsExpertNow((prev) => !prev);
                      navigate(`/caring/${res.data.expertId}`);
                    })
                    .catch((err) => {
                      if(window.confirm("전문가가 아닙니다 전문가등록을 하시겠습니까?")){
                        alert("등록으로 보내3")
                      }
                    });
                }
              }}
            >
              <Exchange height={"16px"} width={"16px"} className="mb-2 mr-4" />
              {isExpertNow ? "식집사로 전환" : "전문가로 전환"}
            </SigTag>
          )}
        </ColumnWrapper>
      </SpaceBetween>

      {tag !== undefined && <SigTag className="ghost p">{tag}번 고용</SigTag>}
    </CenteringWrapper>
  );
};

// Comment 컴포넌트, 돌봄리뷰
export const CommentCardWrapper = styled.div`
  width: 100%;
  padding: 6px 10px;
  margin-top: 16px;
  border: 1px solid var(--line-light-gray);
  border-radius: var(--sig-border-8);
  display: flex;
  justify-content: space-between;
`;

export const CommentButtonWrapper = styled.div`
  display: flex;
  justify-content: space-between;
`;

export const GridWrapper = styled.div`
  display: grid;
  align-content: space-between;
`;

export type CommentCardTypes = {
  size?: string;
  src?: string;
  alt?: string;
  name?: string;
  createdAt?: string | any;
  content?: string;
  tag?: [{ techId: number; name: string }];
  user: UserStateType | null;
  author: number;
};
