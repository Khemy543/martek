import React,{useState} from 'react';
import axios from 'axios';

//import reactstrap
import{
    Container,
    Col,
    Row,
    Table,
} from "reactstrap";



export default function Charges(){

    return(
        <div className="main">
                    <div className="section">
                    <Container>
                    <Row style={{marginTop:"120px"}}>
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h2 style={{fontSize:"25px", fontWeight:500}}>Service Charges</h2>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>Sell an Item</h4>
                                <p>
                                    Selling on Martek for the first time is free! Sign up on Martek and get 3 months free of selling charges.<br/>
                                    After the promo period, you will be charged a fee depending oon the price of the item being sold. You can take a look at the fee structure below:<br/>
                                </p>
                                
                        </Col>    
                    </Row>

                    <Row>
                        <Col md="12">
                            <Table bordered striped>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Item cost (GHS)</th>
                                    <th>Fee/Charge (GHS)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>0.1 – 20.00</td>
                                    <td>Free</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>20.1 – 1,000.00</td>
                                    <td>1% of item cost</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>1,000.01 – 3,000.00</td>
                                    <td>12</td>
                                </tr>
                                <tr>
                                    <td>4</td>
                                    <td>3,000.01 and above</td>
                                    <td>15</td>
                                </tr>    
                                </tbody>
                            </Table>
                        </Col>
                    </Row>

                    <Row style={{marginTop:"120px"}}>
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>Own a Shop</h4>
                                <p>
                                Owning a shop on Martek is free for the first semester of registration! Sign up on Martek s a Shop owner and sell for free for one whole semester.<br/>
                                After this period, you will be charged a monthly subscription fee depending on the type of shop you own. You can take a look at the fee structure below:

                                </p>
                                
                        </Col>    
                    </Row>

                    <Row>
                        <Col md="12">
                            <Table bordered striped>
                                <thead>
                                <tr>
                                    <th>#</th>
                                    <th>Type</th>
                                    <th>Fee (GHS)</th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <td>1</td>
                                    <td>Mini-Shop</td>
                                    <td>20</td>
                                </tr>
                                <tr>
                                    <td>2</td>
                                    <td>Max-Shop</td>
                                    <td>40</td>
                                </tr>
                                <tr>
                                    <td>3</td>
                                    <td>Non-Student Shop</td>
                                    <td>80</td>
                                </tr>   
                                </tbody>
                            </Table>
                        </Col>
                    </Row>
                    </Container>
                </div>
        </div>
    );
}