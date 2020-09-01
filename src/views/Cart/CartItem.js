import React from "react";
import history from "../../history.js";
export default function CartItem({items, value}){
const {id, product_name, img, price, total, quantity} = items;
const {increment, decrement, removeItem } = value;
    return(
    
            <div>
            <div className="row my-2 text-capitalize text- center">
                <div className="col-10 mx-auto col-lg-2 text-center" onClick={() => history.push("/user/product-details",{id:id})}>
                
                <img
                className="image-fluid"
                alt="#"
                src={require("../../assets/img/phone.png")}
                style={{height:"4.5rem", width:'4.5rem'}}
                
                />
                
                </div>
                <div className="col-10 mx-auto col-lg-2 text-center">
                <span className="d-lg-none">product:</span>
                {product_name}
                </div>
                <div className="col-10 mx-auto col-lg-2 text-center" style={{fontWeight:"bold"}}>
                <span className="d-lg-none" >price:</span>
                ¢ {price}
                </div>
                <div className="col-10 mx-auto col-lg-2 my-2 my-lg-0">
                    <div className="d-flex justify-content-center">
                        <div>
                            <span className="btn btn-black mx-1" onClick={()=>decrement(id)}>-</span>
                            <span className="btn btn-black mx-1">{quantity}</span>
                            <span className="btn btn-black mx-1" onClick={()=>increment(id)}>+</span>
                        </div>
                    </div>
                </div>
                <div className="col-10 mx-auto col-lg-2 text-center">
                <div className="cart-icon" onClick={()=>removeItem(id)}><i className="fa fa-trash"/></div>
                </div>

                <div className="col-10 mx-auto col-lg-2 text-center" style={{fontWeight:"bold"}}>
                <strong className="text-uppercase">¢ </strong>
                {total}
                </div>
                </div>
            </div>
        
    );
}