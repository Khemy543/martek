import React from "react";
import { Link} from "react-router-dom";
// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col, Alert,InputGroup,InputGroupAddon,InputGroupText, Spinner } from "reactstrap";
import history from "../history.js";
import swal from 'sweetalert';

//axios
import axios from "axios";

axios.defaults.withCredentials = false;
  //axios.defaults.headers.common['Auth-Token'] = 'foo bar';
  const config = {
    withCredentials: false, 
    headers : {
    "Access-Control-Allow-Origin":"*",
    "Content-Type": "application/json",
    "Accept": "application/json"
    
    },
  
  };

export default function ShopLoginPage(props) {

  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isActive, setIsActive] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [eye, setEye] = React.useState(false);

  const toggleEye = () => setEye(!eye);
    

  var storageData= [];

  const handleSubmit = (e) =>{
    e.preventDefault();
    setIsActive(true)
  axios.post('https://backend-api.martekgh.com/api/merchandiser/login', {
    config, email, password
  }).then(res => {
        localStorage.setItem('shop_access_token', res.data.access_token)
        history.push("/shop/shop-page")
    
  }).catch(error => {
    setIsActive(false);
    swal({
      title: "Invalid Credentials",
      text: "Please Try Again!",
      icon: "error",
      buttons:false,
      timer:2000
    })
  })

}


document.documentElement.classList.remove("nav-open");
React.useEffect(() => {
  document.body.classList.add("register-page");
  return function cleanup() {
    document.body.classList.remove("register-page");
  };
});
return (
  <div>
    <div
      className="page-header"
      style={{
        backgroundImage: "url(" + require("assets/img/register-image.jpg") + ")"
      }}
    >
      <div className="filter" />
      <Container style={{marginTop:"40px"}}>
        <Row>
          <Col className="ml-auto mr-auto" lg="4">
          
            <Card className="card-register ml-auto mr-auto" color="info">
              <Row>
                <Col>
                <div style={{textAlign:"center"}}> 
                 <img src={require("../assets/img/martlogo.png")} style={{maxWidth:"130px", height:"auto", marginBottom:"10px"}}/>
                </div>
                </Col>
                <Col style={{borderLeft:"1px solid #695b5b"}}>
                  <h4 style={{fontWeight:500, margin:"10px 0px 0px",color:"#695b5b",fontSize:"18px"}}>Shop Login</h4>
                </Col>
              </Row>
              {alert?
                <Alert color="warning" fade={true} style={{textAlign:"center"}}>
                Incorrect Credentials
              </Alert>
              :
              <div>
              </div>
              }
              
              <Form className="register-form" onSubmit={handleSubmit}>
                <label style={{fontWeight:500}}>Email</label>
                <Input placeholder="Email" type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                <label style={{fontWeight:500}}>Password</label>
                <InputGroup>
                <Input placeholder="Password" type={eye?"text":"password"} name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                <InputGroupAddon addonType="append">
                  <InputGroupText>
                  <i className={eye?"fa fa-eye-slash":"fa fa-eye"} onClick={toggleEye} style={{cursor:"pointer"}}/>
                  </InputGroupText>
                </InputGroupAddon>
                </InputGroup>
                {!isActive?
                <Button block className="btn-round" color="info">
                  Login
                </Button>
                :
                <Button block className="btn-round" color="info" disabled>
                  <Spinner size="sm" />
                </Button>
                }
              </Form>
              <div className="forgot">
                <Button
                  className="btn-link"
                  color="warning"
                  tag={Link}
                  to="/user/shop/free-trial"
                >
                  Own a shop
                </Button>

                <Button
                  className="btn-link"
                  tag={Link}
                  to="/auth/shop-forgot-password"
                  style={{marginTop:"-10px"}}
                >
                  Forgot password?
                </Button> 
                
              </div>
            </Card>
          </Col>
        </Row>
      </Container>
      <div className="footer register-footer text-center">
        <h6>
          © {new Date().getFullYear()}, made with{" "}
          <i className="fa fa-heart heart" /> martek
        </h6>
      </div>
    </div>
  </div>
);
}