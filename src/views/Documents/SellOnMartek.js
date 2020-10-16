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



export default function SellOnMartek(){

    return(
        <div className="main">
                    <div className="section">
                    <Container>
                    <Row style={{marginTop:"120px"}}>
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h2 style={{fontSize:"25px", fontWeight:500}}>Sell on Martek</h2>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I sell an item on Martek?</h4>
                                <p>
                                To delete an item, open menu and select “My Item” under the User option to open the “My Item” page to delete your item
                                </p>
                                
                        </Col>    
                    </Row>

                    <Row >
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I edit my item?</h4>
                                <p>
                                To delete an item, open menu and select “My Item” under the User option to open the “My Item” page to edit your item

                                </p>
                                
                        </Col>    
                    </Row>
                    <Row >
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How long does an item stay on Martek?</h4>
                                <p>
                                Item appear for 30 days, unless you delete them earlier.

                                </p>
                                
                        </Col>    
                    </Row>
                    <Row style={{marginTop:"90px"}}>
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>I posted an item but can't find it. What's wrong?</h4>
                                <p>
                                Tip: you can keep track of your item easily by logging in to your account and visiting your "My Item" page!
                                <br/>
                                <br/>
                                Your item may not be live due to one of the following reasons:<br/>
                                • It is still under review - this will show on your “My item” page, under “Item under review”<br/>
                                • It may have violated our posting rule [hyperlink]<br/>
                                • You have used up your free ad allowance<br/>
                                If you have been waiting longer than 24 hours for a response from us, you may have given us the wrong contact details when you posted the item. Try posting again or contact us.
                                </p>
                                
                        </Col>    
                    </Row>
                    <Row >
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>Why has my item been rejected?</h4>
                                <p>
                                All of the items are manually reviewed - if your item violates our posting rules it will be rejected. You can read what changes you have to make before the item can be approved in the rejection email.
                                </p>
                                
                        </Col>    
                    </Row>
                    <Row >
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>I'm getting contacted about an item I didn't post. Can you help me?</h4>
                                <p>
                                Of course. Please contact us and we will help you right away.
                                </p>
                                
                        </Col>    
                    </Row>
                    <Row style={{marginTop:"120px"}}>
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>What are the rules for posting on Martek?</h4>
                                <p>
                                We don't allow ads that contain:<br/>
                                •	an item or service that is illegal in Ghana<br/>
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