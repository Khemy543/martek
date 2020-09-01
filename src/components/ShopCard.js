import React from "react";
import{
    Col,
    Card,
    CardBody,
    Row,
    Button, Spinner
} from "reactstrap";
import { ProductConsumer } from "../context";
import history from "../history.js";

function ShopCard(props){
        const [followloader, setfollowLoader] = React.useState(false)
        const [followingloader, setfollowingLoader] = React.useState(false);
        const [loggedIn, setLoggedIn] = React.useState(false);
        const {id , shop_id, company_name ,shop_name, company_description } = props.shop;
        React.useEffect(()=>{
            let authenticated = localStorage.getItem('access_token');
            if(authenticated !== null){
             setLoggedIn(true);
            }
            else{
                setLoggedIn(false);
            }
        },[])
    return(
        <Col md="6">
        <Card className="card-plain" style={{backgroundColor:"white", cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
    <CardBody>
    <Row>
    <Col md="4" lg="3" sm="3" xs="3" onClick={()=>history.push("/user/shop-view", 
        {id:id || shop_id}
        )} className="mt-auto mb-auto">
        <div className="avatar">
              <img
                alt="#"
                className="img-circle img-no-padding img-responsive"
                src={require("../assets/img/new_logo.png")}
                style={{border:"1px solid #eaeaea"}}
              />
            </div>
    </Col>
    <Col lg="6" md="6" sm="4" xs="4" className="mt-auto mb-auto" style={{padding: "0px 0px 0px 0px"}}>
    <Row>
        
    <Col md="12" className="mt-auto mb-auto" onClick={()=>history.push("/user/shop-view", 
        {id:id || shop_id}
        )}>
    <h4 style={{textAlign:"left", fontWeight:500, marginTop:"-10px"}} className="truncate">{company_name || shop_name}</h4>
    <p style={{textAlign:"left"}} className="truncate">{company_description}</p>
    </Col>
    </Row>
    </Col>
    <Col md="2" lg="2" xs="5" sm="5" className="mt-auto mb-auto">
    {loggedIn?
    <ProductConsumer>
        {value=>(
            <div>
               
    {value.followShops.find(item=>item.shop_id===id ||shop_id)?<Button style={{fontSize:"9px"}} className="btn-round" color="info" onClick={()=>{value.unfollow(id || shop_id); setfollowingLoader(true); setfollowLoader(false)}}>{followingloader?<Spinner animation="grow" size="sm"/>:<p style={{fontWeight:1000, fontSize:"10px"}}>following</p>}</Button>:<Button style={{fontSize:"9px"}} color='danger' className="btn-round" onClick={()=>{value.follow(id || shop_id); setfollowLoader(true); setfollowingLoader(false);}}>{followloader?<Spinner animation="grow" size="sm"/>:<p style={{fontWeight:1000, fontSize:"10px"}}>+follow</p>}</Button>}
    
    </div>
        )}
    </ProductConsumer>
    :
    <div></div>
    }
    </Col>
    </Row>
    </CardBody>
    </Card>
    </Col>
    )
}


export default ShopCard;