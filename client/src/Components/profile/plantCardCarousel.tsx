import styled from "@emotion/styled";
import React from "react";

type Props = {
  children: JSX.Element[];
  width: number | undefined;
};
const CarouselWrapper = styled.div`
  /* height: 90px; */
  padding: 8px 0;
  width: ${(props: Props) => (props.width ? props.width - 48 : "230")}px;
  max-width: 680px;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
  ::-webkit-scrollbar-thumb {
    background-color: var(--main); /*스크롤바의 색상*/
  }
  ::-webkit-scrollbar-track {
    background-color: var(--bg-light-gray);
    background-clip: padding-box;
    border: 4px solid transparent;
  }
`;

function PlantCardCarousel({ width, children }: Props) {
  return <CarouselWrapper width={width}>{children}</CarouselWrapper>;
}

export default PlantCardCarousel;
