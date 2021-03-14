import React from "react";
//import axios from "axios";
// core components
import history from "../history.js";
//import { Link } from "react-router-dom";
import { ProductConsumer } from "../context";

//react strap
import{
    Container,
    Row,
    Col
} from "reactstrap";
import FollowingShpCard from "components/FollowingShopCard.js";

const user = localStorage.getItem('access_token')

function ShopFollowing(props){
    return(
        <div>
            <div className="main">
                <div className="section">
                <br/>
                <br/>
                <Container>
                <p style={{marginBottom:"10px", fontSize:"13px"}}><span style={{cursor:"pointer"}} onClick={()=>history.push("/user/home")}>Home</span><i className="fa fa-chevron-right"/> shops following</p>
                <ProductConsumer>
                    {value=>(
                    <Row>
                        {value.followShops.length <=0?
                            <Col><h4 style={{textAlign:"center"}}>You are not following any shop yet</h4></Col>
                            :
                            <>
                            {value.followShops.map((shop)=>(
                                <FollowingShpCard key={shop.shop_id} shop={shop}/>
                            ))}
                            </>
                        }
                    </Row>
                    )}
                </ProductConsumer>
                </Container>
                </div>
                </div>
            </div>
    );
}
export default ShopFollowing;