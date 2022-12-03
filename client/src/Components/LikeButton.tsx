import styled from "@emotion/styled";
import { RowWrapper, SectionWrapper } from "./Wrapper";
import { useRef, useState } from "react";
import { SigTag } from "./GlobalComponents";
import useAxiosPrivate from "../Hooks/useAxiosPrivate";
import { useResetRecoilState } from "recoil";
import { userState } from "../Recoil/atoms/user";
import emptyHeartIcon from "../images/like/emptyHeartIcon.png"

export const LikeButton = styled.img`
  width: 36px;
  height: 36px;
  resize: none;
`;

const LikeButtonClick = ({onClick}:any) => {

  return (
    <LikeButton 
    src={emptyHeartIcon} onClick={onClick}
    />
  )
}
  export default LikeButtonClick;