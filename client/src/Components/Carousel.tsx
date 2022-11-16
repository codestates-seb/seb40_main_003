import React from "react";
import { Carousel } from "react-responsive-carousel";
import 'react-responsive-carousel/lib/styles/carousel.min.css'

type carousel ={
    children:React.ReactChild[]
}
export const TopCarousel= (props:carousel) =>{
    return (
        <Carousel showThumbs={false} showStatus={false}>
            {props.children}
        </Carousel>
    )
}