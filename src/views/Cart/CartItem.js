import React from "react";
import history from "../../history.js";
import {
    Container,
    Card,
    CardBody,
    Col,
    Row
} from 'reactstrap'



export default function CartItem({items, value}){

console.log("value", items)
const {id, product_name, product_images, price, total, quantity} = items;
const {increment, decrement, removeItem } = value;
    return(
            <div>
            <Card style={{borderRadius:"0px", marginBottom:"8px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain" id="desktop-cat">
            <div className="row my-2 text-capitalize">
                <Col md="6" style={{borderRight:"1px solid #eaeaea"}}>
                <Row>
                    <Col md="3" onClick={() => history.push("/user/product-details",{id:id})}>
                        <div style={{textAlign:"center"}}>
                        <img
                        className="image-fluid"
                        alt="#"
                        src={`https://backend-api.martekgh.com/${product_images[0].path}`}
                        style={{height:"4.5rem", width:'4.5rem'}}
                        />
                        </div>
                    </Col>
                    <Col md="8" style={{textAlign:"left", padding:"7px 0px 4px 0px"}}>
                        <div className="Row">
                            <div className="col-12" style={{fontWeight:500, fontSize:"16px", color:"#333333",padding:"0px 15px 0px 0px"}} onClick={() => history.push("/user/product-details",{id:id})}>
                                    {product_name}
                            </div>
                            <div className="col-12" style={{marginTop:"10px",padding:"0px 15px 0px 0px", cursor:"pointer"}}>
                                <div style={{color:"#6ec7e0 "}}><h5 style={{fontSize:"14px",fontWeight:600}} onClick={()=>removeItem(id)}><i className="fa fa-trash mr-1"/> REMOVE</h5></div>
                            </div>
                        </div>
                    </Col>
                </Row>
                </Col>
                <Col md="2" style={{fontWeight:"bold",borderRight:"1px solid #eaeaea",paddingTop:"15px"}}>
                <span className="d-lg-none" >price:</span>
                ¢ {price}
                </Col>
                <Col md='2'style={{borderRight:"1px solid #eaeaea",paddingTop:"15px"}}>
                    <div className="d-flex justify-content-center">
                            <span className="btn btn-black mx-1" onClick={()=>decrement(id)}>-</span>
                            <span className="btn btn-black mx-1">{quantity}</span>
                            <span className="btn btn-black mx-1" onClick={()=>increment(id)}>+</span>
                    </div>
                </Col>
                <Col md="2" style={{fontWeight:"bold",paddingTop:"15px"}}>
                <strong className="text-uppercase">¢ </strong>
                {total}
                </Col>
                </div>
                </Card>


                <Card style={{borderRadius:"0px", marginBottom:"8px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain phone-nav" >
                <div className="row my-2 text-capitalize">
                    <Col md="6" style={{borderBottom:"1px solid #eaeaea",padding:"15px"}} onClick={() => history.push("/user/product-details",{id:id})}>
                        <Row>
                            <Col sm="4" xs="4">
                                <div style={{textAlign:"center"}}>
                                <img
                                className="image-fluid"
                                alt="#"
                                src={`https://backend-api.martekgh.com/${product_images[0].path}`}
                                style={{height:"4.5rem", width:'4.5rem'}}
                                />
                                </div>
                            </Col>
                            <Col sm="8" xs="8" style={{textAlign:"left", padding:"7px 0px 4px 0px"}}>
                                    <div  style={{fontWeight:500, fontSize:"16px", color:"#333333",padding:"0px 15px 0px 0px"}}>
                                            {product_name}
                                    </div>
                                    <strong style={{fontWeight:500}}>Gh¢ {price}</strong>
                                    
                            </Col>
                        </Row>
                        </Col>
                        <Col md="6">
                        <Row>
                        <Col md="6" sm="5" xs="5" style={{fontWeight:"bold",borderRight:"1px solid #eaeaea", padding:"10px 10px 10px 25px"}}>
                            <div>
                                <div style={{color:"#6ec7e0 "}} onClick={()=>removeItem(id)}><h5 style={{fontSize:"14px",fontWeight:600}}><i className="fa fa-trash mr-1"/> REMOVE</h5></div>
                            </div>
                            <strong className="text-uppercase">GH¢ </strong>
                            {total}
                        </Col>
                        <Col md='6' sm="7" xs="7" style={{paddingTop:"15px"}}>
                            <div className="d-flex justify-content-center">
                                <span className="btn btn-black mx-1" onClick={()=>decrement(id)}>-</span>
                                <span className="btn btn-black mx-1">{quantity}</span>
                                <span className="btn btn-black mx-1" onClick={()=>increment(id)}>+</span>
                            </div>
                        </Col>
                        </Row>
                        </Col>
                    </div>
                </Card>
            </div>
        
    );
}