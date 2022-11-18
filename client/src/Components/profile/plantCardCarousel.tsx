import styled from "@emotion/styled";
import React from "react";

type Props = {
  children: JSX.Element[]|JSX.Element;
};
const CarouselWrapper = styled.div`
  /* height: 90px; */
  padding: 8px 0;
  width: 90vw;
  max-width: 680px;
  display: flex;
  overflow-x: scroll;
  overflow-y: hidden;
`;

function PlantCardCarousel({ children }: Props) {
  return <CarouselWrapper >{children}</CarouselWrapper>;
}
export default PlantCardCarousel;
