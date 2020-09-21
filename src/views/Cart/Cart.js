import React from "react";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

// core components
import IndexNavbar from "../../components/Navbars/IndexNavbar.js";
import DemoFooter from "../../components/Footers/DemoFooter";
import CartColumns from "./CartColumns.js";
import EmptyCart from "./EmptyCart.js";
import CartList from "./CartList";
import CartTotal from "./CartTotal";

//context
import { ProductConsumer } from "../../context.js";

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
            <div>
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
                                        <CartColumns />
                                        <CartList value={value}/>
                                        <CartTotal value={value}/>
                                        </React.Fragment>
                                )
                                
                                    }}}
                        </ProductConsumer>
                        
                        
                        </div>
                    </div>
                </div>
        );
    }
}
export default Cart;