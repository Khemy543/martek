import React from "react";
import { Link } from "react-router-dom";
import queryString from 'query-string'
import axios from "axios";

//import reactstrap
import{
    Container,
    Col,
    Row,
    Card,
    CardBody,
    Button, Alert, Input
} from "reactstrap";

var domain = "https://martek.herokuapp.com"
export default function ForgotPassword(props){
    const [message, setMessage] = React.useState("");
    const [visible, setVisible] = React.useState(false);

    const toggle=()=>setVisible(!visible);

   
    return(
    
            <div>
            <div className="main">
            <div className="section" style={{height:"100vh"}}>
            
            <Container className="centered">
            <Row>
             <Col md="6" lg="6" sm="12" xs="12" style={{marginLeft:"50%", marginTop:"15%",transform:"translate(-50%,-50%)"}}>
                   {/*  <div>
                    <Alert isOpen={visible} toggle={toggle}  color="danger" fade={true} style={{fontWeight:500, textTransform:"capitalize"}}>
                        {message}
                    </Alert>
                    </div> */}
                    <h4 style={{fontSize:"14px", textAlign:"center", fontWeight:500, marginBottom:"10px"}}>Forgot your password?</h4>
                    <Card className="card-plain shadow" style={{backgroundColor:"white", borderRadius:"5px"}}>
                        <CardBody style={{margin:"15px"}}>
                        <Row>
                            <Col md="1"><i className="fa fa-lock fa-2x" style={{color:"#ff6a00de"}}/></Col>
                            <Col md="11">
                            <p style={{fontWeight:500}}>Enter your email address and we'll send you a link to reset your password.</p>
                            </Col>
                        </Row>
                            <br/>
                            <form>
                            <label style={{fontWeight:500}}>Email Address</label>
                            <Input type="email" placeholder="eg: example@gmail.com"/>
                            <Button style={{marginTop:"50px"}} block color='success'>Reset Password</Button>
                            </form>
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