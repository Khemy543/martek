import React from "react";
// reactstrap components
import {
  Button,
  Input,
  Container,
  Row,
  Form,
  Col,
  Card, CardTitle, CardBody, Modal, ModalBody, Spinner
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
//import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import history from "../../history.js";


function DeleteShop(props) {
    const [isActive, setIsActive] = React.useState(false);
    const [name, setName] = React.useState("");
    const [modal, setModal] = React.useState(false)
    

    const handleDelete=()=>{
        let merchandiser = localStorage.getItem("shop_access_token")
        setIsActive(true)
        axios.delete("https://backend-api.martekgh.com/api/merchandiser/delete",{
            headers:{"Authorization":`Bearer ${merchandiser}`}
        })
        .then(res=>{
            setModal(true);
            setTimeout(
              function(){
                  setModal(false);
                  history.push("/user/home");
                  localStorage.removeItem('shop_access_token');
                  setIsActive(false)
              },
              1500
          )
        })
        .catch(error=>{
            setIsActive(false)
        })
    }


  return (
    <div>
      <div className="section">
          <br/>
          <br/>
          <br/>
            <Container>
              <Row>
                <Col md="6" className="mr-auto ml-auto">
                  <Card style={{ width: "100%", border: "1px solid #eaeaea", borderRadius: "5px", backgroundColor: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }} className="card-plain">
                  <CardTitle style={{ padding: "5px 0px 0px 0px", margin: "0px 15px 0px 15px", borderBottom: "1px solid #eaeaea" }}>
                    <h3 style={{ fontWeight: 500, fontSize:"16px", textAlign:"left"}}>
                      Delete shop?
                    </h3>
                  </CardTitle>
                  <CardBody>
                    <Container>
                    <h3 style={{ fontWeight: 400, fontSize:"14px", textAlign:"left"}}>
                    This action cannot be undone. This will permanently delete the <b>{props.location.state.name}</b> shop.
                    All products and any information about this shop will be lost.
                    </h3>
                    <h3 style={{ fontWeight: 400, fontSize:"14px", textAlign:"left"}}>
                      Type <b>{props.location.state.name}</b> delete to confirm
                    </h3>
                    <br/>
                    <Input type="text" placeholder="Type shop name..." onChange={e=>setName(e.target.value)} value={name} />
                    <br/>
                    {isActive?
                    <Button color="danger" block disabled><Spinner size="sm" /></Button>:
                    <Button color="danger" block disabled={props.location.state.name != name} onClick={()=>handleDelete()}>I understand the consequences, delete this shop</Button>
                    }
                    </Container>
                  </CardBody>
                  </Card>
                </Col>
              </Row>
            </Container>
            <Col className="ml-auto mr-auto" md="12">
                <Modal isOpen={modal} style={{maxHeight:"40px", maxWidth:"500px"}} className="alert-modal">
                    <ModalBody style={{ color: "white", fontSize: "14px", fontWeight: 500 }} className="text-center">
                    SHOP DELETED!
                    </ModalBody>
                </Modal>
            </Col>
       </div>
    </div>
  );
}

export default DeleteShop;
