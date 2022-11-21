import styled from "@emotion/styled";
import React, { useRef } from "react";
import { SigTag } from "./GlobalComponents";
import { RowWrapper, SectionWrapper } from "./Wrapper";

const CommentTextArea = styled.input`
  width: 100%;
  display: block;
  padding: 8px;
`;

type Props = {
  onChange: any;
  onSubmit: any;
};
const CommentInput = ({ onChange, onSubmit}: Props) => {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleChange = (e: any) => {
    onChange(e.target.value)
    e.preventDefault('');
  };

  return (
    <SectionWrapper width={100}>
      <RowWrapper>
        <CommentTextArea
          ref={inputRef}
          onChange={handleChange}
          type={"text"}
          placeholder='댓글을 입력해주세요'
          />
        <SigTag onClick={onSubmit}>작성</SigTag>
      </RowWrapper>
    </SectionWrapper>
  );
};

export default CommentInput;
