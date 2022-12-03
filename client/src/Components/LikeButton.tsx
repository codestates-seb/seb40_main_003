import styled from "@emotion/styled";
import { RowWrapper, SectionWrapper } from "./Wrapper";
import { useRef, useState } from "react";
import { SigTag } from "./GlobalComponents";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import { useResetRecoilState } from "recoil";
import { userState } from "../Recoil/atoms/user";
import heartIcon from "../../images/like/heartIcon.png"
import emptyHeartIcon from "../../images/like/emptyHeartIcon.png"

export const LikeButton = styled.button`
  width: 20px;
  height: 20px;
  resize: none;
  padding: 8px;
  background-color: aliceblue;
`;

const LikeButtonClick = ({
  // like, onClick
}) => {
//   const [value, setValue] = useState("");
//   const axiosPrivate = useAxiosPrivate();
//   const buttonRef = useRef<HTMLButtonElement>(null)

// axiosPrivate
//   .post(`/experts/${1}/like`, {
//     headers: {
//       "Content-Type": "multipart/form-data",
//     },
//   })
//   .catch((err) => {});


  return (
    <LikeButton 
    // ref={buttonRef} src={like?heartIcon:emptyHeartIcon} onClick={()=>{onClick}}
    />
  )
}
  export default LikeButtonClick;
