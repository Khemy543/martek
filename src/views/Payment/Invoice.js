import React from "react";
// reactstrap components
import {
  Card,
  CardHeader,
  CardBody,
  Container,
  Row,
  Input,
  Button,
  Col
} from "reactstrap";
// core components
import Header from "components/Headers/Header.js";
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";

function Invoice({ history }) {
  const [isActive, setIsActive] = React.useState(false);

 
  return (
    <>
      <LoadingOverlay
        active={isActive}
        spinner={<FadeLoader color={'#4071e1'} />}
      >
        <Header />
        {/* Page content */}
        <Container className=" mt--7" fluid>
        <Row>
            <Col md="12">
                <Card>
                    <CardBody>
                        
                    </CardBody>
                </Card>
            </Col>

        </Row>
        </Container>
      </LoadingOverlay>
    </>
  );
}


export default Invoice;
