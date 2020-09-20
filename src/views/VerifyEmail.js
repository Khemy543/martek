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
    CardTitle,
    Button
} from "reactstrap";

var domain = "https://martek.herokuapp.com/"
export default function VerifyEmail(props){

    const handleVerify=()=>{
        console.log(props.location);
        const param = queryString.parse(props.location.search);
        console.log(param.token);
        let token = param.token;
        axios.post(`${domain}/api/email/verify`,token)
        .then(res=>{
            console.log(res.data)
        })
        .catch(error=>{
            console.log(error.response.data)
        })


    }
    return(
    
            <div>
            <div className="main">
            <div className="section" style={{height:"100vh"}}>
            <Container className="centered">
                <Row>
             <Col md="6" lg="6" sm="12" xs="12" style={{marginLeft:"50%", marginTop:"15%",transform:"translate(-50%,-50%)"}}>
                    <Card className="card-plain shadow" style={{backgroundColor:"white", borderRadius:"5px"}}>
                        <CardBody style={{margin:"15px"}}>
                            <div>
                            <img src={require("../assets/img/martlogo.png")} style={{maxWidth:"80px", height:"auto"}}/>
                            </div>
                            <br/>
                            <p style={{fontWeight:500}}> 
                                Welcome to Martek,<br/>You are almost done. Please click on the button below to verify your email.
                            </p>
                                <Button style={{marginTop:"50px"}} color='success'
                                onClick={()=>handleVerify()}
                                >click to verify</Button>
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