import alertIcon from "../images/alertIcon.svg";

import styled from "@emotion/styled";
import { RowWrapper } from "./Wrapper";

interface props  {
  content: string;
  className?:string
};
export const ErrorMessage = (props: props) => {
  return (
    <ErrorWrapper className={props.className}>
      <RowWrapper>
        <img src={alertIcon} alt={"에러메세지"} className="mr-8" />
        <ErrorContent className="medium">{props.content}</ErrorContent>
      </RowWrapper>
    </ErrorWrapper>
  );
};

const ErrorWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  &.fullscreen{
    min-height: 100vh;
  }
`;
const ErrorContent = styled.span`
  color: var(--alert-red);
`;