import styled from "@emotion/styled";
import { RowWrapper, SectionWrapper } from "./Wrapper";
import { useState } from "react";
import { SigTag } from "./GlobalComponents";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

type props = {
  url: string | undefined
};

const Textarea = styled.textarea`
  width: 100%;
  height: 35px;
  border: none;
  resize: none;
  padding-right: 50px;
`;

const CommentInput = (props: props) => {
  const [value, setValue] = useState('');
  const axiosPrivate = useAxiosPrivate();
  
  const handleSubmit = async () => {
    axiosPrivate.post(`/community/${props.url}/comment`, JSON.stringify({
      "content": String(value),
    }))
  }
  
  return (
    <SectionWrapper width={100}>
      <RowWrapper className='align-center'>
        <Textarea
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder='댓글을 입력해주세요.'
          />
        <SigTag
          as = {"button"}
          width={30}
          height={20}
          onClick={handleSubmit}
          className='ml--45 z-index-9999 cursor'
          >
          작성
        </SigTag>
      </RowWrapper>
    </SectionWrapper>
  );
}

export default CommentInput;

