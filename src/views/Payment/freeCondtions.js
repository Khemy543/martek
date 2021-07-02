import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  Button,
  Col,
  Modal,ModalBody
} from "reactstrap";
import axios from 'axios';

function FreeConditions(props) {


const Register=(id)=>{
  props.history.push('/user/shop-register',
  {
    shop_id:id,
    status:0
  })
}

const FreeTrial=(id)=>{
  props.history.push('/user/shop-register',
  {
    shop_id:id,
    status:1
  })
}


  return (
    <>
      <div
        className="section"
      >
        <Container style={{marginTop:"30px"}}>
          <Row>
            <Col md="6" xs="12" sm="12" xl="6" lg="6" className="mr-auto ml-auto">
              <h3 style={{fontWeight:600, color:"#57288f"}} className="text-center">Martek Shop Plans</h3>
{/*               <p className="text-center" style={{color:"#57288f", fontWeight:500}}>All your free trial plans free trail plans are here for you</p>
 */}            </Col>
          </Row>
          <br/>
          <br/>
          <br/>
          <Row>
            <Col md="4" xs="12" sm="12" lg="4" xl="4" >
              <Card className="card-plain card-main" style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"15px"}}>
                  <CardBody style={{padding:"20px 20px"}}>
                    <h3 className="card-head">Mini Shop</h3>
                    <br/>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Student owned</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Up to 20 items</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Campus specific</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Followers</h5>
                    <h3 className="card-price">¢20 <sub>/month</sub></h3>
                    <br/>
                    <br/>
                    <Button
                      block
                      className="btn-round free-button"
                      onClick={()=>Register(1)}
                    >
                      Register
                    </Button>
                    <Button
                      block
                      className="btn-round free-button"
                      onClick={()=>FreeTrial(1)}
                    >
                      Try Free For 3 Months
                    </Button>
                  </CardBody>
                </Card>
              </Col>

              <Col md="4" xs="12" sm="12" lg="4" xl="4" className='active'>
              <Card className="card-plain card-main" style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"15px"}}>
                  <CardBody style={{padding:"20px 20px"}}>
                    <h3 className="card-head">Max Shop</h3>
                    <br/>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Student owned</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Unlimited no. of items</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Personalized Ad section</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Campus specific</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Followers</h5>
                    <h3 className="card-price">¢35 <sub>/month</sub></h3>
                    <br/>
                    <Button
                      block
                      className="btn-round free-button"
                      onClick={()=>Register(2)}
                    >
                      Register
                    </Button>
                    <Button
                      block
                      className="btn-round free-button"
                      onClick={()=>FreeTrial(2)}
                    >
                      Try Free For 3 Months
                    </Button>
                  </CardBody>
                </Card>
              </Col>

              <Col md="4" xs="12" sm="12" lg="4" xl="4" >
              <Card className="card-plain" style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"15px"}}>
                  <CardBody style={{padding:"20px 20px"}}>
                    <h3 className="card-head card-main">Non Student Shop</h3>
                    <br/>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Non-student owned</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Unlimited no. of items</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Personalized Ad section</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> All Campus</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Followers</h5>
                    <h3 className="card-price">¢50 <sub>/month</sub></h3>
                    <br/>
                    <Button
                      block
                      className="btn-round free-button"
                      onClick={()=>Register(3)}
                    >
                      Register
                    </Button>
                    <Button
                      block
                      className="btn-round free-button"
                      onClick={()=>FreeTrial(3)}
                    >
                      Try Free For 3 Months
                    </Button>
                  </CardBody>
                </Card>
              </Col>
          </Row>
        </Container>
        </div>
    </>
  );
}


export default FreeConditions;
