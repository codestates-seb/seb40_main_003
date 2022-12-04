import styled from "@emotion/styled";
import { useRef, useState } from "react";
import defaultProfileImage from "../images/defaultProfileImage.png";
import { getDateAgo } from "../utils/controller";
import {
  ImageWrapper,
  SigTag,
  TagWrapper,
  Textarea,
} from "../Components/GlobalComponents";
import { ColumnWrapper, RowWrapper } from "./Wrapper";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import { useIsAuthor } from "../Hooks/useAuth";

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

export type CommentCardTypes = {
  size?: string;
  src?: string;
  alt?: string;
  name?: string;
  createdAt: string;
  content?: string;
  tag?: [{ techId: number; name: string }];
  author: number;
  commentId?: number;
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
    author,
    commentId,
    communityId,
  } = props;
  const isAuthor = useIsAuthor();
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [text, setText] = useState(content);
  const [editable, setEditable] = useState(false);

  const editOn = () => {
    setEditable(true);
  };
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setText(e.target.value);
  };
  const handleKeyDown = () => {
    setEditable(!editable);
  };

  return (
    <CommentCardWrapper>
      <RowWrapper>
        <ImageWrapper
          src={src ? src : defaultProfileImage}
          alt={alt ? alt : "기본이미지"}
          size={size === "sm" ? "16" : "36"}
          loading="lazy"
        />

        <ColumnWrapper>
          <div className="sub bold font-gray mb-4 width-100">{name}</div>
          {tag ? (
            <TagWrapper>
              {tag.map((e) => {
                return <SigTag key={e.techId}>{e.name}</SigTag>;
              })}
            </TagWrapper>
          ) : null}
          {editable ? (
            <Textarea
              className="comment-height width-100"
              ref={textAreaRef}
              autoFocus
              value={text}
              onChange={(e) => handleChange(e)}
              onBlur={(e) => {
                if (e.target.value.length < 2 || e.target.value.length > 300) {
                  alert("2글자 이상, 300글자 이하로 입력하세요.");
                } else {
                  if (editable) {
                    axiosPrivate
                      .patch(`/community/${communityId}/comment/${commentId}`, {
                        content: text,
                      })
                      .then(() => setEditable(false));
                  }
                }
              }}
            />
          ) : (
            <p className="font-black medium">{text}</p>
          )}
        </ColumnWrapper>
      </RowWrapper>
      <ColumnWrapper minWidth="70px">
        <div className="sub font-gray mb-6 ml-4 text-align-end">
          {getDateAgo(createdAt)}
        </div>
        {/* 유저와 작성자가 같다면 */}
        {isAuthor(author) ? (
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
                    // eslint-disable-next-line no-restricted-globals
                    location.reload();
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
                    // eslint-disable-next-line no-restricted-globals
                    location.reload();
                  }}
                >
                  삭제
                </button>
              </>
            )}
          </CommentButtonWrapper>
        ) : null}
      </ColumnWrapper>
    </CommentCardWrapper>
  );
};
