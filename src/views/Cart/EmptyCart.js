import React from "react";
import { Link } from "react-router-dom";


//import reactstrap
import{
    Container,
    Button
} from "reactstrap";


export default function EmptyCart(){
    return(
    
            <div>
            <Container className="text-center">
                <div>
                <h2 className="text-uppercase">Your Cart is Empty</h2>    
               </div>
               <br/>
               <br/>
               <br/>
                <Link to="/user/home">
               <Button
                color="info"
                
                >
                Find Something to buy
                </Button>
                </Link>
                </Container>
            </div>
        
    );
}