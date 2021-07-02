import React from "react";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col, Card, CardHeader, CardBody, Input,Form, Modal,ModalBody
} from "reactstrap";
import axios from 'axios';
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

let user = localStorage.getItem('access_token')

function ReportProduct(props) {
    const [message, setMessage] = React.useState([]);
    const [additional, setAdditonal] = React.useState("");
    const [modal, setModal] = React.useState(false);
    const [isActive, setIsActive] = React.useState(false);
    const [errorMessage, setErrorMessage] = React.useState('');
    const [errorModal, setErrorModal] = React.useState(false)
  
    const handlePostReport=(e)=>{
        e.preventDefault()
        let tempMessage = [...message];
        tempMessage.push(additional);
        if(tempMessage[0] === ''){
            setErrorModal(true)
            setErrorMessage('Reason For Reporting field is required')
        }else{
        setIsActive(true)
        axios.post("https://backend-api.martekgh.com/api/add-product/report",
        {report:tempMessage.toString(),product_id:props.location.state.id},
        { headers:{"Authorization":`Bearer ${user}`}})
        .then(res=>{
          if(res.data.status === "saved"){
              setModal(true);
              setIsActive(false)
              setTimeout(
                function(){
                    setModal(false);
                    props.history.push('/user/product-details',{id:props.location.state.id})
                },2000)
          }
        })
        .catch(error=>{
          setIsActive(false);
          if(error.response.data.message === "Unauthenticated."){
              setErrorMessage("Please Login To Submit A Report");
              setErrorModal(true)
          }
        })
    }
    }

      const pushType = (value,checked)=>{
        let tempMessages = [...message];
        if(checked){
            tempMessages.push(value);
            setMessage(tempMessages)
        }else{
           let index = tempMessages.indexOf(value);
           if(index!==-1){
               tempMessages.splice(index,1);
               setMessage(tempMessages)
           }
        }
        
    }


  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <LoadingOverlay
      active={isActive}
      spinner={<BounceLoader color={'#4071e1'} />}
    >
    <div className="main">
        <div className="section">
        <br/>
        <br/>
        <br/>
        <Container>
        <Row>
            <Col md="6" sm="12" sx="12" lg="6" xl="6" className="mr-auto ml-auto">
                <Card className="card-plain" style={{borderTop:"0.4em solid #6ec7e0", backgroundColor:"white", boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px"}}>    
                    <CardHeader style={{backgroundColor:"white", fontWeight:600, fontSize:"20px"}}>
                        Infringement Report Form
                    </CardHeader>
                    <CardBody style={{fontWeight:500, fontSize:"12px", padding:"15px"}}>
                        At Martek, we aim to provide our sellers and our customers with a safe and trusted e-commerce platform.
                        <br/><br/>
                        Our dedicated team proactively review product listings, taking down counterfeit and other infringing products.
                        <br/><br/>
                        Please provide the information requested below, to enable us to address your report.
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <Form onSubmit={handlePostReport}>
        <Row>
            <Col md="6" sm="12" sx="12" lg="6" xl="6" className="mr-auto ml-auto">
                <Card className="card-plain" style={{backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px"}}>    
                    <CardBody style={{fontWeight:500, fontSize:"12px", padding:"15px"}}>
                    <p style={{fontWeight:500}}>Reason For Reporting <span style={{color:"red"}}>*</span></p>
                    <p style={{fontWeight:500,fontSize:"12px"}}>select one or more reason</p>
                    <br/>
                        <label style={{marginLeft:"20px"}}>
                        <Input type="checkbox" value="Product appears to be a replica or counterfeit"  onChange={(e)=>pushType(e.target.value,e.target.checked)}/>{' '}
                        Product appears to be a replica or counterfeit
                        </label>
                        <br/>
                        <label style={{marginLeft:"20px"}}>
                        <Input type="checkbox" value="Product description contains inappropriate content" onChange={(e)=>pushType(e.target.value,e.target.checked)}/>{' '}
                        Product description contains inappropriate content
                        </label>
                        <br/>
                        <label style={{marginLeft:"20px"}}>
                        <Input type="checkbox" value="Product description  appears to be wrong or misleading information" onChange={(e)=>pushType(e.target.value,e.target.checked)}/>{' '}
                        Product description  appears to be wrong or misleading information
                        </label>
                        <br/>
                        <label style={{marginLeft:"20px"}}>
                        <Input type="checkbox" value="Product may be prohibited or banned by law" onChange={(e)=>pushType(e.target.value,e.target.checked)}/>{' '}
                        Product may be prohibited or banned by law
                        </label>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col md="6" sm="12" sx="12" lg="6" xl="6" className="mr-auto ml-auto">
                <Card className="card-plain" style={{backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px"}}>    
                    <CardBody style={{fontWeight:500, fontSize:"12px", padding:"15px"}}>
                    <p style={{fontWeight:500}}>Additional Details</p>
                    <p style={{fontWeight:500,fontSize:"12px"}}>any other details that is relevent to your request</p>
                    <br/>

                        <Input type="textarea" placeholder="Additional Information" value={additional} onChange={e=>setAdditonal(e.target.value)}/>
                    </CardBody>
                </Card>
            </Col>
        </Row>
        <Row>
            <Col md="6" sm="12" sx="12" lg="6" xl="6" className="mr-auto ml-auto">
                <Button color="info" type="submit">Submit</Button>
            </Col>
        </Row>
        </Form>
        <Modal isOpen={modal}>
            <div style={{textAlign:'center',marginTop:"10px",marginBottom:"10px"}}>
            <p style={{fontWeight:"bold"}}><i className="fa fa-check mr-1" style={{color:"green", fontSize:"20px"}}/> sent!!</p>
              <p style={{fontWeight:500}}>Thanks for the report!<br/>Action is being taken, Feedback will be sent soon</p>
            </div>
        </Modal>

        <Modal isOpen={errorModal}>
            <ModalBody>
                <h4
                style={{textAlign:'center',marginTop:"10px",marginBottom:"10px", fontSize:"15px", fontWeight:500}}>
                {errorMessage} {" "}<Button style={{backgroundColor:"transparent", color:"red", borderColor:"transparent"}} onClick={()=>setErrorModal(false)}>X</Button>
                </h4>
            </ModalBody>
        </Modal>
        </Container>
      </div>
    </div>
    </LoadingOverlay>
  );
}

export default ReportProduct;