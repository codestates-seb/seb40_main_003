import styled from '@emotion/styled'
import React from 'react'

type Props = {}

export const SigButton = styled.button`
  padding: 16px 0;
  background-color: var(--main);
  color: var(--pure-white);
  font-weight: var(--bold);
  text-align: center;
  min-width: 173px;
  border-radius: 16px 0 16px 0;
  cursor: pointer;
  &.ghost{
    color : var(--main);
    background-color: var(--pure-white);
    border: 2px solid var(--main);
  }
  &.disable{
    background-color: var(--line-gray);
    color:var(--pure-white);
  }
`

export const SigTag = styled.span`
padding: 2px 4px;
background-color: var(--main);
color: var(--pure-white);
font-weight: var(--sub);
text-align: center;
min-width: 33px;
border-radius: 4px 0px;
&.variant2{
  color: var(--pure-white);
  background-color: var(--line-gray);
}
&.variant3{
  color: var(--main);
  background-color: var(--pure-white);
  border: 1px solid var(--main);
}
&.variant4{
  color: var(--line-gray);
  background-color: var(--pure-white);
  border: 1px solid var(--line-gray);
}
`

const GlobalComponents = (props: Props) => {
  return (
    <div>GlobalComponents</div>
  )
}

export default GlobalComponents