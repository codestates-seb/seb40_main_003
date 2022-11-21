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


type Props = {}

const Talk = (props: Props) => {
  usePageTitle("대화")
  return (
    <>
    <MainContentContainer>
      <MainCenterWrapper>
        <SectionWrapper>
          <>
            채팅 리스트
          </>
        </SectionWrapper>
      </MainCenterWrapper>
      <MainRightWrapper>
        <Link to={"/Talk/care-write"}>
          <SigButton type='submit'>돌봄 후기 쓰기</SigButton>
        </Link>
        <Link to={"/Talk/product-write"}>
          <SigButton type='submit'>거래 후기 쓰기</SigButton>
        </Link>
      </MainRightWrapper>
    </MainContentContainer>
  </>
  )
}
;
export default Talk;