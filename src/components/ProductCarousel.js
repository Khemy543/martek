import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';


const ProductCarousel = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);

  console.log(props)
  const next = () => {
    if (animating) return;
    const nextIndex = activeIndex === props.images.length - 1 ? 0 : activeIndex + 1;
    setActiveIndex(nextIndex);
  } 

  const previous = () => {
    if (animating) return;
    const nextIndex = activeIndex === 0 ? props.images.length - 1 : activeIndex - 1;
    setActiveIndex(nextIndex);
  }

  const goToIndex = (newIndex) => {
    if (animating) return;
    setActiveIndex(newIndex);
  }

  const slides = props.images.map((item) => {
    return (
      <CarouselItem
        onExiting={() => setAnimating(true)}
        onExited={() => setAnimating(false)}
        key={item.src}
      >
        <div style={{textAlign:"center"}}>   
          <img src={`https://backend-api.martekgh.com/${item.path}`} alt="product images" 
          style={{width:"100%", objectFit:"cover", height:"100%", borderRadius:"0px"}}/>
        </div>
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
    >
      <CarouselIndicators items={props.images} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default ProductCarousel;