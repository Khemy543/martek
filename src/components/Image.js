import React from 'react';
import 'assets/css/image.css';
import { requirePropFactory } from '@material-ui/core';

const Image = props => {
    const [isLoaded, setIsLoaded] = React.useState(false);
    return (
        <React.Fragment>
            <img 
                className = "image full"
                style={{opacity:1, height:props.height, width:props.width , objectFit:"cover",  borderRadius:"5px", cursor:"pointer"}}
                alt={props.alt}
                src={props.src}
            />
        </React.Fragment>
    );
} ;

export default Image