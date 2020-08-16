import React from "react";

export default function CartColumns(){
    return(
        <div >
            <div className="contianer-fluid text-center d-none d-lg-block">
                <div className="row" style={{marginBottom:"15px"}}>
                    <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase" style={{fontWeight:"bold"}}>Products</p>
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase"style={{fontWeight:"bold"}}>name of Product</p>
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase"style={{fontWeight:"bold"}}>price</p>
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase"style={{fontWeight:"bold"}}>quantity</p>
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase"style={{fontWeight:"bold"}}>remove</p>
                    </div>
                    <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase"style={{fontWeight:"bold"}}>total</p>
                    </div>

                    
                </div>
                </div>
        </div>
    );
}