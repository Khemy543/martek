import React from "react";
import{
    Col,
    Card,
    CardBody,
    Row,
    Button, Spinner, CardImg
} from "reactstrap";
import { ProductConsumer } from "../context";
import history from "../history.js";
import StarRatings from 'react-star-ratings';

function ShopCard(props){
        const [liked, setLiked] = React.useState(false)
        const [unliked, setUnliked] = React.useState(false);
        const [loggedIn, setLoggedIn] = React.useState(false);
        const [followers, setFollowers] = React.useState(props.shop.number_of_followers)
        const {id , shop_id, company_name ,shop_name, company_description, campus, avatar , cover_photo, avg_rating, shop_type} = props.shop;
        React.useEffect(()=>{
            let authenticated = localStorage.getItem('access_token');
            if(authenticated !== null){
             setLoggedIn(true);
            }
            else{
                setLoggedIn(false);
            }
        },[]);

        const toggleLike=()=>{
            setLiked(!liked)
        }
        const toggleUnlike=()=>{
            setUnliked(!unliked)
        }

    return(
        <Col md="3" sm="6" xs="6" style={{padding:"0px 6px"}}>
        <Card className="card-plain" style={{backgroundColor:"white", cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px"}} >
        <CardImg top id="card-cover" className="cardimage" style={{width:"96%", borderRadius:"5px", margin:"5px", objectFit:"cover"}} 
            src={cover_photo != null?`https://backend-api.martekgh.com/${cover_photo}`: require('assets/img/banner2.png')} alt="Card image cap" onClick={()=>history.push(`/user/shop-view/${shop_id||id}/${company_name || shop_name}`, 
            {id:id || shop_id}
            )}/>
            {loggedIn?
            <ProductConsumer>
                {value=>(
                    <div id="top-right" style={{backgroundColor:"white", borderRadius:"50%", height:"25px", width:"25px"}}>
                    {value.followShops.some(item=>item.shop_id === id ||item.shop_id === shop_id)?
                    <i onClick={()=>{value.unfollow(id || shop_id); toggleUnlike();setFollowers(followers-1)}} className={!unliked?"fa fa-heart":"fa fa-heart-o"} style={{fontWeight:600, color:"red", textAlign:"center", marginTop:"5px"}} />
                    :
                    <i className={!liked?"fa fa-heart-o":"fa fa-heart"} onClick={()=>{value.follow(id || shop_id); toggleLike();setFollowers(followers+1)}}  style={{color:"red",fontWeight:600, textAlign:"center", marginTop:"5px"}}/>}
                    </div>
                )}
            </ProductConsumer>
        :
        <div></div>
        }
            
        <CardBody onClick={()=>history.push(`/user/shop-view/${id||shop_id}/${company_name || shop_name}`, 
            {id:id || shop_id}
            )}>
        <Row>
        <Col md="5" lg="5" sm="6" xs="6" xl="5" onClick={()=>history.push("/user/shop-view", 
            {id:id || shop_id}
            )} className="mr-auto ml-auto">
            <div className="circular" style={{marginTop:"-70px", width:"80px",height:"80px"}}>
                <img
                    alt="#"
                    src={avatar != null?`https://backend-api.martekgh.com/${avatar}` :require('assets/img/thumbnail2.png')}
                    style={{ objectFit:"cover"}}
                />
            </div>
        </Col>
        </Row>
        <Row>
            <Col md="12" onClick={()=>history.push(`/user/shop-view/${id||shop_id}/${company_name || shop_name}`, 
                {id:id || shop_id}
                )}>
            <h5 style={{textAlign:"left", fontWeight:500, marginTop:"6px"}} className="truncate">{company_name || shop_name}</h5>
            </Col>
        </Row>
        <Row style={{marginTop:"-10px"}}>
            <Col md="8" style={{display:"flex", justifyContent:"flex-start"}}>
            <StarRatings
                rating={Number(avg_rating)}
                starRatedColor="#CFB53B"
                numberOfStars={5}
                name='rating'
                starDimension="17px"
                starSpacing="1px"
                />
                <p style={{fontWeight:500, marginLeft:"6px",marginTop:"2px",fontSize:"13px"}}>{Number(avg_rating).toFixed(1)}</p>
            </Col>
        </Row>
        <Row>
            <Col md="12">
                <h4 style={{textAlign:"left", fontWeight:500 , fontSize:"14px", marginTop:"5px"}}>{shop_type.shop_type == 'Non-student shop' ? "All" : campus.campus}</h4>
            </Col>
        </Row>
        <Row>
            <Col md="12">
                <h5 style={{textAlign:"left", marginTop:"5px", fontSize:"12px", fontWeight:500, color:"#676464"}} className="truncate">{company_description}</h5>
            </Col>
        </Row>
        <Row>
            <Col style={{textAlign:"left", color:"#676464"}}>
                <i className="fa fa-shopping-bag"/> <i className="fa fa-shopping-cart"/> <i className="fa fa-money"/>
            </Col>
        </Row>
        <Row style={{marginTop:"0px"}}>
            <Col md="12" style={{textAlign:"left",color:"#676464"}}>
                <h5 style={{display:"inline", textAlign:"left", fontSize:"14px", fontWeight:"bold"}}>{followers} </h5><h4 style={{display:"inline",fontSize:"14px"}}> | followers</h4>
            </Col>
        </Row>
        </CardBody>
    </Card>
    </Col>
    )
}


export default ShopCard;