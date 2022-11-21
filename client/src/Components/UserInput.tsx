import styled from "@emotion/styled";
import { RowWrapper, SectionWrapper } from "./Wrapper";
import { KeyboardEvent } from "react";
import React, { useState } from "react";
import { SigTag } from "./GlobalComponents";

const Input = styled.input`
  width: 100%;
  height: 30px;
`;

type CommentInputProps = {
  onSubmit: (form: { description: string }) => void;
};

function CommentInput({ onSubmit }: CommentInputProps) {
  const [form, setForm] = useState({
    description: "",
  });

  const { description } = form;

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = (e: React.MouseEvent) => {
    e.preventDefault();
    onSubmit(form);
    setForm({
      description: "",
    });
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(form);
      setForm({
        description: "",
      });
    }
  };

  return (
    <SectionWrapper width={100}>
      <RowWrapper className='align-center'>
        <Input
          name='description'
          value={description}
          onChange={onChange}
          onKeyPress={handleKeyPress}
          placeholder='댓글을 입력해주세요.'
        />
        <SigTag
          width={30}
          height={20}
          onClick={handleSubmit}
          className='ml--40 z-index-9999 cursor'
        >
          작성
        </SigTag>
      </RowWrapper>
    </SectionWrapper>
  );
}

export default CommentInput;
