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
    Button, Alert, Input, InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";

var domain = "https://martek.herokuapp.com"
export default function ResetPassword(props){
    const [message, setMessage] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [eye1 , setEye1]= React.useState(false);
    const [eye2 , setEye2]= React.useState(false);

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
                            <Col md="12">
                            <p style={{fontWeight:500}}>Enter Your New Password.</p>
                            </Col>
                        </Row>
                            <br/>
                            <form>
                            <label style={{fontWeight:500}}>New Password</label>
                            <InputGroup>
                            <Input type={!eye1?"password":"text"} placeholder="New Password" required/>
                            <InputGroupAddon addonType="append">
                            <InputGroupText>
                                <i className={eye1?"fa fa-eye":"fa fa-eye-slash"}  onClick={()=>setEye1(!eye1)}/>
                            </InputGroupText>
                            </InputGroupAddon>
                            </InputGroup>
                            <br/>
                            <label style={{fontWeight:500}}>ReType Password</label>
                            <InputGroup>
                            <Input type={!eye2?"password":"text"} placeholder="ReType Password" required/>
                                    <InputGroupAddon addonType="append">
                                <InputGroupText>
                                    <i className={eye2?"fa fa-eye":"fa fa-eye-slash"}  onClick={()=>setEye2(!eye2)}/>
                                </InputGroupText>
                                </InputGroupAddon>
                            </InputGroup>
                            <br/>
                            <Button style={{marginTop:"50px"}} block color='success'>Submit</Button>
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