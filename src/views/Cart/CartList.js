import React from "react";
import CartItem from "./CartItem";


export default function CartList({value}){
    const  { cart } = value;
    return(
    
            <div>
            <div className="container-fluid">
                {cart.map(items=>{
                    return <CartItem key={items.id} items={items} value={value}/>
                })}
               
                </div>
            </div>
        
    );
}