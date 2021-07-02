import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  CardTitle,
  Col,
} from "reactstrap";
// core components
import axios from 'axios';
import queryString from 'query-string'
import { Redirect } from "react-router-dom";
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const user = localStorage.getItem('access_token')

function ShopPaymentVerification(props) {
  const [isActive, setIsActive] = React.useState(false)

React.useEffect(()=>{
        const param = queryString.parse(props.location.search);
        var response = param.response || param.resp
        axios.post('https://backend-api.martekgh.com/api/shop/payment/callback',
        {
            response : response
        }, {headers:{'Authorization':`Bearer ${user}`}})
        .then(res=>{
            setIsActive(true)
        })
        .catch(error=>{
        })
},[]);

const handleComplete=()=>{
  props.history.push('/shop/shop-page')
}


  return (
    <>
      <div
        className="page-header"
        style={{
          backgroundColor:"#f7f7f7"
        }}
      >
        <Container>
        <Row>
            <Col className="mx-auto my-auto text-center" md="6" xs="12" sm="12" lg="6" xl="6">
            {isActive?
            <div style={{display:"flex", justifyContent:"center", alignItems:"center"}}>
              <CountdownCircleTimer
                isPlaying={isActive}
                duration={5}
                colors={[
                  ['#004777', 0.33],
                  ['#F7B801', 0.33],
                  ['#A30000', 0.33],
                ]}
                size={180}
                trailColor='#6ec7e0'
                strokeLinecap={15}
                onComplete={()=>handleComplete()}
              >
                  {({ remainingTime }) => (
                    <div className="my-auto mx-auto" style={{fontWeight:500}}>
                      <h2>{remainingTime}</h2>
                      <p>Redirecting...</p>
                    </div>
                  )}
              </CountdownCircleTimer>
              </div>
              :
              <Card className="card-plain" style={{backgroundColor:"white", borderRadius:"5px"}}>
                <CardBody style={{margin:"15px"}}>
                    <div>
                    <img src={require("../../assets/img/martlogo.png")} style={{maxWidth:"80px", height:"auto"}}/>
                    </div>
                    <br/>
                    <p style={{fontWeight:500, fontSize:"14px"}}> 
                    Payment Is Being Processed.<br/> Kindly Check Email For Response. 
                    </p>
                </CardBody>
              </Card>
              }
            </Col>
          </Row>
        </Container>
        </div>
    </>
  );
}


export default ShopPaymentVerification;
