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
import ImageContainer from 'components/ImageContainer.js'

class Product extends React.Component{

    render(){
        const {id , product_name , product_image, price, image }= this.props.product;
        
                return(
                <Col lg="2" md="2" sm="6" xs="6" style={{padding:"0px 3px 0px 3px", borderRight:"1px solid #eaeaea"}} className="product-container">
                        <div style={{textAlign:"center", cursor:"pointer"}}>
                        <div>
                            <div onClick={() => history.push(`/user/product-details/${id}/${product_name}`,{id:id})} style={{textAlign:"center"}}>
                                <ImageContainer 
                                    src={`https://backend-api.martekgh.com/${product_image? product_image[0].path : image? image[0].path : null }`}
                                    width={180}
                                    height={180}
                                    alt={product_name}
                                />
                            {/* <img alt="#" src={`https://backend-api.martekgh.com/${product_image[0].path}`} style={{width:"180px", height:"180px", borderRadius:"5px", objectFit:"cover"}}/> */}  
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