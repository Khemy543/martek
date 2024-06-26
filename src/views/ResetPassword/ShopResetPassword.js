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
    Button, Alert, Input, InputGroup, InputGroupAddon, InputGroupText,FormFeedback
} from "reactstrap";

var domain = "https://backend-api.martekgh.com"
export default function ShopResetPassword(props){
    const [message, setMessage] = React.useState("");
    const [password,setPassword]=React.useState("");
    const [confirmPassword, setConfirmPassword] = React.useState("");
    const [visible, setVisible] = React.useState(false);
    const [color, setColor] = React.useState("");
    const [eye1 , setEye1]= React.useState(false);
    const [eye2 , setEye2]= React.useState(false);
    const [errors , setErrors] = React.useState([]);

    const toggle=()=>setVisible(!visible);

    const handleSubmit=(e)=>{
        e.preventDefault()
        let tempErrors = {};
        if(password.length < 6){
            tempErrors.password = "Password must have more than 6 characters";
        }

        if(password != confirmPassword){
            tempErrors.confrim_password = "Passwords do not match";
        }

        if(!(Object.keys(tempErrors).length === 0 && tempErrors.constructor === Object)){
            setErrors(tempErrors);
            return;
        }
        const param = queryString.parse(props.location.search);
        let token = param.token;
        axios.post(`${domain}/api/merchandiser/reset/password`,
        {password,token})
        .then(res=>{
            setColor("success")
            setMessage(res.data.status);
            setVisible(true);
        })
        .catch(error=>{
            if(error.response.status == 422){
                setErrors(error.response.data.errors)
            }
        })
}
   
    return(
    
            <div
            className="page-header"
            style={{height:"100vh"}}>
            
            <Container className="centered">
            <Row style={{marginTop:"150px"}}>
             <Col md="6" lg="6" sm="12" xs="12" style={{marginLeft:"50%", marginTop:"15%",transform:"translate(-50%,-50%)"}}>
                    <div>
                    <Alert isOpen={visible} toggle={toggle}  color={`${color}`} fade={true} style={{fontWeight:500, textTransform:"capitalize"}}>
                        {message}
                    </Alert>
                    </div>
                    <h4 style={{fontSize:"14px", textAlign:"center", fontWeight:500, marginBottom:"10px"}}>Forgot your password?</h4>
                    <Card className="card-plain shadow" style={{backgroundColor:"white", borderRadius:"5px"}}>
                        <CardBody style={{margin:"15px"}}>
                        <Row>
                            <Col md="12">
                            <p style={{fontWeight:500}}>Enter Your New Password.</p>
                            </Col>
                        </Row>
                            <br/>
                            <form onSubmit={handleSubmit}>
                            <label style={{fontWeight:500}}>New Password</label>
                            <Input invalid={errors.password} type={!eye1?"password":"text"} placeholder="New Password" required value={password} onChange={e=>setPassword(e.target.value)}/>
                            <FormFeedback style={{fontWeight:500}}>{errors.password}</FormFeedback>
                            <br/>
                            <label style={{fontWeight:500}}>ReType Password</label>
                            <Input invalid={errors.confrim_password} type={!eye2?"password":"text"} placeholder="ReType Password" required value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
                            <FormFeedback style={{fontWeight:500}}>{errors.confrim_password}</FormFeedback>
                            <br/>
                            <Button style={{marginTop:"50px"}} block color='success' type="submit" >Submit</Button>
                            </form>
                        </CardBody>
                    </Card>
                </Col>    
               </Row>
                </Container>
            </div>
        
    );
}