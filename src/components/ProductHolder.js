import React from 'react';

const ProductHolder = props => {
    return(
        <>
            <div
                style={{
                    height:"180px",
                    width:"160px",
                    background : 'rgba(0,0,0,0.07)',
                    marginLeft : "1px",
                    marginRight:"1px",
                    borderRadius:"5px",
                }}
            >

            </div>
            <div 
                style={{
                    height:"12px",
                    width : "120px",
                    background :"rgba(0,0,0,0.07)",
                    marginTop:"8px"
                }}
            >

            </div>
            <div 
                style={{
                    marginTop:"5px",
                    height:"12px",
                    width : "80px",
                    background :"rgba(0,0,0,0.07)"
                }}
            >

            </div>
            <br/>
        </>
    );
}

export default ProductHolder