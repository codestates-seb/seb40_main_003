import styled from "@emotion/styled";
import {  SectionWrapper, SpaceBetween } from "./Wrapper";
import { useRef, useState } from "react";
import { SigTag } from "./GlobalComponents";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";


type props = {
  url: string | undefined;
};

export const Textarea = styled.textarea`
  width: 100%;
  height: 35px;
  border: none;
  resize: none;
  padding-right: 50px;
`;

const CommentInput = (props: props) => {
  const [value, setValue] = useState("");
  const axiosPrivate = useAxiosPrivate();
  const textAreaRef = useRef<HTMLTextAreaElement>(null)

  const handleSubmit = async () => {
    axiosPrivate
      .post(
        `/community/${props.url}/comment`,
        JSON.stringify({
          content: String(value),
        })
      ).then(() => {
        window.location.reload();
      });
  };

  return (
    <SectionWrapper width={100}>
      <SpaceBetween className="align-center">
        <Textarea
        className="comment-height"
          ref={textAreaRef}
          value={value}
          minLength={2}
          maxLength={300}
          onChange={(e) => setValue(e.target.value)}
          placeholder="댓글을 입력해주세요."
          onBlur={(e) => {
            if (e.target.value.length < 2 || e.target.value.length > 300) {
              alert("2글자 이상, 300글자 이하로 입력하세요.")
            }
          }} 
          />
        <SigTag
          as={"button"}
          width={36}

          height={20}
          onClick={()=>{
            if(value.length<2 || value.length>300){
              alert("2글자 이상, 300자 이하로 작성해주세요.")
            }else{
              handleSubmit()
            }
            
          }}
          className="inputHoverButton mt-8 z-index cursor"
        >
          작성
        </SigTag>
      </SpaceBetween>
    </SectionWrapper>
  );
};

export default CommentInput;
