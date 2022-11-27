import styled from "@emotion/styled";
import { useRef, useState } from "react";

import { UserStateType } from "../Recoil/atoms/user";
import { getDateAgo } from "../utils/controller";
import {
  ImageWrapper,
  SigTag,
  TagWrapper,
} from "../Components/GlobalComponents";
import { ColumnWrapper, RowWrapper } from "./Wrapper";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
export const CommentCardWrapper = styled.div`
  width: 100%;
  padding: 16px 16px;
  margin-top: 8px;
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
  commentId?: string;
  communityId?: string;
};

export const CommentCard = (props: CommentCardTypes) => {
  const axiosPrivate = useAxiosPrivate();
  const {
    size,
    src,
    alt,
    name,
    createdAt,
    content,
    tag,
    user,
    author,
    commentId,
    communityId,
  } = props;
  const ref = useRef<any>(null);
  const [text, setText] = useState(content);
  const [editable, setEditable] = useState(false);

  const editOn = () => {
    setEditable(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  };
  const handleKeyDown = () => {
    setEditable(!editable);
  };

  // 비구조화할당
  return (
    <CommentCardWrapper>
      <RowWrapper className="align-center">
        {src && alt !== undefined ? (
          <ImageWrapper
            src={src}
            alt={alt}
            size={size === "sm" ? "16" : "36"}
            loading="lazy"
          />
        ) : null}
        <GridWrapper>
          <span className="sub bold font-gray mb-4">{name}</span>
          {tag ? (
            <TagWrapper>
              {tag.map((e) => {
                return <SigTag key={e.techId}>{e.name}</SigTag>;
              })}
            </TagWrapper>
          ) : null}
          <>
            <div ref={ref}>
              {editable ? (
                <input
                  autoFocus
                  type="text"
                  value={text}
                  onChange={(e) => handleChange(e)}
                  onBlur={(e) => {
                    if (editable) {
                      axiosPrivate
                        .patch(
                          `/community/${communityId}/comment/${commentId}`,
                          {
                            content: text,
                          }
                        )
                        .then(() => setEditable(false));
                    }
                  }}
                />
              ) : (
                <p className="font-black medium">{text}</p>
              )}
            </div>
          </>
        </GridWrapper>
      </RowWrapper>
      <GridWrapper>
        <ColumnWrapper>
          <div className="sub font-gray mb-6 ml-4">{getDateAgo(createdAt)}</div>
          {/* 유저와 작성자가 같다면 */}
          {String(author) === String(user?.memberId) ? (
            <CommentButtonWrapper>
              {editable ? (
                <>
                  <button
                    className="sub font-gray cursor mr-8"
                    // 수정버튼
                    onClick={() => {
                      if (editable) {
                        axiosPrivate
                          .patch(
                            `/community/${communityId}/comment/${commentId}`,
                            {
                              content: text,
                            }
                          )
                          .then(() => setEditable(false));
                      }
                    }}
                  >
                    완료
                  </button>
                  <button
                    className="sub font-gray cursor"
                    onClick={() => {
                      // 댓글 삭제버튼
                      if (window.confirm("댓글을 삭제 하시겠습니까?")) {
                        axiosPrivate.delete(
                          `/community/${communityId}/comment/${commentId}`
                        );
                      }
                    }}
                  >
                    삭제
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => editOn()}
                    onKeyDown={handleKeyDown}
                    className="sub font-gray cursor mr-8"
                  >
                    수정
                  </button>
                  <button
                    className="sub font-gray cursor"
                    onClick={() => {
                      if (window.confirm("댓글을 삭제 하시겠습니까?")) {
                        axiosPrivate.delete(
                          `/community/${communityId}/comment/${commentId}`
                        );
                      }
                    }}
                  >
                    삭제
                  </button>
                </>
              )}
            </CommentButtonWrapper>
          ) : null}
        </ColumnWrapper>
      </GridWrapper>
    </CommentCardWrapper>
  );
};
