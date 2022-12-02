import styled from "@emotion/styled";
import { RowWrapper, SectionWrapper } from "./Wrapper";
import { useRef, useState } from "react";
import { SigTag } from "./GlobalComponents";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import { useResetRecoilState } from "recoil";
import { userState } from "../Recoil/atoms/user";

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
      <RowWrapper className="align-center">
        <Textarea
        className="width-100 comment-height"
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
          width={30}
          height={20}
          onClick={()=>{
            if(value.length<2 || value.length>300){
              alert("2글자 이상, 300자 이하로 작성해주세요.")
            }else{
              handleSubmit()
            }
            
          }}
          className="ml--45 z-index-9999 cursor"
        >
          작성
        </SigTag>
      </RowWrapper>
    </SectionWrapper>
  );
};

export default CommentInput;
