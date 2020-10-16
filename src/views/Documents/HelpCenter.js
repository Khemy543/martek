import React,{useState} from 'react';
import axios from 'axios';

//import reactstrap
import{
    Container,
    Col,
    Row
} from "reactstrap";



export default function HelpCenter(){

    return(
        <div className="main">
                    <div className="section">
                    <Container>
                    <Row style={{marginTop:"120px"}}>
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h2 style={{fontSize:"25px", fontWeight:500}}>LET US HELP YOU </h2>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I sign up for a user account on Martek?</h4>
                                <p>
                                Signing up for an account on Martek is quick, easy and completely free! To sign up, open menu and select <b>“Sign in”</b> to open the Sign in page and select <b>“Sign up”</b> 
                                to follow the instructions. You can sign up with an email address or through your Google and Facebook account.
                                <br/>
                                <br/>
                                Once you have signed up, a link will be sent to your email with instructions on how to verify your email address.
                                </p>
                                
                        </Col>    
                    </Row>

                    <Row >
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I Sign-in and Sign-out of my account?</h4>
                                <p>
                                To Sign-in to your account, simply open menu and select “Sign-in” under the user options and enter email and password to sign-in.
                                <br/>
                                <br/>
                                To Sign-out of your account, simply click the "Sign-out" under the User options in Menu
                                 </p>
                                
                        </Col>    
                    </Row>

                    <Row >
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I change my password on Martek?</h4>
                                <p>
                                To change password, please log into your account, open menu and select your account under the User options to open your account page. Select “Edit Profile” and select “Change Password” to change your password.<br/>
                                <br/>
                                If you have forgotten your Martek password, you can go to the log-in page and click on the "Forgot your password?" l </p>
                                
                        </Col>    
                    </Row>

                    <Row >
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I change my account details?</h4>
                                <p>
                                To change the details on your account, sign in to your account and select your profile with your name under the User option in Menu.<br/>
                                </p>
                                
                        </Col>    
                    </Row>

                    <Row style={{marginTop:"30px"}}>
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>Why can't I Sign in to my account?</h4>
                                <p>
                                If you are having trouble Signing in to your account, please check that you have:<br/>
                                •	Signed up for an account.<br/>
                                •	Entered the correct email address and password on the Sign-in page. <br/>
                                <br/>
                                If you are still having trouble accessing your account, please Contact Us.
                                </p>
                                
                        </Col>    
                    </Row>

                    <Row>
                        <Col md="12" lg="12" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                                <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>Why does Martek need to verify my identity?</h4>
                                <p>
                                Martek is committed to creating a safe and trusted community of buyers and sellers. To deter fraudulent behaviour, we identify every seller who posts an item. When you post an item for the first time, we will contact you within 24 hours to verify your identity.</p>
                                
                        </Col>    
                    </Row>

                    </Container>
                </div>
        </div>
    );
}