import styled from "@emotion/styled";
import { useEffect, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../Hooks/api";
import useAxiosPrivate from "../../Hooks/useAxiosPrivate";
import { UserStateType } from "../../Recoil/atoms/user";
import { getDateAgo } from "../../utils/controller";
import { ImageWrapper, SigTag, TagWrapper, ViewCounter } from "../GlobalComponents";
import { ColumnWrapper, RowWrapper, SectionWrapper } from "../Wrapper";

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

export const CommunityCommentCard = (props: CommentCardTypes) => {
  const { size, src, alt, name, createdAt, content, tag, user, author } = props;
  const ref = useRef<any>(null);
  const [text, setText] = useState(content);
  const [editable, setEditable] = useState(false);
  const axiosPrivate = useAxiosPrivate();

  const editOn = async () => {
    setEditable(true);
  }
  const handleChange = (e:any) => {
    setText(e.target.value);
    axiosPrivate.post("/community/1/comment/1", JSON.stringify({
      content: String(text),
    }))
  };
  const handleKeyDown = () => {
    setEditable(!editable);
  };
  const handleClickOutside = (e:any) => {
    if (editable === true && !ref.current.contains(e.target)) setEditable(false);
  };
  useEffect(() => {
    window.addEventListener("click", handleClickOutside, true);
  });



  // 비구조화할당
  return (
    <CommentCardWrapper>
      <RowWrapper className='align-center'>
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
                  type='text'
                  value={text}
                  onChange={(e) => handleChange(e)}
                />
              ) : (
                <p className='font-gray medium'>{text}</p>
              )}
            </div>
          </>
        </GridWrapper>
      </RowWrapper>
      <GridWrapper>
        <ColumnWrapper>
          <div className='sub font-gray mb-6'>{getDateAgo(createdAt)}</div>
          {String(author) === String(user?.memberId) ? (
            <CommentButtonWrapper>
              <span
                onClick={() => editOn()}
                onKeyDown={handleKeyDown}
                className='sub font-gray cursor'
              >
                수정
              </span>
              <span className='sub font-gray cursor'> 삭제</span>
            </CommentButtonWrapper>
          ) : null}
        </ColumnWrapper>
      </GridWrapper>
    </CommentCardWrapper>
  );
};

