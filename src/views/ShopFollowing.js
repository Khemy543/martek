import React from "react";
//import axios from "axios";
// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";
import history from "../history.js";
//import { Link } from "react-router-dom";

//react strap
import{
    Container,
    Row,
    Col
} from "reactstrap";
import { ProductConsumer } from "../context";
import ShopCard from "../components/ShopCard.js";

function ShopFollowing(props){
    return(
        <div>
            <div className="main">
                <div className="section">
                <br/>
                <br/>
                <Container>
                <p style={{marginBottom:"10px", fontSize:"13px"}}><span style={{cursor:"pointer"}} onClick={()=>history.push("/user/home")}>Home</span><i className="fa fa-chevron-right"/> shops following</p>
                <Row>
                      <ProductConsumer>
                        {
                          value=>{
                              if(value.followShops.length <=0){
                                  return(<Col><h4 style={{textAlign:"center"}}>You are not following any shop yet</h4></Col>)
                              }
                              else
                            return value.followShops.map(shop => {
                                                return <ShopCard key={shop.shop_id} shop={shop}/>;
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
export default ShopFollowing;