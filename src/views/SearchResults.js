import React from "react";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter.js"
import SearchResultsProducts from "../components/SearchResultsProduct.js";
import ShopCard from "../components/ShopCard.js";
import EmptySearch from "../components/EmptySearch.js";
import Product from '../components/Product.js'

//import reactstrap
import{
    Container,
    Row,
    Card,
    CardBody,
    CardTitle,Col
} from "reactstrap";
import SearchResultsShops from "components/SearchShop.js";

export default function SearchResults(props){
    console.log(props.location);
    return(
    
            <div>
                
                <div className="section">
                <br/>
                <Container>
                    <Row>
                    {props.location.state.results.length<=0?
                        <>
                            <Row>
                                <h3 style={{fontWeight:500}}>Search Results for "{props.location.state.searchValue}"</h3>
                            </Row>
                            <br/>
                            <EmptySearch/>
                        </>
                        :
                        <>
                    {props.location.state.products.length>0?
                    <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                        <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                            <Row style={{borderBottom:"1px solid #eaeaea"}} >
                                <Col sm="8" md="9" lg="9" xl="9" xs="8" >
                                    <h3 className="category" style={{fontWeight:500}}>
                                        Search Results for {props.location.state.searchValue}
                                    </h3>
                                </Col>
                                <Col sm="4" md="3" lg="3" xl="3" xs="4">
                                <p style={{fontWeight:500, fontSize:"14px", float:"right",marginTop:"20px", marginBottom:"0px", cursor:"pointer"}}>Products</p> 
                                </Col>
                            </Row>
                        </CardTitle>
                        
                        <CardBody>
                            <Container>
                                <Row>
                                    {props.location.state.products.map((product)=>(
                                        <>
                                            <Product key={product.searchable?.id} product={product.searchable}/>
                                        </>
                                    ))}
                                </Row>
                            </Container>
                        </CardBody>
                    </Card>
                    :<></>}
                    <br/>
                    {props.location.state.shops.length>0?
                        <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                        <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                            <Row style={{borderBottom:"1px solid #eaeaea"}} >
                                <Col sm="8" md="9" lg="9" xl="9" xs="8"> 
                                    <h3 className="category" style={{fontWeight:500}}>
                                        Search Results for {props.location.state.searchValue}
                                    </h3>
                                </Col>
                                <Col sm="4" md="3" lg="3" xl="3" xs="4">
                                <p style={{fontWeight:500, fontSize:"14px", float:"right",marginTop:"20px", marginBottom:"0px", cursor:"pointer"}}>Shops</p> 
                                </Col>
                            </Row>
                        </CardTitle>
                        
                        <CardBody>
                            <Container>
                                <Row>
                                    {props.location.state.shops.map((shop)=>(
                                        <SearchResultsShops id={shop.searchable.id} shop={shop.searchable}/>
                                    ))}
                                </Row>
                            </Container>
                        </CardBody>
                    </Card>
                    :<></>}
                    </>
                    }
                    </Row>
                    </Container>
                </div>
                </div>
        
    );
}