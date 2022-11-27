import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";

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
          <span className="sub bold font-gray mb-3">{name}</span>
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
                <p className="font-gray medium">{text}</p>
              )}
            </div>
          </>
        </GridWrapper>
      </RowWrapper>
      <GridWrapper>
        <ColumnWrapper>
          <div className="sub font-gray mb-6">{getDateAgo(createdAt)}</div>
          {String(author) === String(user?.memberId) ? (
            <CommentButtonWrapper>
              {editable ? (
                <span
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
                </span>
              ) : (
                <>
                  <span
                    onClick={() => editOn()}
                    onKeyDown={handleKeyDown}
                    className="sub font-gray cursor"
                  >
                    수정
                  </span>
                  <span
                    className="sub font-gray cursor"
                    onClick={() => {
                      if (window.confirm("댓글을 삭제 하시겠습니까?")) {
                        axiosPrivate
                          .delete(
                            `/community/${communityId}/comment/${commentId}`
                          )
                          .then((res) => {
                            console.log(res);
                          });
                      }
                    }}
                  >
                    삭제
                  </span>
                </>
              )}
            </CommentButtonWrapper>
          ) : null}
        </ColumnWrapper>
      </GridWrapper>
    </CommentCardWrapper>
  );
};
