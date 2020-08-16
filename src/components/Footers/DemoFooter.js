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
/*eslint-disable*/
import React,{useState} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Row, Container, Modal, ModalBody, ModalHeader,Col, Button, Form, Input, InputGroup,Alert,
  InputGroupAddon,InputGroupText, ModalFooter

} from "reactstrap";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";

function DemoFooter() {
  const [firstFocus, setFirstFocus] = React.useState(false);
  const [secondFocus, setSecondFocus] = React.useState(false);
  const [lastFocus, setLastFocus] = React.useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [phone, setPhone] = useState("");
  const [modal, setModal] = useState(false);
  const [isActive, setIsActive] = useState(false);
  const [alert, setAlert]= useState(false);
  const [alertModal, setAlertModal] = useState(false)
  
  const toggle =() => setModal(!modal);
  const toggleAlertModal =() => setAlertModal(!alertModal);
  let user =null;
  let all_data = JSON.parse(localStorage.getItem('storageData'));
  if(all_data !== null){
    user = all_data[0];
  }
  
  React.useEffect(()=>{
    axios.get("https://martek.herokuapp.com/api/auth/user",{
      headers:{ 'Authorization':`Bearer ${user}`}
}
)
.then(res=>{
  console.log("data:", res.data)
  if(res.data!== null){
    setName(res.data.name);
    setEmail(res.data.email);
    setPhone(res.data.phone)
  }
}).catch(error=>{
})
  },[])

  const handleSubmit = (e) =>{
    e.preventDefault();
    console.log(e);
    setIsActive(true);
     
  axios.post('https://martek.herokuapp.com/api/make-enquiries', {
    name, email, message,phone
  }).then(res => {
    console.log(res.data.status);
    if(res.data.status === "mail sent"){
      setIsActive(false)
      setAlertModal(true)
      setModal(false)
    }
     
  }) 
  .catch(error=>{
    console.log(error);
    setIsActive(false);
    setAlert(true)
  })
  
  }
  return (
    <footer className="footer footer-black footer-white">
      <Container>
        <Row>
          <nav className="footer-nav">
            <ul>
              <li>
                <Link to="#"
                  
                >
                  <img alt="#" src={require("../../assets/img/martlogo.png")} style={{maxWidth:"120px", height:"30px"}}/>
                </Link>
              </li>
              <li>
                <Link to="#"
                 onClick={()=>{setModal(true)}} 
                >
                  contact us
                </Link>
              </li>
              <li>
                <Link to="https://orion-innovations.herokuapp.com" target="blank">
                  help
                </Link>
              </li>
            </ul>
          </nav>
          <Modal isOpen={modal} toggle={toggle}>
          <LoadingOverlay 
          active = {isActive}
          spinner={<FadeLoader color={'#4071e1'}/>}
          >
            <ModalHeader>
              CONTACT US
              </ModalHeader>
              <ModalBody>
          
          
          <Container>
            <p className="description text-center">
            <p class="description " ><i className="fa fa-phone" style={{marginRight:"15px"}}/>+233-552480391</p>   
                      <p class="description"><i className="fa fa-envelope" style={{marginRight:"15px"}}/>martekonline@gmail.com</p> 
                      
            </p>
            {alert?
            <Alert color="danger" className="text-center">Error!! Please try again.</Alert>:
            <div>
              </div>
            }
            <br/>
            <Row>
            <Col className="text-center ml-auto mr-auto" lg="12" md="12" >
            <Form onSubmit={handleSubmit}>
              <InputGroup
                className={
                  "input-lg" + (firstFocus ? " input-group-focus" : "")
                }
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="now-ui-icons users_circle-08"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="First Name..."
                  type="text"
                  onFocus={() => setFirstFocus(true)}
                  onBlur={() => setFirstFocus(false)}
                  onChange={e => setName(e.target.value)}
                  name="name"
                  value={name}
                  required
                ></Input>
              </InputGroup>
              <br/>
              <InputGroup
                className={
                  "input-lg" + (secondFocus ? " input-group-focus" : "")
                }
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="now-ui-icons users_circle-08"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Phone..."
                  type="text"
                  onFocus={() => setSecondFocus(true)}
                  onBlur={() => setSecondFocus(false)}
                  onChange={e => setPhone(e.target.value)}
                  name="name"
                  value={phone}
                ></Input>
              </InputGroup>
              <br/>
              <InputGroup
                className={
                  "input-lg" + (lastFocus ? " input-group-focus" : "")
                }
              >
                <InputGroupAddon addonType="prepend">
                  <InputGroupText>
                    <i className="now-ui-icons ui-1_email-85"></i>
                  </InputGroupText>
                </InputGroupAddon>
                <Input
                  placeholder="Email..."
                  type="text"
                  onFocus={() => setLastFocus(true)}
                  onBlur={() => setLastFocus(false)}
                  value={email}
                  name="email"
                  onChange={e => setEmail(e.target.value)}
                  required
                ></Input>
              </InputGroup>
              <br/>
              <div className="textarea-container">
                <Input
                  cols="80"
                  placeholder="Type a message..."
                  rows="4"
                  type="textarea"
                  name="message"
                  value={message}
                  onChange={e => setMessage(e.target.value)}
                  required
                ></Input>
              </div>
              <br/>
              <div className="send-button">
                <Button
                  block
                  className="btn-round"
                  color="info"
                  type="submit"
                  
                  disabled={!name||!email||!message}
                  size="lg"
                >
                  Send Message
                </Button>
                </div>
                </Form>
                </Col>
                </Row>
                </Container>
                
                </ModalBody>
            </LoadingOverlay>
                
            </Modal>
          <div className="credits ml-auto">
            <span className="copyright">
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> martek
            </span>
          </div>

          {/* <div className="credits ml-auto">
            <span className="copyright">
             web designed by  <img src={require("../../assets/img/orion-logo.png")} style={{height:"10px", maxWidth:"110px"}}/>
            </span>
          </div> */}
        </Row>
                <Col className="ml-auto mr-auto" md="12">
                <Modal isOpen={alertModal} toggle={toggleAlertModal} style={{maxHeight:"40px", maxWidth:"300px"}} className="alert-modal">
                        <ModalBody>
                    <h4 style={{textAlign:"center", marginTop:"-3%", fontWeight:"500", color:"white"}}>SENT!!</h4>
                    </ModalBody>
                    
                    </Modal>
                </Col>
      </Container>
    </footer>
  );
}

export default DemoFooter;
