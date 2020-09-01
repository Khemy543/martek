import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  CardHeader,
  Container,
  Row,
  Input,
  Button,
  Form,Modal,
  Col, CardFooter,ListGroup, ListGroupItem, ModalBody 
} from "reactstrap";
// core components
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import axios from "axios";

let user =localStorage.getItem('access_token');
class AccountDetails extends React.Component{
    state={
        isActive:false,
        card:true,
        mobile:false,
        po:false,
        email:this.props.location.state.email,
        amount:this.props.location.state.amount,
        date:"",
        cardno:"",
        cvv:"",
        firstname:this.props.location.state.firstname,
        lastname:this.props.location.state.lastname,
        authurl:"",
        modalOpen:false,
        phonenumber:"",
        network:"MTN",
        voucher:""
    }

handleCardSubmit=(e)=>{
    this.setState({isActive:true})
    e.preventDefault();
    let tempDate = this.state.date;
    let splitArray = tempDate.split("/");
    console.log(splitArray[0], splitArray[1])

    axios.post("https://kokrokooad.herokuapp.com/api/make-card-payment",
    {
        cardno: this.state.cardno,
        cvv: this.state.cvv,
        expirymonth: splitArray[0],
        expiryyear: splitArray[1],
        phonenumber:this.state.phonenumber,
        currency: "GHS",
        country: "GH",
        amount: this.state.amount,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
    },{headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        this.setState({authurl:res.data.authurl,modalOpen:true, isActive:false})
    })
    .catch(error=>{
        console.log(error);
    })
}


handleMobileSubmit=(e)=>{
    this.setState({isActive:true})
    e.preventDefault();

    axios.post("https://kokrokooad.herokuapp.com/api/make-momo-payment",
    {
        phonenumber:this.state.phonenumber,
        currency: "GHS",
        country: "GH",
        amount: this.state.amount,
        firstname: this.state.firstname,
        lastname: this.state.lastname,
        network:this.state.network
    },{headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        this.setState({authurl:res.data.authurl,modalOpen:true,isActive:false})
    })
    .catch(error=>{
        console.log(error);
    })
}
    render(){
    return (
        <>
        <LoadingOverlay
            active={this.state.isActive}
            spinner={<FadeLoader color={'#4071e1'} />}
        >
          <div
            className="page-header"
            style={{
            backgroundColor:"white"
            }}
        >
        <Container style={{marginTop:"30px"}}>
            <Row>
                <Col md="3" className="ml-auto mr-auto">
                <Card className="card-plain" style={{backgroundColor:"white", cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
                <CardHeader>
                <Row>
                    <Col md ="4">
                    <div style={{textAlign:"center"}}>
                    <img
                    alt="#"
                    src={require("../../assets/img/martlogo.png")}
                    style={{width:"120px" ,height:"auto", marginTop:"10px"}}
                    />
                    </div>
                    </Col>
                    <Col md="3">
                    
                    </Col>
                    <Col md="5">
                    </Col>
                </Row>
                    
                </CardHeader>
                
                    <CardBody style={{backgroundColor:"beige"}}>
                    {this.state.card?
                    <Form onSubmit={this.handleCardSubmit}>
                        <Row>
                            <Col md="12">
                        <h5>GHS {this.state.amount}.00</h5>
                        <p style={{fontSize:"12px", fontWeight:600,marginTop:"-5px"}}>{this.state.email}</p>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col md="12" className="mr-auto ml-auto">
                            <Card className="card-plain" style={{backgroundColor:"white", cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
                                <CardBody style={{pading:"0px 0px"}}>
                                    <Row>
                                        <Col>
                                            <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>CARD NUMBER</label>
                                            <Input placeholder="0000 0000 0000 0000" value={this.state.cardno} onChange={e=>this.setState({cardno:e.target.value})}
                                             style={{border:"none",padding:"0px 0px",marginTop:"-5px"}} 
                                             
                                             required/>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col style={{borderRight:"1px solid #0000001f"}}>
                                        <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>VALID TILL</label>
                                        <Input placeholder="mm/yy" value={this.state.date} onChange={e=>this.setState({date:e.target.value})}
                                         style={{border:"none",padding:"0px 0px",marginTop:"-5px"}} 
                                         
                                         required/>
                                        </Col>
                                        <Col>
                                            <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>CVV</label>
                                            <Input placeholder="123" value={this.state.cvv} type="number" min="1" max="999"
                                            onChange={e=>this.setState({cvv:e.target.value})}
                                             style={{border:"none",padding:"0px 0px",marginTop:"-5px"}} required/>
                                        </Col>
                                    </Row>
                                    {/* <br/>
                                    <Row>
                                        <Col>
                                            <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>PHONE NUMBER</label>
                                            <Input placeholder="000-000000" value={this.state.phonenumber} onChange={e=>this.setState({phonenumber:e.target.value})}
                                             style={{border:"none",padding:"0px 0px",marginTop:"-5px"}} 
                                             required/>
                                        </Col>
                                    </Row> */}
                                    <Row style={{marginTop:"25px"}}>
                                        <Col md="12">
                                            <Button block color="warning" type="submit">Pay GHS {this.state.amount}</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            </Col>
                        </Row>
                    </Form>
                    :<div></div>}

                    {this.state.mobile?
                    <Form onSubmit={this.handleMobileSubmit}>
                        <Row>
                            <Col md="12">
                        <h5>GHS {this.state.amount}.00</h5>
                        <p style={{fontSize:"12px", fontWeight:600,marginTop:"-5px"}}>{this.state.email}</p>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col md="12" className="mr-auto ml-auto">
                            <Card className="card-plain" style={{backgroundColor:"white", cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
                                <CardBody style={{pading:"0px 0px"}}>
                                    <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>CHOOSE NETWORK</label>
                                    <Input type="select" style={{border:"none",padding:"0px 0px",marginTop:"-5px"}} value={this.state.network} onChange={e=>this.setState({network:e.target.value})}>
                                        <option>MTN</option>
                                        <option>AIRTEL-TIGO</option>
                                        <option>VODAFONE</option>
                                    </Input>
                                    <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>MOBILE NUMBER</label>
                                    <Input placeholder="000-000000" style={{border:"none",padding:"0px 0px",marginTop:"-5px"}} required onChange={e=>this.setState({phonenumber:e.target.value})} />

                                    <label style={{fontSize:"13px" , fontWeight:600,marginBottom:"0px"}}>VOUCHER (ONLY VODACASH)</label>
                                    <Input placeholder="000000000" style={{border:"none",padding:"0px 0px",marginTop:"-5px"}} required onChange={e=>this.setState({voucher:e.target.value})} />

                                    <Row style={{marginTop:"25px"}}>
                                        <Col md="12">
                                            <Button block color="warning" type="Submit">Pay GHS {this.state.amount}</Button>
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            </Col>
                        </Row>
                    </Form>
                    :<div></div>}
                    </CardBody>
                    <CardFooter style={{padding:"0px 0px 0px 0px"}}>
                    <ListGroup>
                        {!this.state.card?
                        <ListGroupItem style={{fontSize:"13px",fontWeight:600,cursor:"pointer",borderRadius:"0px", backgroundColor:"#f2f2f2"}}
                        onClick={()=>this.setState({card:true, mobile:false, po:false})}
                        ><i className="fa fa-money mr-3"/>Pay with Card</ListGroupItem>
                        :<div></div>}
                        {!this.state.mobile?
                        <ListGroupItem style={{fontSize:"13px",fontWeight:600, cursor:"pointer", backgroundColor:"#f2f2f2"}}
                        onClick={()=>this.setState({card:false, mobile:true, po:false})}
                        ><i className="fa fa-money mr-3"/>Pay with Mobile Money</ListGroupItem>
                        :<div></div>}
                    </ListGroup>
                    </CardFooter>
                </Card>
                <Row style={{marginTop:"20px"}}>
                  <Col md="6" className="ml-auto mr-auto">
                      <img src={require("../../assets/img/mastercard.png")} alt="#" style={{width:"30px", height:"auto"}}/>
                      <img src={require("../../assets/img/visa.png")} alt="#" style={{width:"30px", height:"auto"}}/>
                      <img src={require("../../assets/img/mobilemoney.png")} alt="#" style={{width:"50px", height:"auto"}}/>
                  </Col>
              </Row>
                </Col>
            </Row>
            <Modal  isOpen={this.state.modalOpen}>
                <ModalBody style={{height:"550px"}}>
                    <iframe src={this.state.authurl} title="payment" style={{width:"100%", height:"100%"}}></iframe>

                </ModalBody>
            </Modal>
            </Container>
            </div>
        </LoadingOverlay>
        </>
    );
}
}


export default AccountDetails;
