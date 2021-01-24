import React from "react";
import propTypes from "prop-types";
// reactstrap components
import{
    Col,
    Card,
    CardTitle,
    CardBody,
    Button,
    Row
} from "reactstrap";

// core components
import history from "../history.js";

//context
import { ProductConsumer } from "../context";

class SearchResultsProducts extends React.Component{
    /* state={
        product = this.props.product;
    }

    componentDidMount(){
        console.log(th.product['image']);
        this.props.product['image'] = this.props.product['product_images'];
        delete this.state.product['images'];
    } */

    render(){
        const {id , product_name , image ,price, description } = this.props.product;
        return(
            <ProductConsumer>
                {value=>(
                <Col lg="12" md="12" sm="12" xs="12" className="search-product">
                    <Row>
                        <Col md="3" lg="3" xl="3" sm="12" xs="12"  onClick={() => history.push("/user/product-details",{id:id})}>
                            <div style={{textAlign:"center", cursor:"pointer"}}>
                                <div>
                                <img alt="#" src={`https://backend-api.martekgh.com/${image[0].path}`} style={{width:"180px", height:"180px", objectFit:"cover", borderRadius:"5px", marginTop:"10px"}}/>  
                                </div>
                            </div>
                        </Col>
                        <Col md="6" sm="12" xl="6" xs="12" onClick={() => history.push("/user/product-details",{id:id})} >
                            <h3 style={{color:"#5588b7", fontSize:"18px", fontWeight:"500", textAlign:"left", overflow:"hidden"}}>
                                {product_name}
                            </h3>
                            <div className="descrip">
                            <p style={{fontWeight:500}}>{description}</p>
                            </div>
                        </Col>
                        <Col md="3" lg="3" xl="3" sm="12" xs="12">
                            <Row>
                                <Col md="12" xs="12" sm="12">
                                <h3 className="price" style={{color:"#5588b7", fontSize:"18px", fontWeight:500}}>GH¢ {price}</h3>                          
                                </Col>
                            </Row>
                            <br/>
                            <Row>
                                <Col md="12" xs="12" sm="12">
                                    <Button
                                        className="product-button"
                                        color="info"
                                        block
                                        onClick={()=>{value.addToCart(this.props.product)}}
                                    >
                                    <i className="fa fa-cart-plus mr-2"/>Add to cart
                                    </Button>
                                </Col>
                            </Row>
                        </Col>
                    </Row>
                </Col>
                )}
            </ProductConsumer>
                
        );
    }
}
export default SearchResultsProducts;

SearchResultsProducts.propTypes ={
    product:propTypes.shape({
        id:propTypes.number,
        img:propTypes.string,
        name:propTypes.string,
        price:propTypes.number,
        in_cart:propTypes.bool

    }).isRequired
}