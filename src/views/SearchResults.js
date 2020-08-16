import React from "react";
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter.js"
import SearchResultsProducts from "../components/SearchResultsProduct.js";
import ShopCard from "../components/ShopCard.js";
import EmptySearch from "../components/EmptySearch.js";

//import reactstrap
import{
    Container,
    Row
} from "reactstrap";
import { ProductConsumer } from "../context";

export default function SearchResults(props){
    return(
    
            <div>
                
                <div className="main">
                    
                <div className="section">
                <br/>
                <Container>
                <Row>
                    <ProductConsumer>
                        {value=>(
                        <h3 style={{fontWeight:500}}>Search Results for "{value.searchValue}"</h3>
                        )}
                    </ProductConsumer>
                </Row>
                <br/>
                <Row>
                <ProductConsumer>
                {
                    value => {
                        if(value.searchResults.length<=0 && value.searchShopResults.length<=0){
                            return<EmptySearch/>
                        }
                        return value.searchResults.map(product => {
                            return <SearchResultsProducts key={product.id} product={product}/>;
                        })
                    }
                }

                </ProductConsumer>
                </Row>
                <br/>
                <br/>
                <Row>
                    
                <ProductConsumer>
                {
                    value => {
                        return value.searchShopResults.map(shop => {
                            return <ShopCard key={shop.id} shop={shop}/>;
                        })
                    }
                }

                </ProductConsumer>
                </Row>
                </Container>
                </div>
                </div>
            </div>
        
    );
}