import styled from "@emotion/styled";
import React from "react";

type Props = {
  children: JSX.Element[]|JSX.Element;
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
`;

function PlantCardCarousel({ width, children }: Props) {
  return <CarouselWrapper width={width}>{children}</CarouselWrapper>;
}

export default PlantCardCarousel;
