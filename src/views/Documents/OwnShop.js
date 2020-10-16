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



export default function OwnShopMartek(){

    return(
        <div className="main">
                    <div className="section">
                    <Container>
                    <Row style={{marginTop:"120px"}}>
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h2 style={{fontSize:"25px", fontWeight:500}}>Own a Shop on Martek</h2>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I own a shop on Martek?</h4>
                                <p>
                                To own a shop on Martek, simply open menu and select “My Shop” from the Martek options to open the Shop Sign-in page. Select Register and follow the instructions to own a shop. </p>
                                
                        </Col>    
                    </Row>
                    <Row >
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I add an item in my shop?</h4>
                                <p>
                                To add an item to your shop, open your shop account, select add item and provide product details to add an item to your shop.
                                </p>
                                
                        </Col>    
                    </Row>
                    <Row >
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I edit an item in my shop?</h4>
                                <p>
                                To edit an item in your shop, long in to your shop select item to open item page. Select edit product and make the appropriate changes and select “Save Changes”
                                </p>
                                
                        </Col>    
                    </Row>
                    <Row >
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I go back to back to Martek Home page form My shop?</h4>
                                <p>
                                Simply open “Menu” in my shop and select “Back to Site”.
                                </p>
                        </Col>    
                    </Row>
                    <Row >
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do Sign-out of my shop?</h4>
                                <p>
                                Select the Sign-out option in menu to “Sign out”.
                                 </p>
                                
                        </Col>    
                    </Row>
                    <Row style={{marginTop:"120px"}}>
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>What are the rules for posting on Martek?</h4>
                                <p>
                                We don't allow ads that contain:<br/><br/>
                                •	an item or service that is illegal in Ghana <br/>
                                •	an item or service that is not located in Ghana<br/>
                                •	an invalid phone number or email address<br/>
                                •	an unrealistic offer<br/>
                                •	offensive language<br/>
                                •	offensive pictures<br/>
                                •	text in the title or description that is not related to the advertised item or service<br/>
                                •	pictures that do not match or clearly show the advertised item or service<br/>
                                •	text in the pictures (except logos and product codes)<br/>
                                •	multiple items in the same advertisement<br/>
                                •	counterfeit goods, knockoffs or replica versions of another company’s product<br/>

                                </p>
                                
                        </Col>    
                    </Row>
                    </Container>
                </div>
        </div>
    );
}