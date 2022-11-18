import styled from '@emotion/styled'
import React, { useState } from 'react'
import { useRecoilState, useRecoilValue } from 'recoil'
import { currentPage } from '../Recoil/atoms/currentPage'

const HeaderWrapper = styled.header`
  width: 100%;
  height: 52px;
  display:flex;
  align-items: center;
  justify-content: center;
  border-bottom: 1px solid var(--line-light-gray);
  background-color: var(--pure-white);
  position: fixed;
  top: 0;
  z-index: 9999;
`
const Header = () => {
  const {title} = useRecoilValue(currentPage)
  return (
    <HeaderWrapper className='bold h4'>{title}</HeaderWrapper>
  )
}

export default Header