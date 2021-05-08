import React from 'react';
import useIntersectionObserver from "hooks/use-intersection-observer.js"
import Image from './Image.js'

const ImageContainer = props => {
    const ref =  React.useRef();
    const [isVisible, setIsVisible] = React.useState(false);

    useIntersectionObserver({
        target: ref,
        onIntersect: ([{ isIntersecting }], observerElement) => {
            if(isIntersecting){
                setIsVisible(true);
                observerElement.unobserve(ref.current);
            }
        }
    });

    const aspectRatio = (props.height / props.width) * 100;
    console.log(aspectRatio)

    return (
        <div
            ref = {ref}
            style={{background: isVisible? "white" : "rgba(0,0,0,0.05)", paddingBottom:`${aspectRatio}%`, position:"relative", overflow:"hidden", display:"block"}}
        >
            {isVisible && (
                <Image src={props.src} alt={props.alt} {...props}/>
            )}
        </div>
    )
}

export default ImageContainer