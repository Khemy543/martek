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
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const user = localStorage.getItem('access_token')

function ProductPaymentVerification(props) {
const [isActive, setIsActive] = React.useState(false);

React.useEffect(()=>{
        console.log(props.location);
        const param = queryString.parse(props.location.search);
        var response = param.response || param.resp;
        console.log(response)
        axios.post('https://backend-api.martekgh.com/api/user/product/payment/callback',
        {
            response : response
        }, {headers:{'Authorization':`Bearer ${user}`}})
        .then(res=>{
            console.log(res.data);
            setIsActive(true);
        })
        .catch(error=>{
            console.log(error)
        });
},[]);

const handleComplete=()=>{
  console.log('completed');
  props.history.push('/user/home')
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
         {/*  <Row>
            <Col md="6" sm="12" xs="12" className="ml-auto mr-auto text-center">
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
            </Col>
          </Row> */}
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


export default ProductPaymentVerification;
