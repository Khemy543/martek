import React from "react";
//import axios from "axios";
// core components
import history from "../history.js";
//import { Link } from "react-router-dom";

//react strap
import{
    Container,
    Row,
    Col
} from "reactstrap";
import axios from 'axios';
import ShopCard from "../components/ShopCard.js";

const user = localStorage.getItem('access_token')

function ShopFollowing(props){
    const [shops, setShops] = React.useState([]);

    React.useEffect(()=>{
        axios.get("https://backend-api.martekgh.com/api/following-shops",
        {headers:{'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            setShops(res.data)
        })
        .catch(error=>{
            console.log(error)
        })
    
    },[])
    return(
        <div>
            <div className="main">
                <div className="section">
                <br/>
                <br/>
                <Container>
                <p style={{marginBottom:"10px", fontSize:"13px"}}><span style={{cursor:"pointer"}} onClick={()=>history.push("/user/home")}>Home</span><i className="fa fa-chevron-right"/> shops following</p>
                <Row>
                        {shops.length <=0?
                            <Col><h4 style={{textAlign:"center"}}>You are not following any shop yet</h4></Col>
                            :
                            <>
                            {shops.map((shop)=>(
                                <ShopCard key={shop.shop_id} shop={shop}/>
                            ))}
                            </>
                        }
                        </Row>
                </Container>
                </div>
                </div>
            </div>
    );
}
export default ShopFollowing;