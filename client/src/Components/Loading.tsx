import React, { useMemo } from "react";
import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";

interface Props {
  width?: number;
  height?: number;
  circle?: boolean; // 원형 스켈레톤
  rounded?: boolean; // 둥근 모서리
  count?: number; // inline 으로 선언 시, 글자 수
  unit?: string; // width, height 단위
  animation?: boolean; // 애니메이션 유무
  color?: string; // 스켈레톤 색상
  style?: React.CSSProperties; // 추가 스타
  children?: JSX.Element
  ml?:number;
  mr?:number;
}

const pulseKeyframe = keyframes`
  0% {
    opacity: 1;
  }
  50% {
    opacity: 0.4;
  }
  100% {
    opacity: 1;
  }
`;

const pulseAnimation = css`
  animation: ${pulseKeyframe} 1.5s ease-in-out 0.5s infinite;
`;

const Base = styled.span<Props>`
  ${({ color }) => color && `background-color: ${color}`};
  ${({ ml }) => ml && `margin-left: ${ml}px`};
  ${({ mr }) => mr && `margin-right: ${mr}px`};
  ${({ rounded }) => rounded && "border-radius: 8px 0"};
  ${({ circle }) => circle && "border-radius: 50%"};
  ${({ width, height }) => (width || height) && "display: block"};
  ${({ animation }) => animation && pulseAnimation};
  width: ${({ width, unit }) => width && unit && `${width}${unit}`};
  height: ${({ height, unit }) => height && unit && `${height}${unit}`};
`;

const Content = styled.span`
  opacity: 0;
`;

const Skeleton: React.FC<Props> = ({
  animation = true,
  width,
  height,
  circle,
  rounded,
  count,
  unit = "px",
  color = "#D9D9D9",
  style,
  mr,
  ml,
}) => {
  const content = useMemo(
    () => [...Array({ length: count })].map(() => "-").join(""),
    [count]
  );

  return (
    <Base
      style={style}
      rounded={rounded}
      circle={circle}
      width={width}
      height={height}
      animation={animation}
      unit={unit}
      color={color}
      mr={mr}
      ml={ml}
    >
      <Content>{content}</Content>
    </Base>
  );
};



const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
  `

const Container = styled.div`
  width: 80px;
  height: 80px;
  margin: 0 auto;
`;

const LoadindSpinner = styled.div`
  display: block;
  width: 100%;
  height: 100%;
  border: 7px solid var(--line-gray);
  border-Radius: 100%;
  border-Top-Color: var(--main);
  animation: ${spin} 500ms linear infinite;
  `;

export function Loading() {
  return (
    <Container>
      <LoadindSpinner />
    </Container>
  );
};

export default Skeleton;