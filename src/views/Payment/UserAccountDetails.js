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
  Col, CardFooter,ListGroup, ListGroupItem, Spinner 
} from "reactstrap";
// core components
import axios from "axios";

let user =localStorage.getItem('access_token');
class UserAccountDetails extends React.Component{
    state={
        isActive:false,
        card:false,
        mobile:true,
        date:"",
        cardno:"",
        cvv:"",
        authurl:"",
        modalOpen:false,
        phonenumber:"",
        network:"MTN",
        voucher:"",
        amount:this.props.location.state.amount,
        billingaddress:"",
        billingstate:"",
        billingcity:""
    }

    componentDidMount(){
        console.log(this.props)
    }

handleCardSubmit=(e)=>{
    this.setState({isActive:true})
    e.preventDefault();
    let tempDate = this.state.date;
    let splitArray = tempDate.split("/");
    console.log(splitArray[0], splitArray[1])

    axios.post("https://backend-api.martekgh.com/api/user/product/payment",
    {
        cardno: this.state.cardno,
        product_id:this.props.location.state.product_id,
        cvv: this.state.cvv,
        expirymonth: splitArray[0],
        expiryyear: splitArray[1],
        phonenumber:this.props.location.state.phonenumber,
        firstname: this.props.location.state.firstname,
        lastname: this.props.location.state.lastname, 
        email:this.props.location.state.email,
        billingzip:"233",
        billingcity:this.state.billingcity,
        billingaddress:this.state.billingaddress,
        billingstate:this.state.billingstate,
        payment_method:'card_payment'
    },{headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        window.location=`${res.data.authurl}`
    })
    .catch(error=>{
        console.log(error.response.data);
        this.setState({isActive:false})
    })
}


handleMobileSubmit=(e)=>{
    this.setState({isActive:true})
    e.preventDefault();
    if(this.state.network === 'VODAFONE'){
        axios.post("https://backend-api.martekgh.com/api/user/product/payment",
    {
        phonenumber:this.state.phonenumber,
        product_id:this.props.location.state.product_id,
        firstname: this.props.location.state.firstname,
        lastname: this.props.location.state.lastname,
        email:this.props.location.state.email,
        vendor:this.state.network,
        voucher:this.state.voucher,
        payment_method:'momo'
    },{headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        window.location=`${res.data.data.link}`
    })
    .catch(error=>{
        console.log(error.response.data);
        this.setState({isActive:false})
    })
    }
    else{
    axios.post("https://backend-api.martekgh.com/api/user/product/payment",
    {
        phonenumber:this.state.phonenumber,
        product_id:this.props.location.state.product_id,
        firstname: this.props.location.state.firstname,
        lastname: this.props.location.state.lastname,
        email:this.props.location.state.email,
        vendor:this.state.network,
        payment_method:'momo'
    },{headers:{ 'Authorization':`Bearer ${user}`}})
    .then(res=>{
        console.log(res.data);
        window.location=`${res.data.data.link}`
    })
    .catch(error=>{
        console.log(error.response.data);
        this.setState({isActive:false})
    })
}
}
    render(){
    return (
        <>
        <div className="section">
        <Container style={{marginTop:"70px"}}>
            <Row>
                <Col md="5" className="ml-auto mr-auto">
                <Card className="card-plain" style={{backgroundColor:"white", cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
                    <CardBody style={{backgroundColor:"beige"}}>
                    {this.state.card?
                    <Form onSubmit={this.handleCardSubmit}>
                        <Row>
                            <Col md="12">
                        <h5 style={{fontWeight:500}}>GHS {this.state.amount}</h5>
                        <p style={{fontSize:"12px", fontWeight:500,marginTop:"-5px"}}>{this.props.location.state.email}</p>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col md="12" className="mr-auto ml-auto">
                                <CardBody style={{backgroundColor:"white", cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
                                    <Row>
                                        <Col>
                                            <label style={{fontSize:"13px" , fontWeight:500}}>CARD NUMBER</label>
                                            <Input placeholder="0000 0000 0000 0000" value={this.state.cardno} onChange={e=>this.setState({cardno:e.target.value})}
                                             type="tel" pattern="\d*" maxlength="19"
                                             required/>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col>
                                        <label style={{fontSize:"13px" , fontWeight:500}}>VALID TILL</label>
                                        <Input placeholder="mm / yy" value={this.state.date} onChange={e=>this.setState({date:e.target.value})}
                                        
                                         required/>
                                        </Col>
                                        <Col>
                                            <label style={{fontSize:"13px" , fontWeight:500}}>CVV</label>
                                            <Input placeholder="123" value={this.state.cvv} type="number" min="1" max="999"
                                            onChange={e=>this.setState({cvv:e.target.value})}
                                            required/>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col>
                                            <label style={{fontSize:"13px" , fontWeight:500}}>ADDRESS</label>
                                            <Input placeholder="Address" value={this.state.billingaddress} onChange={e=>this.setState({billingaddress:e.target.value})}
                                            
                                             required/>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col>
                                            <label style={{fontSize:"13px" , fontWeight:500}}>REGION</label>
                                            <Input placeholder="Region" value={this.state.billingstate} onChange={e=>this.setState({billingstate:e.target.value})}
                                            
                                             required/>
                                        </Col>
                                        <Col>
                                            <label style={{fontSize:"13px" , fontWeight:500}}>CITY</label>
                                            <Input placeholder="City" value={this.state.billingcity} onChange={e=>this.setState({billingcity:e.target.value})}
                                            
                                             required/>
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop:"25px"}}>
                                        <Col md="12">
                                        {!this.state.isActive?
                                            <Button block color="info" type="submit">Pay GHS {this.state.amount}</Button>
                                            :
                                            <Button color="info" block><Spinner size="sm"  /></Button>
                                        }
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Col>
                        </Row>
                    </Form>
                    :<div></div>}

                    {this.state.mobile?
                    <Form onSubmit={this.handleMobileSubmit}>
                        <Row>
                            <Col md="12">
                        <h5 style={{fontWeight:500}}>GHS {this.state.amount}.00</h5>
                        <p style={{fontSize:"12px", fontWeight:500,marginTop:"-5px"}}>{this.props.location.state.email}</p>
                            </Col>
                        </Row>
                        <br/>
                        <Row>
                            <Col md="12" className="mr-auto ml-auto">
                            <Card className="card-plain" style={{backgroundColor:"white", cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}}>
                                <CardBody>
                                    <Row>
                                    <Col>
                                    <label style={{fontSize:"13px" , fontWeight:500}}>CHOOSE NETWORK</label>
                                    <Input type="select" value={this.state.network} onChange={e=>this.setState({network:e.target.value})}>
                                        <option value="MTN">MTN</option>
                                        <option value="TIGO">AIRTEL-TIGO</option>
                                        <option value="VODAFONE">VODAFONE</option>
                                    </Input>
                                    </Col>
                                    </Row>
                                    <br/>
                                    <Row>
                                        <Col>
                                        <label style={{fontSize:"13px" , fontWeight:500}}>MOBILE NUMBER</label>
                                    <Input placeholder="000-000000" required onChange={e=>this.setState({phonenumber:e.target.value})} />
                                    {this.state.network === "VODAFONE"?
                                    <>
                                    <label style={{fontSize:"13px" , fontWeight:500}}>VOUCHER</label>
                                    <Input placeholder="000000000"  required onChange={e=>this.setState({voucher:e.target.value})} />
                                    </>
                                    :<></>}
                                        </Col>
                                    </Row>
                                    <Row style={{marginTop:"25px"}}>
                                        <Col md="12">
                                        {!this.state.isActive?
                                            <Button block color="info" type="Submit">Pay GHS {this.state.amount}</Button>
                                            :
                                            <Button block color="info"><Spinner size="sm" /></Button>
                                        }
                                        </Col>
                                    </Row>
                                </CardBody>
                            </Card>
                            </Col>
                        </Row>
                    </Form>
                    :<div></div>}
                    </CardBody>
                    <CardFooter>
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
                      <img src={require("../../assets/img/mastercard.png")} alt="#" style={{width:"50px", height:"auto", marginRight:"10px"}}/>
                      <img src={require("../../assets/img/visa.png")} alt="#" style={{width:"50px", height:"auto", marginRight:"10px"}}/>
                      <img src={require("../../assets/img/mobilemoney.png")} alt="#" style={{width:"70px", height:"auto"}}/>
                  </Col>
              </Row>
                </Col>
            </Row>
            </Container>
            </div>
        </>
    );
}
}


export default UserAccountDetails;
