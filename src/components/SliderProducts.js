import React from "react";
import propTypes from "prop-types";
// reactstrap components
import{
    Col,
    Card,
    CardTitle,
    CardBody,
    Button
} from "reactstrap";

// core components
import { Link } from "react-router-dom";

//context
import { ProductConsumer } from "../context";

class SliderProducts extends React.Component{
    render(){
        const {id , name , img ,price , inCart} = this.props.product;
        return(
            
            <Card className="card-plain" style={{borderRight:"1px solid #eaeaea"}}>
                <CardTitle style={{color:"#5588b7", fontSize:"14px", fontWeight:"500"}}>
                {name}
                    </CardTitle>
                    <br/>
                    <ProductConsumer>
                            {(value=>(
                                <div>
                    <div style={{textAlign:"center"}}>
                    <img alt="#" src={require("../assets/img/iphone.png")} style={{height:"185.13px", width:"180px", marginLeft:"25%"}}/>
                    </div>
                    <br/>
                    <CardBody style={{padding:"0px 0px 0px 0px"}}>
                    <h3 style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", marginRight:"30px"}}> ¢ {price}</h3>
                    <Button style={{float:"right", marginTop:"-15px"}}
                            outline
                            color="info"
                            ref={btn =>{this.btn = btn;}}
                            disabled={inCart ? true : false}
                            onClick={()=> value.addToCart(id)}>
                                
                                {inCart?(<p style={{marginBottom:"0px", marginTop:"0px"}} disabled> {" "}In Cart</p>):(<i className="fa fa-cart-plus" style={{fontSize:"25px",marginRight:"10px",color:"#5588b7"}}/>)}
                            </Button>
                    </CardBody>
                    </div>
                            ))}
                        </ProductConsumer>
                </Card>
            
                
                
        );
    }
}
export default SliderProducts;
/* 
NextProduct.propTypes ={
    NextProduct:propTypes.shape({
        id:propTypes.number,
        img:propTypes.string,
        name:propTypes.string,
        price:propTypes.number,
        inCart:propTypes.bool

    }).isRequired
} */