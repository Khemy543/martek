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
  Col,
  InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";
// core components
import axios from 'axios';
 

function ShopDetails(props) {
const [firtsname, setFirstname] = React.useState("");
const [lastname, setLastname] = React.useState("");
const [email, setEmail] = React.useState("");
const [amount, setAmount] = React.useState("");
const [phone, setPhoneNumber] = React.useState('')

React.useEffect(()=>{
  console.log(props.location.state.shopType);
  let shopType = props.location.state.shopType;
  if(shopType === 'Mini Shop'){
    setAmount((Math.round(20 * 100) / 100).toFixed(2));
  }else if(shopType === 'Max Shop'){
    setAmount((Math.round(40 * 100) / 100).toFixed(2));
  }else if(shopType === 'Non-student shop'){
    setAmount((Math.round(80 * 100) / 100).toFixed(2))
  }
},[])

const handleSubmit=(e)=>{
    console.log("....")
    e.preventDefault();
    if(true){
    props.history.push("/shop/payment/account", 
    {
      firstname:firtsname,
      lastname:lastname, 
      email:email,
      amount:amount,
      phonenumber:phone,
    });
    }
    
}



  return (
    <>
      <div className="section">
        <Container style={{marginTop:"40px"}}>
          <Row>
            <Col md="5" sm="12" xs="12" className="ml-auto mr-auto">
            <Row>
            <Col md ="4" sm="4" lg="4" className="mr-auto ml-auto">
                <div style={{textAlign:"center"}}>
                <img
                  alt="#"
                  src={require("../../assets/img/martlogo.png")}
                  style={{width:"120px" ,height:"auto", marginTop:"20px"}}
                />
                </div>
                <hr className="my-4" />
                </Col>
            </Row>
            <Row>
                <Col md="4">
                    <p style={{fontSize:"12px", fontWeight:600}}>MARTEK GH</p>

                </Col>
                <Col md="4">

                </Col>
            </Row>
                
                
              <Card style={{borderRadius:"0px"}} className="card-plain">
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
                        </Col>{/* 
                        <Col md="6" sm="6" xs="6" lg="6" xl="6">
                          <h4 style={{fontSize:"14px", fontWeight:600, marginTop:"4px",color:"#6ec7e0", cursor:"pointer"}} onClick={()=>props.history.push('/shop/free-trial',{shopType:props.location.state.shopType})}>Try Free Now ! <i className="fa fa-chevron-right"/></h4>
                        </Col> */}
                    </Row>
                    <p style={{textAlign:"center", marginTop:"15px", fontSize:"12px",fontWeight:600}}>Contact <a href="!#">martekgh@gmail.com</a> for any questions</p>
                  </Form>
                </CardBody>
              </Card>
              <Row style={{marginTop:"20px"}}>
                  <Col md="6" sm="12" xs="12" className="ml-auto mr-auto">
                    <div style={{textAlign:"center"}}>
                      <img src={require("../../assets/img/mastercard.png")} alt="#" style={{width:"60px", height:"auto"}}/>
                      <img src={require("../../assets/img/visa.png")} alt="#" style={{width:"60px", height:"auto"}}/>
                      <img src={require("../../assets/img/mobilemoney.png")} alt="#" style={{width:"80px", height:"auto"}}/>
                      </div>
                  </Col>
              </Row>
            </Col>
          </Row>
        </Container>
        </div>
    </>
  );
}


export default ShopDetails;
