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

const user = localStorage.getItem('access_token')

function ProductPaymentVerification(props) {
const [isActive, setIsActive] = React.useState(false);
const [count, setCount] = React.useState(4);

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
        })
        .catch(error=>{
            console.log(error.response.data)
        });
},[]);

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
          </Row>
          <Row>
            <Col className="ml-auto mr-ato" md="6" xs="12" sm="12" lg="6" xl="6">
                <h1>{count}</h1>
            </Col>
          </Row>
        </Container>
        </div>
    </>
  );
}


export default ProductPaymentVerification;
