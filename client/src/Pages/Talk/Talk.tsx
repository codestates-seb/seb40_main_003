import React from 'react'
import usePageTitle from '../../Hooks/usePageTitle'
import { Link } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import {
  MainCenterWrapper,
  MainContentContainer,
  MainRightWrapper,
  SectionWrapper
} from "../../Components/Wrapper";
import { SigButton } from "../../Components/GlobalComponents";
import { currentPage } from "../../Recoil/atoms/currentPage";


type Props = {}

const Talk = (props: Props) => {
  usePageTitle("채팅")
  return (
    <>
    <MainContentContainer>
      <MainCenterWrapper>
        채팅 리스트
      </MainCenterWrapper>
      <MainRightWrapper>
        <Link to={"/Talk/Write"}>
          <SigButton type='submit'>후기 쓰기</SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer>
  </>
  )
}
;
export default Talk