import axios from 'axios';
import React, { useState } from 'react';
import {
  Carousel,
  CarouselItem,
  CarouselControl,
  CarouselIndicators,
  CarouselCaption
} from 'reactstrap';
//styles
import "./Carousel.css";
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton';






const CarouselView = (props) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [activeCampus, setActiveCampus] = React.useState(localStorage.getItem('activeCampus_id'));
  const [isActive, setIsActive] = React.useState(true);

  /* React.useEffect(()=>{
    
  },[]) */

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
      <div className="box" style={{textAlign:"center"}}>
        <img src={`https://backend-api.martekgh.com/${item.src}`} className="image-carousel"/>
        </div> 
        
        <CarouselCaption  captionHeader={item.caption} />
      </CarouselItem>
    );
  });

  return (
    <Carousel
      activeIndex={activeIndex}
      next={next}
      previous={previous}
      enableTouch={true}
      slide={true}
      ride="carousel"
    >
      <CarouselIndicators items={props.images} activeIndex={activeIndex} onClickHandler={goToIndex} />
      {slides}
      <CarouselControl direction="prev" directionText="Previous" onClickHandler={previous} />
      <CarouselControl direction="next" directionText="Next" onClickHandler={next} />
    </Carousel>
  );
}

export default CarouselView;