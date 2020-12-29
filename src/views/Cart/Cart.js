import React from "react";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

// core components
import CartColumns from "./CartColumns.js";
import EmptyCart from "./EmptyCart.js";
import CartList from "./CartList";
import CartTotal from "./CartTotal";

//context
import { ProductConsumer } from "../../context.js";
import { Container } from "reactstrap";

class Cart extends React.Component{
    state={
        isActive:true
    }

    componentDidMount(){
        setTimeout(()=>{
            this.setState({isActive:false});
        },3000);
    }
   
    render(){
        return(
            <>
                <br/>
                <br/>
                <div className="main">
                    <div className="section">
                        <ProductConsumer>
                            {value=>{
                                if(value.cart.length <= 0){
                                    return(
                                        <EmptyCart/>
                                    );
                                }
                                else{
                                
                                return(
                                    <React.Fragment>
                                        <Container>
                                        <h5 style={{marginBottom:"10px", fontSize:"14px", fontWeight:500}}>MY CART ({value.cart.length} ITEMS)</h5>
                                        </Container>
                                        <CartColumns />
                                        <CartList value={value}/>
                                        <CartTotal value={value}/>
                                    </React.Fragment>
                                )}}}
                        </ProductConsumer>
                        
                        
                        </div>
                    </div>
                </>
        );
    }
}
export default Cart;