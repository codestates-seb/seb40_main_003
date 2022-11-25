import styled from '@emotion/styled'
import React from 'react'
type Props = {}

const HeaderWrapper =styled.div`
    width: 100%;
    height: 52px;
    margin-top: 52px;
    padding: 16px;
    border-bottom: 1px solid var(--line-light-gray);
`
const SearchBar = () => {
  return (
    <HeaderWrapper>검색</HeaderWrapper>
  )
}

export default SearchBar