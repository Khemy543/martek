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

var domain = "https://backend-api.martekgh.com"
export default function ForgotPassword(props){
    const [email, setEmail] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [message, setMessage]= React.useState("");
    const [color, setColor] = React.useState("");

    const toggle=()=>setVisible(!visible);

   const handleSubmit=(e)=>{
    e.preventDefault();
    axios.post(`${domain}/api/auth/request/password/reset`,
    {email})
    .then(res=>{
        setColor("success")
        setMessage(res.data.status);
        setVisible(true);
    })
    .catch(error=>{
        setMessage(error.response.data.status)
        setVisible(true)
        setColor("danger")
    })
   }
    return(
    
            <div
            className="page-header"
            style={{height:"100vh"}}>
            
            <Container className="centered">
            <Row style={{marginTop:"100px"}}>
             <Col md="6" lg="6" sm="12" xs="12" style={{marginLeft:"50%", marginTop:"20%",transform:"translate(-50%,-50%)"}}>
                    <div>
                    <Alert isOpen={visible} toggle={toggle}  color={`${color}`} fade={true} style={{fontWeight:500, textTransform:"capitalize"}}>
                        {message}
                    </Alert>
                    </div>
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
                            <form onSubmit={handleSubmit}>
                            <label style={{fontWeight:500}}>Email Address</label>
                            <Input type="email" placeholder="eg: example@gmail.com" value={email} onChange={e=>setEmail(e.target.value)} required/>
                            <Button style={{marginTop:"50px"}} type="submit" block color='success'>Reset Password</Button>
                            </form>
                        </CardBody>
                    </Card>
                </Col>    
               </Row>
                </Container>
            </div>
        
    );
}