import React,{useState} from 'react';
import axios from 'axios';

//import reactstrap
import{
    Container,
    Col,
    Row,
    Card,
    CardBody,
    Button, Alert,
    Form, Modal, ModalBody, ModalHeader, Input, InputGroup,
    InputGroupAddon,InputGroupText, ModalFooter,CardHeader
} from "reactstrap";



export default function BuyOnMartek(){

    return(
        <div className="main">
                    <div className="section">
                    <Container>
                    <Row style={{marginTop:"200px"}}>
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h2 style={{fontSize:"25px", fontWeight:500}}>How to buy on Martek</h2>
                                
                                <p>
                                1.	Type the product you are searching for directly into the search bar<br/><br/>
                                2.	Or browse through the different categories <br/><br/>
                                3.	Or scroll through our NEW THIS WEEK section on the home page to find the best deals<br/><br/>
                                4.	On the product page click “BUY NOW” to call or send a message to the seller through WhatsApp or mail.<br/><br/>
                                5.	Or on the product page click “ADD TO CART” to buy later<br/><br/>
                                6.	View cart to see item in your cart, select item and proceed to buy now.<br/>

                                 </p>
                                
                        </Col>    
                    </Row>
                    </Container>
                </div>
        </div>
    );
}