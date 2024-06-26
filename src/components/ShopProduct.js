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

class ShopProduct extends React.Component{

    render(){
        const {id , product_name , product_image, price }= this.props.product;
                return(
                <Col lg="2" md="2" sm="6" xs="6" style={{padding:"15px 3px 0px 3px"}}>
                        <div style={{textAlign:"center", cursor:"pointer"}}>
                        <div>
                            <div onClick={() => history.push("/shop/shop-product-details",{id:id})} style={{textAlign:"center"}}>
                            <img alt="#" src={`https://backend-api.martekgh.com/${product_image[0].path}`} style={{width:"180px", height:"180px", borderRadius:"5px",objectFit:"cover"}}/>  
                            </div>
                            
                                <h3 style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", textAlign:"left", overflow:"hidden",  height:"20px"}}>
                                    {product_name}
                                </h3>
                                <h3 style={{color:"#5588b7", fontSize:"14px", fontWeight:600, marginRight:"30px", textAlign:"left", marginTop:"3px"}}>GH¢ {price}</h3>   
                        </div>
                        </div>
                </Col>
                
        );
    }
}
export default ShopProduct;

ShopProduct.propTypes ={
    product:propTypes.shape({
        id:propTypes.number,
        img:propTypes.string,
        name:propTypes.string,
        price:propTypes.number,
        inCart:propTypes.bool

    }).isRequired
}