import React,{useState} from 'react';
import axios from 'axios';

//import reactstrap
import{
    Container,
    Col,
    Row,Table,
    Card,
    CardBody,
    Button, Alert,
    Form,Input, InputGroup,
    InputGroupAddon,InputGroupText,CardHeader
} from "reactstrap";
import { Tabs, Tab, TabPanel, TabList } from 'react-web-tabs';
import 'react-web-tabs/dist/react-web-tabs.css';


export default function BuyOnMartek(){
    const [firstFocus, setFirstFocus] = React.useState(false);
    const [secondFocus, setSecondFocus] = React.useState(false);
    const [lastFocus, setLastFocus] = React.useState(false);
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [phone, setPhone] = useState("");
    const [modal, setModal] = useState(false);
    const [isActive, setIsActive] = useState(false);
    const [visible, setVisible] = React.useState(false);
    const [IsMobile, setIsMobile] = React.useState(false)

    const toggle=()=>setVisible(!visible);

    let user = localStorage.getItem('access_token');
    
    React.useEffect(()=>{

        window.addEventListener('resize', () => {
            setIsMobile(window.innerWidth < 800);
        }, false);

        axios.get("https://backend-api.martekgh.com/api/auth/user",{
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
         
      axios.post('https://backend-api.martekgh.com/api/make-enquiries', {
        name, email, message,phone
      }).then(res => {
        console.log(res.data.status);
        if(res.data.status === "mail sent"){
          setIsActive(false)
          setName("");
          setEmail("");
          setPhone("");
          setVisible(true)
        }
         
      }) 
      .catch(error=>{
        console.log(error);
      })
    }

    const layout = IsMobile ? false : true 
    return(
        <div className="main">
                    <div className="section">
                    <Container>
                    <Row style={{marginTop:"40px"}}>
                        <Col>
                        <Card className="card-plain" style={{backgroundColor:"white"}}>
                            
                    <Row>
                        <Col md="10" style={{marginLeft:"auto", marginRight:"auto"}}>
                            <h3 style={{textAlign:"center", fontWeight:600}}>Welcome To Martek's Help And Support Page</h3>
                            <p style={{textAlign:"center"}}>Here you can find answers to our most frequently asked questions and learn about Martek, how to use it, how to stay safe and how to get in touch with us.</p>
                            <div style={{textAlign:"center"}}>
                            <img alt="#" src={require("assets/img/help.jpg")} style={{height:"auto", width:"100%"}} />
                            </div>
                        </Col>
                    </Row>
                    <br/>
                    <br/>
                    <br/>
                    <Row >
                        <Col>
                        <Tabs defaultTab="vertical-tab-three" vertical={layout}>
                            <TabList>
                            <Tab tabFor="vertical-tab-one" style={{textAlign:"left"}}>Help Center <i className="fa fa-chevron-right"/></Tab>
                            <Tab tabFor="vertical-tab-two" style={{textAlign:"left"}}>Contact Us <i className="fa fa-chevron-right"/></Tab>
                            <Tab tabFor="vertical-tab-three" style={{textAlign:"left"}}>How To Buy On Martek <i className="fa fa-chevron-right"/></Tab>
                            </TabList>
                            <TabPanel tabId="vertical-tab-one">
                            <Container>
                            <Row>
                                <Col md="12" lg="12" sm="12" xs="12" >
                                        <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I sign up for a user account on Martek?</h4>
                                        <p>
                                        Signing up for an account on Martek is quick, easy and completely free! To sign up, open menu and select <b>“Sign in”</b> to open the Sign in page and select <b>“Sign up”</b> 
                                        to follow the instructions. You can sign up with an email address or through your Google and Facebook account.
                                        <br/>
                                        <br/>
                                        Once you have signed up, a link will be sent to your email with instructions on how to verify your email address.
                                        </p>
                                
                                        <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I Sign-in and Sign-out of my account?</h4>
                                        <p>
                                        To Sign-in to your account, simply open menu and select “Sign-in” under the user options and enter email and password to sign-in.
                                        <br/>
                                        <br/>
                                        To Sign-out of your account, simply click the "Sign-out" under the User options in Menu
                                        </p>
                                        
                                        <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I change my password on Martek?</h4>
                                        <p>
                                        To change password, please log into your account, open menu and select your account under the User options to open your account page. Select “Edit Profile” and select “Change Password” to change your password.<br/>
                                        <br/>
                                        If you have forgotten your Martek password, you can go to the log-in page and click on the "Forgot your password?"</p>
                        
                                        <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I change my account details?</h4>
                                        <p>
                                        To change the details on your account, sign in to your account and select your profile with your name under the User option in Menu.<br/>
                                        </p>
                                        
                                        <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>Why can't I Sign in to my account?</h4>
                                        <p>
                                        If you are having trouble Signing in to your account, please check that you have:<br/>
                                        •	Signed up for an account.<br/>
                                        •	Entered the correct email address and password on the Sign-in page. <br/>
                                        <br/>
                                        If you are still having trouble accessing your account, please Contact Us.
                                        </p>
                                        
                                        <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>Why does Martek need to verify my identity?</h4>
                                        <p>
                                        Martek is committed to creating a safe and trusted community of buyers and sellers. To deter fraudulent behaviour, we identify every seller who posts an item. When you post an item for the first time, we will contact you within 24 hours to verify your identity.
                                        <br/>
                                        <br/><br/>
                                        </p>
                                        
                                </Col>    
                            </Row>
                            </Container>
                                    </TabPanel>
                                    <TabPanel tabId="vertical-tab-three">
                                    <Container>
                                    <Row>
                                        <Col md="12" lg="12" sm="12" xs="12">
                                        <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I buy on Martek?</h4>
                                                <p>
                                                1.	Type the product you are searching for directly into the search bar<br/><br/>
                                                2.	Or browse through the different categories <br/><br/>
                                                3.	Or scroll through our NEW THIS WEEK section on the home page to find the best deals<br/><br/>
                                                4.	On the product page click “BUY NOW” to call or send a message to the seller through WhatsApp or mail.<br/><br/>
                                                5.	Or on the product page click “ADD TO CART” to buy later<br/><br/>
                                                6.	View cart to see item in your cart, select item and proceed to buy now.<br/>
                                                <br/>
                                                <br/>
                                                <br/>
                                                </p>
                                                
                                        </Col>    
                                    </Row>
                                    </Container>
                                    </TabPanel>
                                    
                                   
                                  
                                    <TabPanel tabId="vertical-tab-two">
                                    <Row style={{marginTop:"20px"}}> 
                                        <Col md="10" lg="10" sm="12" xs="12" style={{marginLeft:"auto", marginRight:"auto"}}>
                                                <div>
                                                <Alert isOpen={visible} toggle={toggle}  color="success" fade={true} style={{fontWeight:500, textTransform:"capitalize"}}>
                                                    Message Sent
                                                </Alert>
                                                </div>
                                                <Card className="card-plain">
                                                <CardHeader style={{backgroundColor:"white", textAlign:"center"}}>
                                                <h3>Contact Us</h3>
                                                    <h4 style={{fontSize:"17px"}}>0558341865/0209357637</h4>
                                                    <h5 style={{fontSize:"15px"}}>martekgh@gmail.com</h5>
                                                </CardHeader>
                                                    <CardBody style={{margin:"15px"}}>
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
                                    </TabPanel>
                                </Tabs>
                                </Col>
                            </Row>
                            </Card>
                        </Col>
                    </Row>
                    </Container>
                </div>
        </div>
    );
}