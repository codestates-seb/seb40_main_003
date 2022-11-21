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
  usePageTitle("채팅")
  return (
    <>
    <div>Talk</div>
    <Link to={"/Talk/Write"}>
      <SigButton type='submit'>후기 쓰기</SigButton>
    </Link>

    </>

  )
}

export default Talk