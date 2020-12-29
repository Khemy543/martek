import React from "react";
import { Container } from "reactstrap";
import CartItem from "./CartItem";


export default function CartList({value}){
    const  { cart } = value;
    return(
    
            <div>
                <Container>
                    {cart.map(items=>{
                        return <CartItem key={items.id} items={items} value={value}/>
                    })}
                </Container>
            </div>
        
    );
}