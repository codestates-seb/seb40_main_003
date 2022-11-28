import React from "react";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'

type carousel ={
    children:JSX.Element[]
}
export const TopCarousel:React.FC<carousel>= ({children}) =>{
    return (
        <Carousel showThumbs={false} showStatus={false}>
            {children}
        </Carousel>
    )
}