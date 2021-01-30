import React from "react";
import { Link} from "react-router-dom";
// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col, Alert,InputGroup,InputGroupAddon,InputGroupText, Spinner } from "reactstrap";
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

  const toggleEye = () => setEye(!eye);
    

  const handleSubmit = (e) =>{
    e.preventDefault();
     setIsActive(true)
  axios.post('https://backend-api.martekgh.com/api/auth/login', {
    config, email, password
  }).then(res => {
    console.log(res.data)
    if(res.data.statusCode === 200){
        localStorage.setItem('access_token',res.data.access_token);
        window.location.reload("/")
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
                  <Input placeholder="Email" type="text" style={{fontWeight:500}} name="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                  <label style={{fontWeight:500}}>Password</label>
                  <InputGroup>
                  <Input placeholder="Password" style={{fontWeight:500}} type={eye?"text":"password"} name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                    <i className={eye?"fa fa-eye-slash":"fa fa-eye"} onClick={toggleEye} style={{cursor:"pointer"}}/>
                    </InputGroupText>
                  </InputGroupAddon>
                  </InputGroup>
                  {!isActive?
                  <Button block className="btn-round" color="info" type='submit'>
                    Login
                  </Button>
                  :
                  <Button block className="btn-round" color="info">
                    <Spinner size="sm" />
                  </Button>
                  }
                </Form>
                <div className="forgot">

                  <Button
                    className="btn-link"
                    tag={Link}
                    to="/auth/forgot-password"
                  >
                    Forgot password?
                  </Button> 
                  <Button
                    className="btn-link"
                    color="danger"
                    tag={Link}
                    to="/user/register"
                  >
                    Sign up
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

export default LoginPage;
