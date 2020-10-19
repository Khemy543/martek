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


export default function SellOnMartek(){
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
                            <Tab tabFor="vertical-tab-one" style={{textAlign:"left"}}>FAQ <i className="fa fa-chevron-right"/></Tab>
                            <Tab tabFor="vertical-tab-two" style={{textAlign:"left"}}>How To Buy On Martek <i className="fa fa-chevron-right"/></Tab>
                            <Tab tabFor="vertical-tab-three" style={{textAlign:"left"}}>Sell On Martek <i className="fa fa-chevron-right"/></Tab>
                            <Tab tabFor="vertical-tab-four" style={{textAlign:"left"}}>Own A Shop On Martek <i className="fa fa-chevron-right"/></Tab>
                            <Tab tabFor="vertical-tab-five" style={{textAlign:"left"}}>Service Charges <i className="fa fa-chevron-right"/></Tab>
                            <Tab tabFor="vertical-tab-six" style={{textAlign:"left"}}>Contact Us <i className="fa fa-chevron-right"/></Tab>
                            </TabList>
                            <TabPanel tabId="vertical-tab-one">
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
                                        
                                </Col>    
                            </Row>

                            <Row >
                                <Col md="12" lg="12" sm="12" xs="12" >
                                        <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I Sign-in and Sign-out of my account?</h4>
                                        <p>
                                        To Sign-in to your account, simply open menu and select “Sign-in” under the user options and enter email and password to sign-in.
                                        <br/>
                                        <br/>
                                        To Sign-out of your account, simply click the "Sign-out" under the User options in Menu
                                        </p>
                                        
                                </Col>    
                            </Row>

                            <Row >
                                <Col md="12" lg="12" sm="12" xs="12" >
                                        <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I change my password on Martek?</h4>
                                        <p>
                                        To change password, please log into your account, open menu and select your account under the User options to open your account page. Select “Edit Profile” and select “Change Password” to change your password.<br/>
                                        <br/>
                                        If you have forgotten your Martek password, you can go to the log-in page and click on the "Forgot your password?" l </p>
                                        
                                </Col>    
                            </Row>

                            <Row >
                                <Col md="12" lg="12" sm="12" xs="12" >
                                        <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I change my account details?</h4>
                                        <p>
                                        To change the details on your account, sign in to your account and select your profile with your name under the User option in Menu.<br/>
                                        </p>
                                        
                                </Col>    
                            </Row>

                            <Row style={{marginTop:"30px"}}>
                                <Col md="12" lg="12" sm="12" xs="12" >
                                        <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>Why can't I Sign in to my account?</h4>
                                        <p>
                                        If you are having trouble Signing in to your account, please check that you have:<br/>
                                        •	Signed up for an account.<br/>
                                        •	Entered the correct email address and password on the Sign-in page. <br/>
                                        <br/>
                                        If you are still having trouble accessing your account, please Contact Us.
                                        </p>
                                        
                                </Col>    
                            </Row>

                            <Row>
                                <Col md="12" lg="12" sm="12" xs="12" >
                                        <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>Why does Martek need to verify my identity?</h4>
                                        <p>
                                        Martek is committed to creating a safe and trusted community of buyers and sellers. To deter fraudulent behaviour, we identify every seller who posts an item. When you post an item for the first time, we will contact you within 24 hours to verify your identity.</p>
                                        
                                </Col>    
                            </Row>
                                    </TabPanel>
                                    <TabPanel tabId="vertical-tab-two">
                                    <Row>
                                        <Col md="12" lg="12" sm="12" xs="12">
                                        <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I by on Martek?</h4>
                                                <p>
                                                1.	Type the product you are searching for directly into the search bar<br/><br/>
                                                2.	Or browse through the different categories <br/><br/>
                                                3.	Or scroll through our NEW THIS WEEK section on the home page to find the best deals<br/><br/>
                                                4.	On the product page click “BUY NOW” to call or send a message to the seller through WhatsApp or mail.<br/><br/>
                                                5.	Or on the product page click “ADD TO CART” to buy later<br/><br/>
                                                6.	View cart to see item in your cart, select item and proceed to buy now.<br/>

                                                </p>
                                                
                                        </Col>    
                                    </Row>
                                    </TabPanel>
                                    <TabPanel tabId="vertical-tab-three">
                                    <Row>
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I sell an item on Martek?</h4>
                                                    <p>
                                                    To delete an item, open menu and select “My Item” under the User option to open the “My Item” page to delete your item
                                                    </p>
                                                    
                                            </Col>    
                                        </Row>

                                        <Row >
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I edit my item?</h4>
                                                    <p>
                                                    To delete an item, open menu and select “My Item” under the User option to open the “My Item” page to edit your item

                                                    </p>
                                                    
                                            </Col>    
                                        </Row>
                                        <Row >
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How long does an item stay on Martek?</h4>
                                                    <p>
                                                    Item appear for 30 days, unless you delete them earlier.

                                                    </p>
                                                    
                                            </Col>    
                                        </Row>
                                        <Row style={{marginTop:"90px"}}>
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>I posted an item but can't find it. What's wrong?</h4>
                                                    <p>
                                                    Tip: you can keep track of your item easily by logging in to your account and visiting your "My Item" page!
                                                    <br/>
                                                    <br/>
                                                    Your item may not be live due to one of the following reasons:<br/>
                                                    • It is still under review - this will show on your “My item” page, under “Item under review”<br/>
                                                    • It may have violated our posting rule [hyperlink]<br/>
                                                    • You have used up your free ad allowance<br/>
                                                    If you have been waiting longer than 24 hours for a response from us, you may have given us the wrong contact details when you posted the item. Try posting again or contact us.
                                                    </p>
                                                    
                                            </Col>    
                                        </Row>
                                        <Row >
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>Why has my item been rejected?</h4>
                                                    <p>
                                                    All of the items are manually reviewed - if your item violates our posting rules it will be rejected. You can read what changes you have to make before the item can be approved in the rejection email.
                                                    </p>
                                                    
                                            </Col>    
                                        </Row>
                                        <Row >
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>I'm getting contacted about an item I didn't post. Can you help me?</h4>
                                                    <p>
                                                    Of course. Please contact us and we will help you right away.
                                                    </p>
                                                    
                                            </Col>    
                                        </Row>
                                        <Row style={{marginTop:"120px"}}>
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>What are the rules for posting on Martek?</h4>
                                                    <p>
                                                    We don't allow ads that contain:<br/>
                                                    •	an item or service that is illegal in Ghana<br/>
                                                    •	an item or service that is not located in Ghana<br/>
                                                    •	an invalid phone number or email address<br/>
                                                    •	an unrealistic offer<br/>
                                                    •	offensive language<br/>
                                                    •	offensive pictures<br/>
                                                    •	text in the title or description that is not related to the advertised item or service<br/>
                                                    •	pictures that do not match or clearly show the advertised item or service<br/>
                                                    •	text in the pictures (except logos and product codes)<br/>
                                                    •	multiple items in the same advertisement<br/>
                                                    •	counterfeit goods, knockoffs or replica versions of another company’s product<br/>

                                                    </p>
                                                    
                                            </Col>    
                                        </Row>
                                    </TabPanel>
                                    <TabPanel tabId="vertical-tab-four">
                                    <Row>
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I own a shop on Martek?</h4>
                                                    <p>
                                                    To own a shop on Martek, simply open menu and select “My Shop” from the Martek options to open the Shop Sign-in page. Select Register and follow the instructions to own a shop. </p>
                                                    
                                            </Col>    
                                        </Row>
                                        <Row >
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I add an item in my shop?</h4>
                                                    <p>
                                                    To add an item to your shop, open your shop account, select add item and provide product details to add an item to your shop.
                                                    </p>
                                                    
                                            </Col>    
                                        </Row>
                                        <Row >
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I edit an item in my shop?</h4>
                                                    <p>
                                                    To edit an item in your shop, long in to your shop select item to open item page. Select edit product and make the appropriate changes and select “Save Changes”
                                                    </p>
                                                    
                                            </Col>    
                                        </Row>
                                        <Row >
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I go back to back to Martek Home page form My shop?</h4>
                                                    <p>
                                                    Simply open “Menu” in my shop and select “Back to Site”.
                                                    </p>
                                            </Col>    
                                        </Row>
                                        <Row >
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do Sign-out of my shop?</h4>
                                                    <p>
                                                    Select the Sign-out option in menu to “Sign out”.
                                                    </p>
                                                    
                                            </Col>    
                                        </Row>
                                        <Row style={{marginTop:"120px"}}>
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>What are the rules for posting on Martek?</h4>
                                                    <p>
                                                    We don't allow ads that contain:<br/><br/>
                                                    •	an item or service that is illegal in Ghana <br/>
                                                    •	an item or service that is not located in Ghana<br/>
                                                    •	an invalid phone number or email address<br/>
                                                    •	an unrealistic offer<br/>
                                                    •	offensive language<br/>
                                                    •	offensive pictures<br/>
                                                    •	text in the title or description that is not related to the advertised item or service<br/>
                                                    •	pictures that do not match or clearly show the advertised item or service<br/>
                                                    •	text in the pictures (except logos and product codes)<br/>
                                                    •	multiple items in the same advertisement<br/>
                                                    •	counterfeit goods, knockoffs or replica versions of another company’s product<br/>

                                                    </p>
                                                    
                                            </Col>    
                                        </Row>
                                    </TabPanel>
                                    <TabPanel tabId="vertical-tab-five">
                                    <Row>
                                            <Col md="12" lg="12" sm="12" xs="12">
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>Sell an Item</h4>
                                                    <p>
                                                        Selling on Martek for the first time is free! Sign up on Martek and get 3 months free of selling charges.<br/>
                                                        After the promo period, you will be charged a fee depending oon the price of the item being sold. You can take a look at the fee structure below:<br/>
                                                    </p>
                                                    
                                            </Col>    
                                        </Row>

                                        <Row>
                                            <Col md="12">
                                                <Table bordered striped>
                                                    <thead style={{backgroundColor:"#6ec7e0"}}>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Item cost (GHS)</th>
                                                        <th>Fee/Charge (GHS)</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>0.1 – 20.00</td>
                                                        <td>Free</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>20.1 – 1,000.00</td>
                                                        <td>1% of item cost</td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>1,000.01 – 3,000.00</td>
                                                        <td>12</td>
                                                    </tr>
                                                    <tr>
                                                        <td>4</td>
                                                        <td>3,000.01 and above</td>
                                                        <td>15</td>
                                                    </tr>    
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>

                                        <Row style={{marginTop:"120px"}}>
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>Own a Shop</h4>
                                                    <p>
                                                    Owning a shop on Martek is free for the first semester of registration! Sign up on Martek s a Shop owner and sell for free for one whole semester.<br/>
                                                    After this period, you will be charged a monthly subscription fee depending on the type of shop you own. You can take a look at the fee structure below:

                                                    </p>
                                                    
                                            </Col>    
                                        </Row>

                                        <Row>
                                            <Col md="12">
                                                <Table bordered striped>
                                                    <thead style={{backgroundColor:"#6ec7e0"}}>
                                                    <tr>
                                                        <th>#</th>
                                                        <th>Type</th>
                                                        <th>Fee (GHS)</th>
                                                    </tr>
                                                    </thead>
                                                    <tbody>
                                                    <tr>
                                                        <td>1</td>
                                                        <td>Mini-Shop</td>
                                                        <td>20</td>
                                                    </tr>
                                                    <tr>
                                                        <td>2</td>
                                                        <td>Max-Shop</td>
                                                        <td>40</td>
                                                    </tr>
                                                    <tr>
                                                        <td>3</td>
                                                        <td>Non-Student Shop</td>
                                                        <td>80</td>
                                                    </tr>   
                                                    </tbody>
                                                </Table>
                                            </Col>
                                        </Row>
                                    </TabPanel>
                                    
                                    <TabPanel tabId="vertical-tab-six">
                                    <Row style={{marginTop:"20px"}}> 
                                        <Col md="10" lg="10" sm="12" xs="12" style={{marginLeft:"auto", marginRight:"auto"}}>
                                                <div>
                                                <Alert isOpen={visible} toggle={toggle}  color="success" fade={true} style={{fontWeight:500, textTransform:"capitalize"}}>
                                                    Message Sent
                                                </Alert>
                                                </div>
                                                <Card className="card-plain shadow" style={{backgroundColor:"white", borderRadius:"5px"}}>
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
                    </Container>
                </div>
        </div>
    );
}