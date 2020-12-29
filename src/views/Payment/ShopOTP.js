import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  CardTitle,
  Col,
  InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";
// core components
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import history from "../../history.js";
import { Link } from "react-router-dom";

function ShopOtp(props) {
const [isActive, setIsActive] = React.useState(false);
const [firtsname, setFirstname] = React.useState("");
const [lastname, setLastname] = React.useState("");


console.log(props)
console.log(history) 

  return (
    <>
      <div
        className="page-header"
        style={{
          backgroundColor:"#f7f7f7"
        }}
      >
        <Container style={{marginTop:"40px"}}>
          <Row>
            <Col md="6" sm="12" xs="12" className="ml-auto mr-auto">
                <Card className="card-plain" style={{background:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px"}}>
                <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                    <h3 style={{borderBottom:"1px solid #eaeaea", fontWeight:500}} className="category">
                        {props.location.state.txref}
                    </h3>
                </CardTitle>
                    <CardBody>
                        <p style={{marginBottom:"10px", fontSize:"13px", fontWeight:500, textAlign:"center"}}>{props.location.state.message}</p>
                        <div style={{height:"450px"}}>
                            <iframe src={props.location.state.authurl} title="payment" style={{width:"100%", height:"100%"}}></iframe>
                        </div>
                    </CardBody>
                </Card>
            </Col>
          </Row>
        </Container>
        </div>
    </>
  );
}


export default ShopOtp;
