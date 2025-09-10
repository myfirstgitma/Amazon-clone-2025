import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "react-responsive-carousel";
import { img } from "./img/data";

const Carousal = () => {
    // const images = [Math.floor(Math.random()*img.length)]
    // const image = img[images]
  
    
    
    return(
    <Carousel
        autoPlay={true}
        infiniteLoop={true}
        showIndicators={false}
        showThumbs={false}
      >
        {img.map((imgItem, index) => (
          <img key={index} src={imgItem} alt={`carousel-image-${index}`} />
        ))}

        
        {/* <div>
            <img src={image} alt="random images" />
        </div> */}
        
      </Carousel>
    )
      
    
  
};

export default Carousal;
