import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Input,
  Button,
  Form,
  Col,Modal,ModalBody,
  InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";
// core components
import history from "../../history.js";
import axios from 'axios';

function UserDetails(props) {
const [firtsname, setFirstname] = React.useState("");
const [lastname, setLastname] = React.useState("");
const [email, setEmail] = React.useState("");
const [amount, setAmount] = React.useState((Math.round(props.location.state.amount * 100) / 100).toFixed(2))
const [phone, setPhoneNumber] = React.useState('');
const [modal,setModal] = React.useState(false);

console.log(props)
console.log(history)
const handleSubmit=(e)=>{
    console.log("....")
    e.preventDefault();
    if(true){
    props.history.push("/user/payment/account", {
      firstname:firtsname,
      lastname:lastname, 
      email:email,
      phonenumber:phone,
      product_id:props.location.state.product_id,
      amount:amount
    });
    }
    
}
const activateFreeTrial=()=>{
  let user = localStorage.getItem('access_token')
axios.post(`https://backend-api.martekgh.com/api/user/toggle/${props.location.state.product_id}/to-free-trial`,null,
{headers:{'Authorization':`Bearer ${user}`}})
.then(res=>{
  console.log(res.data);
  setModal(true);
  setTimeout(
    function () {
      setModal(false);
      history.push("/user/user-products")

    },
    1500
  )

})
.catch(error=>{
  console.log(error)
})
}

  return (
    <>
      <div
        className="section"
      >
        <Container style={{marginTop:"70px"}}>
          <Row>
            <Col md="5" className="ml-auto mr-auto">
            <Row>
                <Col md ="4">
                <div style={{textAlign:"center"}}>
                <img
                  alt="#"
                  src={require("../../assets/img/martlogo.png")}
                  style={{width:"70px" ,height:"auto", marginTop:"20px"}}
                />
                </div>
                </Col>
                <Col md="4">
                    <h3>Martek</h3>
                    <p style={{fontSize:"11px", fontWeight:600}}>BY MARTEK</p>
                    <hr className="my-4" />

                </Col>
                <Col md="4">

                </Col>
            </Row>
                
                
              <Card style={{borderRadius:"0px", marginTop:"-25px"}} className="card-plain">
                <CardBody>
                  <Form onSubmit={handleSubmit}>
                    <Row>
                        <Col>
                        <label style={{fontSize:"13px" , fontWeight:600}}>First Name</label>
                        <Input type="text" value={firtsname} required onChange={e=>setFirstname(e.target.value)} placeholder="First Name"/>
                        </Col>
                        <Col>
                        <label  style={{fontSize:"13px" , fontWeight:600}}>last Name</label>
                        <Input type="text" required value={lastname} onChange={e=>setLastname(e.target.value)} placeholder="Last Name"/>
                        </Col>
                    </Row>
                    
                    <Row style={{marginTop:"20px"}}>
                        <Col>
                        <label  style={{fontSize:"13px" , fontWeight:600}}>Email Address</label>
                        <Input type="email" required value={email} onChange={e=>setEmail(e.target.value)} placeholder="Email Address"/>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:"20px"}}>
                        <Col>
                        <label style={{fontSize:"13px" , fontWeight:600}}>Phone Number</label>
                        <Input type="text" value={phone} required onChange={e=>setPhoneNumber(e.target.value)} placeholder="Phone Number"/>
                        </Col>
                    </Row>
                    <Row style={{marginTop:"20px"}}>
                        <Col>
                        <label style={{fontSize:"13px" , fontWeight:600}}>Amount</label>
                        <InputGroup>
                            <InputGroupAddon addonType="prepend" style={{borderRadius:"0px"}}>
                            <Input type="select" disabled>
                            <option>GHS</option>
                            <option>USD</option>
                            </Input>
                            <InputGroupText>
                            </InputGroupText>
                            </InputGroupAddon>
                            <Input disabled type="number" value={amount} name="amount" onChange={e=>setAmount(e.target.value)} required placeholder="Amount"/>
                        </InputGroup>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:"30px"}}>
                        <Col md="6" sm="6" xs="6" lg="6" xl="6"> 
                            <Button color="primary" type="submit">Pay</Button>
                        </Col>
                        <Col md="6" sm="6" xs="6" lg="6" xl="6">
                          <h4 style={{fontSize:"14px", fontWeight:600, marginTop:"4px",color:"#6ec7e0", cursor:"pointer"}}
                            onClick={()=>activateFreeTrial()}
                          >Try Free Now ! <i className="fa fa-chevron-right"/></h4>
                        </Col>
                    </Row>
                    <p style={{textAlign:"center", marginTop:"15px", fontSize:"12px",fontWeight:600}}>Contact <a style={{color:"#6ec7e0"}} href="mailto://support@martekgh.com">support@martekgh.com</a> for any questions</p>
                  </Form>
                </CardBody>
              </Card>
              <Row style={{marginTop:"20px"}}>
                  <Col md="6" className="ml-auto mr-auto">
                      <img src={require("../../assets/img/mastercard.png")} alt="#" style={{width:"60px", height:"auto"}}/>
                      <img src={require("../../assets/img/visa.png")} alt="#" style={{width:"60px", height:"auto"}}/>
                      <img src={require("../../assets/img/mobilemoney.png")} alt="#" style={{width:"80px", height:"auto"}}/>
                  </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={modal} className="login-modal">
            <ModalBody style={{ color: "white", fontSize: "12px", fontWeight: 500 }} className="text-center">
              FREE TRIAL ACTIVATED
            </ModalBody>
        </Modal>
        </div>
    </>
  );
}


export default UserDetails;
