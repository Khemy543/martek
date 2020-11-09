import React from "react";
import propTypes from "prop-types";
// reactstrap components
import{
    Col,
    Card,
    CardTitle,
    CardBody,
} from "reactstrap";

// core components

//context
import { ProductConsumer } from "../context";
import history from "../history.js";

class Product extends React.Component{

    render(){
        const {id , product_name , /* product_image */ price } = this.props.product;/* 
        console.log(this.props.product) */
        return(
                
                <Col lg="3" md="4" sm="6" xs="6" style={{padding:"0px 0px 0px 0px"}}>
                    <Card style={{margin:"0px 0px 0px 0px", padding:"0px 20px 0px 20px", transition:"all 1s linear", background:'white'}} className="card-plain" id="product-card">
                        <CardTitle style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", padding:"0px 0px 0px 0px", overflow:"hidden", height:"20px"}}>
                            {product_name}
                        </CardTitle>
                        <br/>
                        <ProductConsumer>
                            {(value=>(
                                <div>
                                <div style={{textAlign:"center"}} className="first-img" onClick={() => history.push("/user/product-details",{id:id})}>
                        
                        <img alt="#" src={require("../assets/img/iphone.png")} style={{maxHeight:"185.13px", maxWidth:"100px"}} className="to-go"/>
                        <img alt="#" src={require("../assets/img/flatscreen.png")} style={{maxHeight:"185.13px", maxWidth:"100px"}} className="img-top"/>
                        
                        </div>
                        
                        <br/>
                        
                        <CardBody style={{padding:"0px 0px 0px 0px"}}>
                            <h3 style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", marginRight:"30px"}}> ¢ {price}</h3>
                            
                            
                                                                
                            </CardBody>
                                </div>
                            ))}
                        </ProductConsumer>
                        
                        
                        </Card>
                </Col>
                
        );
    }
}
export default Product;

Product.propTypes ={
    product:propTypes.shape({
        id:propTypes.number,
        img:propTypes.string,
        name:propTypes.string,
        price:propTypes.number,
        inCart:propTypes.bool

    }).isRequired
}