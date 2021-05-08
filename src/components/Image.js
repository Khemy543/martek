import React from 'react';
import 'assets/css/image.css';

const Image = props => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    console.log(props)
    return (
        <React.Fragment>
            <img 
                className = "image thumb"
                alt={props.alt}
                src={props.thumb}
                style={{visibility : isLoaded? "hidden" : "visible" , height:props.height, width:props.width, objectFit:"cover",  borderRadius:"5px"}}
            />
            <img 
                onLoad = {() => {
                    setIsLoaded(true);
                }}
                className = "image full"
                style={{opacity : isLoaded ? 1 : 0, height:props.height, width:props.width , objectFit:"cover",  borderRadius:"5px", cursor:"pointer"}}
                alt={props.alt}
                src={props.src}
            />
        </React.Fragment>
    );
} ;

export default Image