import React,{useState} from 'react';
import axios from 'axios';

//import reactstrap
import{
    Container,
    Col,
    Row,
    Card,
    CardBody,
    Button, Alert,
    Form, Modal, ModalBody, ModalHeader, Input, InputGroup,
    InputGroupAddon,InputGroupText, ModalFooter,CardHeader
} from "reactstrap";



export default function ContactUs(){
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [secondFocus, setSecondFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [modal, setModal] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [alert, setAlert]= useState(false);
    const [alertModal, setAlertModal] = useState(false)
    const [visible, setVisible] = React.useState(false);

    const toggle=()=>setVisible(!visible);

    let user = localStorage.getItem('access_token');
    
    React.useEffect(()=>{
        axios.get("https://martek.herokuapp.com/api/auth/user",{
        headers:{ 'Authorization':`Bearer ${user}`}
    }
    )
    .then(res=>{
    console.log("data:", res.data)
    if(res.data!== null){
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone)
    }
    }).catch(error=>{
    })
    },[])


    const handleSubmit = (e) =>{
        e.preventDefault();
        console.log(e);
        setIsActive(true);
         
      axios.post('https://martek.herokuapp.com/api/make-enquiries', {
        name, email, message,phone
      }).then(res => {
        console.log(res.data.status);
        if(res.data.status === "mail sent"){
          setIsActive(false)
          setVisible(true)
        }
         
      }) 
      .catch(error=>{
        console.log(error);
      })
    }
      

    return(
        <div className="main">
                    <div className="section">
                    <Container>
                    <Row style={{marginTop:"350px"}}>
                    <Col md="8" lg="8" sm="12" xs="12" style={{marginLeft:"50%",transform:"translate(-50%,-50%)"}}>
                            <div>
                            <Alert isOpen={visible} toggle={toggle}  color="success" fade={true} style={{fontWeight:500, textTransform:"capitalize"}}>
                                Message Sent
                            </Alert>
                            </div>
                            <Card className="card-plain shadow" style={{backgroundColor:"white", borderRadius:"5px"}}>
                                <CardBody style={{margin:"15px"}}>
                                <h3 style={{marginBottom:"20px"}}>Contact Us</h3>
                                <Form onSubmit={handleSubmit}>
                                <InputGroup
                                    className={
                                    "input-lg" + (firstFocus ? " input-group-focus" : "")
                                    }
                                >
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fa fa-user"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                    placeholder="First Name..."
                                    type="text"
                                    onFocus={() => setFirstFocus(true)}
                                    onBlur={() => setFirstFocus(false)}
                                    onChange={e => setName(e.target.value)}
                                    name="name"
                                    value={name}
                                    required
                                    ></Input>
                                </InputGroup>
                                <br/>
                                <InputGroup
                                    className={
                                    "input-lg" + (secondFocus ? " input-group-focus" : "")
                                    }
                                >
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fa fa-phone"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                    placeholder="Phone..."
                                    type="text"
                                    onFocus={() => setSecondFocus(true)}
                                    onBlur={() => setSecondFocus(false)}
                                    onChange={e => setPhone(e.target.value)}
                                    name="name"
                                    value={phone}
                                    ></Input>
                                </InputGroup>
                                <br/>
                                <InputGroup
                                    className={
                                    "input-lg" + (lastFocus ? " input-group-focus" : "")
                                    }
                                >
                                    <InputGroupAddon addonType="prepend">
                                    <InputGroupText>
                                        <i className="fa fa-envelope"></i>
                                    </InputGroupText>
                                    </InputGroupAddon>
                                    <Input
                                    placeholder="Email..."
                                    type="text"
                                    onFocus={() => setLastFocus(true)}
                                    onBlur={() => setLastFocus(false)}
                                    value={email}
                                    name="email"
                                    onChange={e => setEmail(e.target.value)}
                                    required
                                    ></Input>
                                </InputGroup>
                                <br/>
                                <div className="textarea-container">
                                    <Input
                                    cols="80"
                                    placeholder="Type a message..."
                                    rows="4"
                                    type="textarea"
                                    name="message"
                                    value={message}
                                    onChange={e => setMessage(e.target.value)}
                                    required
                                    ></Input>
                                </div>
                                <br/>
                                <div className="send-button">
                                    <Button
                                    block
                                    className="btn-round"
                                    color="info"
                                    type="submit"
                                    
                                    disabled={!name||!email||!message}
                                    size="lg"
                                    >
                                    Send Message
                                    </Button>
                                    </div>
                                    </Form>
                                </CardBody>
                            </Card>
                        </Col>    
                    </Row>
                    </Container>
                </div>
        </div>
    );
}