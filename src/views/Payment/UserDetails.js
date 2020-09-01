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
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";

function UserDetails(props) {
const [isActive, setIsActive] = React.useState(false);
const [firtsname, setFirstname] = React.useState("");
const [lastname, setLastname] = React.useState("");
const [email, setEmail] = React.useState("");
const [amount, setAmount] = React.useState("");


const handleSubmit=(e)=>{
    setIsActive(true)
    e.preventDefault();
    props.history.push("/payment/account-details", {firtsname:firtsname,lastname:lastname, email:email,amount:amount});
    setIsActive(false)
    
}

  return (
    <>
      <LoadingOverlay
        active={isActive}
        spinner={<FadeLoader color={'#4071e1'} />}
      >
      <div
        className="page-header"
        style={{
          backgroundColor:"white"
        }}
      >
        <Container style={{marginTop:"30px"}}>
          <Row>
            <Col md="5" className="ml-auto mr-auto">
            <Row>
                <Col md ="4">
                <div style={{textAlign:"center"}}>
                <img
                  alt="#"
                  src={require("../../assets/img/martek.png")}
                  style={{width:"70px" ,height:"auto", marginTop:"20px"}}
                />
                </div>
                </Col>
                <Col md="4">
                    <h3>Martek</h3>
                    <p style={{fontSize:"11px", fontWeight:600}}>BY MARTEK</p>
                    <hr className="my-4" />
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
                            <Input  type="number" value={amount} name="amount" onChange={e=>setAmount(e.target.value)} required placeholder="Amount"/>
                        </InputGroup>
                        </Col>
                        
                    </Row>
                    <Row style={{marginTop:"30px"}}>
                        <Col> 
                            <Button color="primary" type="submit">Pay</Button>
                        </Col>
                    </Row>
                    <p style={{textAlign:"center", marginTop:"15px", fontSize:"12px",fontWeight:600}}>Contact <a href="!#">martekgh@gmail.com</a> for any questions</p>
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
        </div>
      </LoadingOverlay>
    </>
  );
}


export default UserDetails;
