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

class SearchResultsShops extends React.Component{
    componentDidMount(){
        console.log(this.props.shop)
    }
    render(){
        const {id , company_name , avatar ,campus, followers, company_description } = this.props.shop;
        return(
            <ProductConsumer>
                {value=>(
                <Col lg="12" md="12" sm="12" xs="12" className="search-product">
                    <Row>
                        <Col md="3" lg="3" xl="3" sm="12" xs="12"  onClick={() => history.push("/user/shop-view",{id:id})}>
                            <div style={{textAlign:"center", cursor:"pointer"}}>
                                <img alt="#" src={`https://backend-api.martekgh.com/${avatar}`} style={{width:"180px", height:"180px", borderRadius:"50%", marginTop:"10px"}}/>  
                            </div>
                        </Col>
                        <Col md="9" sm="12" xl="9" xs="12" onClick={() => history.push("/user/shop-view",{id:id})} >
                            <h3 style={{color:"#5588b7", fontSize:"18px", fontWeight:"500", textAlign:"left", overflow:"hidden"}}>
                                {company_name}
                            </h3>
                            <div className="descrip">
                                <p style={{fontWeight:500}}>{company_description}</p>
                            </div>
                            <h4 style={{fontSize:"14px", marginBottom:"10px"}}>{campus.campus}</h4>
                            <h5 style={{ display: "inline", fontSize: "14px", fontWeight: "bold" }}>{followers.length} </h5><h4 style={{ display: "inline", fontSize: "14px",fontWeight:500 }}> | followers</h4>
                        </Col>
                    </Row>
                </Col>
                )}
            </ProductConsumer>
                
        );
    }
}
export default SearchResultsShops;

SearchResultsShops.propTypes ={
    product:propTypes.shape({
        id:propTypes.number,
        img:propTypes.string,
        name:propTypes.string,
        price:propTypes.number,
        in_cart:propTypes.bool

    }).isRequired
}