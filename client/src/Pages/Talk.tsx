import React from 'react'
import usePageTitle from '../Hooks/usePageTitle'

type Props = {}

const Talk = (props: Props) => {
  usePageTitle("돌봄")
  return (
    <div>Talk</div>
  )
}

export default Talk