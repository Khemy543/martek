import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";


//import reactstrap
import{
    Container,
    Col,
    Row,
    Card,
    CardBody,
    CardTitle,
    Alert,
    Button
} from "reactstrap";

var domain ="https://martek.herokuapp.com"
export default function WaitShopVerification(props){
    const [message, setMessage] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [color, setColor] = React.useState("success");

    const toggle=()=>setVisible(!visible);

    const handleResend=()=>{
        let email=props.location.state.email
        axios.post(`${domain}/api/auth/email/resend`,{email:email})
        .then(res=>{
            console.log(res.data);
            setMessage(res.data.message);
            setVisible(true);
            setColor("success")
        })
        .catch(error=>{
            if(error.response){
            console.log(error.response.data)
            setMessage(error.response.data.message);
            setVisible(true);
            setColor("danger")
        }
        })
    }
    return(
    
            <div>
            <div className="main">
            <div className="section" style={{height:"100vh"}}>
            <Container className="centered">
                <Row>
             <Col md="6" lg="6" sm="12" xs="12" style={{marginLeft:"50%", marginTop:"15%",transform:"translate(-50%,-50%)"}}>
                    <div>
                    <Alert isOpen={visible} toggle={toggle}  color={color} fade={true} style={{fontWeight:500, textTransform:"capitalize"}}>
                        {message}
                    </Alert>
                    </div>
                    <Card className="card-plain" style={{backgroundColor:"white", borderRadius:"5px"}}>
                        <CardBody style={{margin:"15px"}}>
                            <div>
                            <img src={require("../assets/img/martlogo.png")} style={{maxWidth:"80px", height:"auto"}}/>
                            </div>
                            <br/>
                            <p style={{fontWeight:500, fontSize:"13px"}}> 
                               Hello,<br/>We now need to verify your Email address. We've sent an email to to verify your email
                               address <span style={{color:"#00acff"}}>{props.location.state.email}</span>. Please click on the link in the email to continue. 
                            </p>
                                <Button style={{marginTop:"50px"}} color='info' onClick={()=>handleResend()}>Resend Mail</Button>
                        </CardBody>
                    </Card>
                    <a href="/user/home"
                    style={{float:"right", marginRight:"10px",fontWeight:600, color:"#da8451"}}
                    >skip <i className="fa fa-chevron-right"/></a>
                </Col>    
               </Row>
                </Container>
                </div>
                </div>
            </div>
        
    );
}