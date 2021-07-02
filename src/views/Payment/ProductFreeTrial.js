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

function ProductFreeTrial(props) {
const [mini, setMini] = React.useState('');
const [max, setMax] = React.useState('');
const [non, setNon] = React.useState('');
const [modal, setModal] = React.useState(false)

React.useEffect(()=>{
  let shop="Mini Shop"
    switch(shop){
      case 'Mini Shop':
        setMini('active');
        break;

      case 'Max Shop':
        setMax('active');
        break;

      case 'Non Student Shop':
        setNon('active');
        break;

    }
},[]);


const ActivateFreeTrial=()=>{
  const merchandiser = localStorage.getItem('shop_access_token');
  axios.post('https://backend-api.martekgh.com/api/merchandiser/activate/free/trial',null,
  {headers:{'Authorization':`Bearer ${merchandiser}`}})
  .then(res=>{
    setModal(true);
    setTimeout(
      function(){
          setModal(false);
          props.history.push("/shop/shop-page")
          },
      2000
  )
  })
  .catch(error=>{
  })
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
            <Col md="6" xs="12" sm="12" xl="6" lg="6" className="mr-auto ml-auto">
              <h3 style={{fontWeight:600, color:"#57288f"}} className="text-center">Free Trial Plans</h3>
              <p className="text-center" style={{color:"#57288f", fontWeight:500}}>All your free trial plans free trail plans are here for you</p>
            </Col>
          </Row>
          <br/>
          <br/>
          <br/>
          <Row>
            <Col md="4" xs="12" sm="12" lg="4" xl="4" className={`${mini}`}>
              <Card className="card-plain card-main" style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"15px"}}>
                  <CardBody style={{padding:"20px 20px"}}>
                    <h3 className="card-head">Mini Shop</h3>
                    <br/>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Maximum number of items 100</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Maximum number of items 50</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Maximum number of items 100</h5>
                    <h3 className="card-price">¢20 <sub>/month</sub></h3>
                    <br/>
                    <Button
                      block
                      className="btn-round free-button"
                      disabled={mini !== 'active'}
                      onClick={()=>ActivateFreeTrial()}
                    >
                      Try 3 Months
                    </Button>
                  </CardBody>
                </Card>
              </Col>

              <Col md="4" xs="12" sm="12" lg="4" xl="4" className={`${max}`}>
              <Card className="card-plain" style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"15px"}}>
                  <CardBody style={{padding:"20px 20px"}}>
                    <h3 className="card-head card-main">Max Shop</h3>
                    <br/>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Maximum number of items 100</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Maximum number of items 100</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Maximum number of items 100</h5>
                    <h3 className="card-price">¢40 <sub>/month</sub></h3>
                    <br/>
                    <Button
                      block
                      className="btn-round free-button"
                      disabled={max !== 'active'}
                      onClick={()=>ActivateFreeTrial()}
                    >
                      Try 3 Months
                    </Button>
                  </CardBody>
                </Card>
              </Col>

              <Col md="4" xs="12" sm="12" lg="4" xl="4" className={`${non}`}>
              <Card className="card-plain" style={{boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"15px"}}>
                  <CardBody style={{padding:"20px 20px"}}>
                    <h3 className="card-head card-main">Non Student Shop</h3>
                    <br/>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Maximum number of items 100</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Maximum number of items unlimited</h5>
                    <h5 className="card-description"><i className="fa fa-check-square mr-3"/> Maximum number of items 100</h5>
                    <h3 className="card-price">¢80 <sub>/month</sub></h3>
                    <br/>
                    <Button
                      block
                      className="btn-round free-button"
                      disabled={non !== 'active'}
                      onClick={()=>ActivateFreeTrial()}
                    >
                      Try 3 Months
                    </Button>
                  </CardBody>
                </Card>
              </Col>
              
          </Row>
        </Container>
        <Modal isOpen={modal} className="login-modal">]
          <ModalBody style={{color:"white", fontSize:"12px", fontWeight:500}} className="text-center">
            FREE TRIAL ACTIVATED
          </ModalBody>
        </Modal>
        </div>
    </>
  );
}


export default ProductFreeTrial;
