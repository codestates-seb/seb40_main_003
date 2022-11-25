import React, { useMemo, useState } from "react";
import { keyframes, css } from "@emotion/react";
import styled from "@emotion/styled";
import { DescriptionColumnWrapper } from "./product/ProductCard";
import { ColumnWrapper, SpaceBetween, SpaceEnd } from "./Wrapper";

// loading spinner 컴포넌트
const spin = keyframes`
  to {
    transform: rotate(360deg);
  }
  `;

type LoadingSpinnerProps = {
  size?: number;
};
const LoadingWrapper = styled.section`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const LoadingElem = styled.div`
  display: block;
  width: ${(props: LoadingSpinnerProps) => (props.size ? props.size : "70")}px;
  height: ${(props: LoadingSpinnerProps) => (props.size ? props.size : "70")}px;
  border: 7px solid var(--line-gray);
  border-radius: 100%;
  border-top-color: var(--main);
  animation: ${spin} 500ms linear infinite;
`;

export const LoadingSpinner = () => {
  return (
    <LoadingWrapper>
      <LoadingElem />
    </LoadingWrapper>
  );
};

// 스켈레톤
// 스켈레톤 컴포넌트
export const ProductWrapper = styled.div`
  width: 100%;
  min-width: 312px;
  max-width: 730px;
  padding: 8px 8px;
  display: flex;
  flex-direction: column;
  border-bottom: 1px solid var(--line-light-gray);
`;
export const LoadingSkeleton = ({count=5}) => {

  return (
    <>
      {[...Array(count)].map((e,i) => {
        return <ProductPlaceHolder key={"skeleton"+i}/>;
      })}
    </>
  ) 
};

export const ProductPlaceHolder = () => {
  return (
    <ProductWrapper>
      <SpaceBetween>
        <Skeleton width={100} height={100} rounded={true} mr={16} />
        <DescriptionColumnWrapper>
          <ColumnWrapper>
            <Skeleton width={150} height={20} />
          </ColumnWrapper>
          <span className="bold h4 mt-16">
            <Skeleton width={80} height={20} />
          </span>
        </DescriptionColumnWrapper>
      </SpaceBetween>
      <SpaceEnd>
        <Skeleton width={80} height={25} />
      </SpaceEnd>
    </ProductWrapper>
  );
};

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
  children?: JSX.Element;
  ml?: number;
  mr?: number;
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
  z-index: auto;
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
    () => [Array(count)].map((e) => "-").join(""),
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

export default Skeleton;
