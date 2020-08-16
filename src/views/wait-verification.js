import React from "react";
import { Link } from "react-router-dom";


//import reactstrap
import{
    Container,
    Col,
    Row,
    Card,
    CardBody,
    CardTitle,
    Button
} from "reactstrap";


export default function WaitVerification(props){
    return(
    
            <div>
            <div className="main">
            <div className="section" style={{height:"100vh"}}>
            <Container className="centered">
                <Row>
             <Col md="6" lg="6" sm="12" xs="12" style={{marginLeft:"50%", marginTop:"15%",transform:"translate(-50%,-50%)"}}>
                    <Card className="card-plain" style={{backgroundColor:"white", borderRadius:"5px"}}>
                        <CardBody style={{margin:"15px"}}>
                            <div>
                            <img src={require("../assets/img/martlogo.png")} style={{maxWidth:"80px", height:"auto"}}/>
                            </div>
                            <br/>
                            <p style={{fontWeight:500, fontSize:"13px"}}> 
                               Hello,<br/>We now need to verify your Email address. We've sent an email to <a href="!#" style={{color:'red',fontWeight:500}} disabled>{props.location.state.email}</a> to verify your email
                               address. Please click on the link in the email to continue. 
                            </p>
                                <Button style={{marginTop:"50px"}} color='info'>Resend Mail</Button>
                        </CardBody>
                    </Card>
                </Col>    
               </Row>
                </Container>
                </div>
                </div>
            </div>
        
    );
}