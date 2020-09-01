/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
import { Link} from "react-router-dom";
// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col, Alert,InputGroup,InputGroupAddon,InputGroupText } from "reactstrap";
import history from "../../history.js";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

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

function LoginPage(props){
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isActive, setIsActive] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [eye, setEye] = React.useState(false);
  //const [loggedin, setLoggedin] =React.useState(false);
  //const [modal, setModal] = React.useState(false);

  const toggleEye = () => setEye(!eye);
    

  var storageData= [];

  const handleSubmit = (e) =>{
    e.preventDefault();
     setIsActive(true)
  axios.post('https://martek.herokuapp.com/api/auth/login', {
    config, email, password
  }).then(res => {
    if(res.data.statusCode === 200){
        localStorage.setItem('access_token',res.data.access_token);
        window.location.reload("/")
        setIsActive(false);
        
    }
    
    
  }).catch(error => {
    setIsActive(false);
    setAlert(true)
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
      <LoadingOverlay 
      active = {isActive}
      spinner={<BounceLoader color={'#4071e1'}/>}
      >
      <div
        className="page-header"
        style={{
          backgroundImage: "url(" + require("assets/img/header.jpg") + ")"
        }}
      >
        <div className="filter" />
        <Container style={{marginTop:"40px"}}>
          <Row>
            
            <Col className="ml-auto mr-auto" lg="4">
            
              <Card className="card-register ml-auto mr-auto" color="info">
                <div style={{textAlign:"center"}}> 
                <img src={require("../../assets/img/martlogo.png")} style={{maxWidth:"130px", height:"auto", marginBottom:"10px"}}/>
                </div>
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
                  <Button block className="btn-round" color="info">
                    Login
                  </Button>
                </Form>
                <div className="forgot">

                  <Button
                    className="btn-link"
                    tag={Link}
                    to="!#"
                  >
                    Forgot password?
                  </Button> 
                  <Button
                    className="btn-link"
                    color="danger"
                    tag={Link}
                    to="/auth/register"
                  >
                    Sign up !!
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
      </LoadingOverlay>
    </div>
  );
}

export default LoginPage;
