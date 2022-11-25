import styled from "@emotion/styled";
import { RowWrapper, SectionWrapper } from "./Wrapper";
import { KeyboardEvent } from "react";
import React, { useState } from "react";
import { SigTag } from "./GlobalComponents";
import { axiosPrivate } from "../Hooks/api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";

// type CommentInputProps = {
//   onSubmit: (form: { description: string }) => void;
// };

// const CommentInput = ({ onSubmit }: CommentInputProps) => {
//   const [form, setForm] = useState({
//     description: "",
//   });

//   const { description } = form;

//   const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setForm({
//       ...form,
//       [name]: value,
//     });
//   };

  
//   const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Enter") {
//       e.preventDefault();
//       onSubmit(form);
//       setForm({
//         description: "",
//       });
//     }
//   };
//   const handleSubmit = (e: React.MouseEvent) => {
//     e.preventDefault();
//     onSubmit(form);
//     setForm({
//       description: "",
//     });
//   };
  
//   const navigate = useNavigate();
//   const location = useLocation();
//   const from = location.state?.from?.pathname || "/";
//   const { id } = useParams();


//   const onUserInput = async (data: {content: string} ) => {
//     try{axiosPrivate.post(`/community/${id}/comment`, {
//         content: data.content,
//       })
//       .then((res) => {
//         console.log(res)
//       })
//       .then(() => {
//         navigate(from, { replace: true });
//       })}
//       catch(err) {
//         console.error(err)
//         navigate("/login")
//       };
//     };

type props = {
  url: string | undefined
};

const Textarea = styled.textarea`
  width: 100%;
  height: 30px;
`;

const CommentInput = (props: props) => {
  const [value, setValue] = useState('');
  const axiosPrivate = useAxiosPrivate();
  
  const handleSubmit = async () => {
    axiosPrivate.post(`/community/${props.url}/comment`, {
      content: value,
    })
    
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
          // ()=>(handleSubmit) -> 콜백으로 하니까 버튼 안됨
          className='ml--40 z-index-9999 cursor'
          >
          작성
        </SigTag>
      </RowWrapper>
    </SectionWrapper>
  );
}

export default CommentInput;

