import React from "react";
import {
    Container
} from 'reactstrap'

export default function CartColumns(){
    return(
        <div >
            <Container className="d-none d-lg-block">
                <div className="row" style={{marginBottom:"15px"}}>
                    <div className="col-10 mx-auto col-lg-6">
                    <p className="text-uppercase" style={{fontWeight:"bold"}}>Item</p>
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase"style={{fontWeight:"bold"}}>price</p>
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase"style={{fontWeight:"bold"}}>quantity</p>
                    </div>

                    <div className="col-10 mx-auto col-lg-2">
                    <p className="text-uppercase"style={{fontWeight:"bold"}}>subtotal</p>
                    </div>

                    
                </div>
                </Container>
        </div>
    );
}