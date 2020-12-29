import React from "react";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter.js"
import SearchResultsProducts from "../components/SearchResultsProduct.js";
import ShopCard from "../components/ShopCard.js";
import EmptySearch from "../components/EmptySearch.js";

//import reactstrap
import{
    Container,
    Row,
    Card,
    CardBody,
    CardTitle
} from "reactstrap";

export default function SearchResults(props){
    console.log(props.location)
    return(
    
            <div>
                
                <div className="main">
                    
                <div className="section">
                <br/>
                <Container>
                    <Row>
                    <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                        <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                            <h3 style={{borderBottom:"1px solid #eaeaea", fontWeight:500}} className="category">
                                Search Results for {props.location.state.searchValue}
                            </h3>
                        </CardTitle>
                    
                        <CardBody>
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
                                            {props.location.state.products.map((product)=>(
                                            <SearchResultsProducts key={product.searchable.id} product={product.searchable}/>
                                            ))}
                                            {props.location.state.shops.map((shop)=>(
                                                <ShopCard id={shop.searchable.id} shop={shop.searchable}/>
                                            ))}
                                        </>}
                                </Row>
                            </Container>
                        </CardBody>
                    </Card>
                    </Row>
                    </Container>
                </div>
                </div>
            </div>
        
    );
}