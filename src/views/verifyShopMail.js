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
    Button, Alert
} from "reactstrap";

var domain = "http://backend-api.martekgh.com"
export default function VerifyShopEmail(props){
    const [message, setMessage] = React.useState("");
    const [visible, setVisible] = React.useState(false);

    const toggle=()=>setVisible(!visible);

    const handleVerify=()=>{
        console.log(props.location);
        const param = queryString.parse(props.location.search);
        console.log(param.token);
        let token = param.token;
        axios.post(`${domain}/api/merchandiser/email/verify`,{token:token})
        .then(res=>{
            console.log(res.data);
            if(res.data.message === "verified"){
                props.history.push("/user/home")
            }
        })
        .catch(error=>{
            if(error.response){
            console.log(error.response.data)
            setMessage(error.response.data.message);
            setVisible(true)
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
                    <Alert isOpen={visible} toggle={toggle}  color="danger" fade={true} style={{fontWeight:500, textTransform:"capitalize"}}>
                        {message}
                    </Alert>
                    </div>
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