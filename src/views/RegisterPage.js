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

// reactstrap components
import { Button, Card, Form, Input, Container, Row, Col ,Modal, ModalBody,Alert,InputGroup,InputGroupAddon,InputGroupText} from "reactstrap";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import  history  from "../history.js";

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


function RegisterPage() {

  //states
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [campus_id, setCampus_id] = React.useState(1);
  const [campusList, setCampusList]=React.useState([]);
  const [isActive, setIsActive] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [errorMessage, setErrorMessage ] = React.useState("");
  const [confrimPassword, setConfirmPassword] = React.useState("");


  React.useEffect(()=>{
      setIsActive(true);
          axios.get("https://martek.herokuapp.com/api/campuses")
          .then(res=>{
              const campuses = res.data;
              if(res.status === 200){
                setCampusList(campuses)
                setIsActive(false)
              } 
          });
      },[])
  const handleSubmit = (e) =>{
    e.preventDefault();
    setIsActive(true);
    if(password != confrimPassword){
      setIsActive(false)
      setErrorMessage("Passwords do not match");
      setAlert(true);
      
    }else{
  axios.post('https://martek.herokuapp.com/api/register-user', {
    config, name, email, phone:`233${phone}`, password,campus_id
  }).then(res => {
    console.log(res.data)
    if(res.data.status === "success"){
      setIsActive(false);
      setModal(true);
      setTimeout(
        function(){
            setModal(false);
            /* history.push("/auth/wait-verification",{email:email}) */
            history.push("/auth/login-page")
        },
        1500
    )
      
    }
    else{
      alert("wrong data provided")
    }
  }).catch(error => {
    setIsActive(false);
    setAlert(true);
    console.log(error.response.data);
    if(error){
    setErrorMessage(error.response.data.errors.email || error.response.data.errors.phone)
    }
  })

}
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
        <Container style={{marginTop:"-10px"}}>
          <Row>
            <Col className="ml-auto mr-auto" lg="5" md="6">
              <Card className="card-plain ml-auto mr-auto" color="info" style={{borderRadius:"10px", paddingLeft:'20px', paddingRight:"20px"}}>
                <h3 className="title mx-auto" style={{fontWeight:500}}>REGISTER</h3>
                {alert?
                  <Alert color="warning" fade={true} style={{textAlign:"center", fontWeight:500}}>
                  {errorMessage}
                </Alert>
                :
                <div>
                </div>
                }
                <Form className="register-form" onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                  <label style={{fontWeight:500,color:"white"}}>Name</label>
                  <Input placeholder="Name" type="text" name="name" value={name} onChange={e => setName(e.target.value)} required/>
                  </Col>
                  </Row>
                  <Row>
                    <Col>
                  <label style={{fontWeight:500,color:"white"}}>Email</label>
                  <Input placeholder="Email" type="text" name="email" value={email} onChange={e => setEmail(e.target.value)} required/>
                 </Col>
                 </Row>
                 <Row>
                   <Col md="6">
                  <label style={{fontWeight:500,color:"white"}}>Phone</label>
                  <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            +233
                          </InputGroupText>
                        </InputGroupAddon>
                  <Input placeholder="Phone" type="text" name="country_code" title="9 digit number" pattern="[1-9]{1}[0-9]{8}" value={phone} onChange={e => setPhone(e.target.value)} required/>
                  </InputGroup>
                 </Col>
                 <Col md="6">
                 <label style={{fontWeight:500,color:"white"}}>Campus</label>
                  <Input placeholder="Campus" type="select" name="phone" value={campus_id} onChange={e => setCampus_id(e.target.value)} required>
                  {campusList.map(value => <option key={value.id} value={value.id}>{value.campus}</option>)}
                  </Input>
                 </Col>
                  </Row>
                  <label style={{fontWeight:500,color:"white"}}>Password</label>
                  <Input placeholder="Password" type="password" name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                  <label style={{fontWeight:500,color:"white"}}>Confirm Password</label>
                  <Input placeholder="Confirm Password" type="password" name="confirmPassword" value={confrimPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
                  <br/>
                  <Button block className="btn-round" color="info" type="submit" style={{marginBottom:"30px"}}>
                  Register
                  </Button>
                </Form>
              
              </Card>
            </Col>
          </Row>
        </Container>
        <br/>
        <div className="footer register-footer text-center">
          <h6>
            © {new Date().getFullYear()}, made with{" "}
            <i className="fa fa-heart heart" />martek
          </h6>
        </div>
      </div>
      <Modal isOpen={modal} className="login-modal">
      
      <ModalBody style={{color:"white", fontSize:"12px", fontWeight:500}} className="text-center">
        REGISTERED SUCCESSFULLY
      </ModalBody>
      
    </Modal>
      </LoadingOverlay>
    </div>
  );
}

export default RegisterPage;