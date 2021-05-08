import React from 'react';
import {
    Col,
    Card,
    CardBody,
    Row,
    Button,
    CardImg
} from 'reactstrap';
import history from "../history.js";

function FollowingShpCard(props){
    const {id , shop_id, company_name ,shop_name, company_description, campus, shop_avatar , cover_photo, avg_rating} = props.shop;
    React.useEffect(()=>{

    },[])

    return(
        <Col md="3" sm="6" xs="6" style={{padding:"0px 6px"}} onClick={()=>history.push(`/user/shop-view/${id||shop_id}/${company_name || shop_name}`)}>
            <Card  className="card-plain" style={{backgroundColor:"white", cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px"}}>
                <CardBody>
                    <Row>
                        <Col md="5">
                        <div className="circular" style={{ width:"80px",height:"80px"}}>
                            <img
                                alt="#"
                                src={shop_avatar != null ? `https://backend-api.martekgh.com/${shop_avatar}` : require('assets/img/thumbnail1.png')}
                                style={{ objectFit:"cover"}}
                            />
                        </div>
                        </Col>
                        <Col md="7">
                        <h5 style={{textAlign:"left", fontWeight:500, marginTop:"6px"}} className="truncate">{company_name || shop_name}</h5>
                        <h5 style={{textAlign:"left", marginTop:"5px", fontSize:"12px", fontWeight:500, color:"#676464"}} className="truncate">{company_description}</h5>
                        </Col>
                    </Row>
                </CardBody>
            </Card>
        </Col>
    );
}
export default FollowingShpCard;