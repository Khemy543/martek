/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {
  Button,
  Container,
  Row,
  Col, Card, CardHeader, CardBody, Input,
  FormGroup,Label, Form, Modal
} from "reactstrap";
import axios from 'axios';

let user = localStorage.getItem('access_token')

function ReportShop(props) {
    const [message, setMessage] = React.useState([]);
    const [additional, setAdditonal] = React.useState("");
    const [modal, setModal] = React.useState(false)
  
    const handlePostReport=(e)=>{
        e.preventDefault()
        console.log(message);
        let tempMessage = [...message];
        tempMessage.push(additional);
        console.log(tempMessage.toString())
        axios.post("http://backend-api.martekgh.com/api/add-shop/report",
        {report:tempMessage.toString(), shop_report:1,merchandiser_id:props.location.state.id},
        { headers:{"Authorization":`Bearer ${user}`}})
        .then(res=>{
          console.log(res.data)
          if(res.data.status === "saved"){
              setModal(true);
              setTimeout(
                function(){
                    setModal(false);
                    props.history.push('/user/home')
                },1500)
          }
        })
        .catch(error=>{
          console.log(error.response.data)
        })
      }


      const pushType = (value,checked)=>{
          console.log(value,checked)
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
        
        console.log(tempMessages)
    }


  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <div className="main">
        <div className="section">
        <br/>
        <br/>
        <br/>
        <Container>
        <Row>
            <Col md="6" sm="12" sx="12" lg="6" xl="6" className="mr-auto ml-auto">
                <Card className="card-plain" style={{borderTop:"0.4em solid rgb(255, 136, 0)", backgroundColor:"white", boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px"}}>    
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
                        <Input type="checkbox" value="Shop appears to be selling replica or counterfeit products"  onChange={(e)=>pushType(e.target.value,e.target.checked)}/>{' '}
                        Shop appears to be selling replica or counterfeit products
                        </label>
                        <br/>
                        <label style={{marginLeft:"20px"}}>
                        <Input type="checkbox" value="Shop description contains inappropriate content" onChange={(e)=>pushType(e.target.value,e.target.checked)}/>{' '}
                        Shop description contains inappropriate content
                        </label>
                        <br/>
                        <label style={{marginLeft:"20px"}}>
                        <Input type="checkbox" value="Product description of this shop appears to be wrong or misleading information" onChange={(e)=>pushType(e.target.value,e.target.checked)}/>{' '}
                        Product description of this shop appears to be wrong or misleading information
                        </label>
                        <br/>
                        <label style={{marginLeft:"20px"}}>
                        <Input type="checkbox" value="Shop may be prohibited or banned by law" onChange={(e)=>pushType(e.target.value,e.target.checked)}/>{' '}
                        Shop may be prohibited or banned by law
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
                <Button color="danger" type="submit">Submit</Button>
            </Col>
        </Row>
        </Form>
        <Modal isOpen={modal}>
            <div style={{textAlign:'center',marginTop:"10px",marginBottom:"10px"}}>
            <p style={{fontWeight:"bold"}}><i className="fa fa-check mr-1" style={{color:"green", fontSize:"20px"}}/> sent!!</p>
              <p style={{fontWeight:500}}>Thanks for the report!<br/>Action is being taken, Feedback will be sent soon</p>
            </div>
        </Modal>
        </Container>
      </div>
    </div>
  );
}

export default ReportShop;