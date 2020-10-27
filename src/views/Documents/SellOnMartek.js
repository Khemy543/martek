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
                        <Tabs defaultTab="vertical-tab-one" vertical={layout}>
                            <TabList>
                            <Tab tabFor="vertical-tab-one" style={{textAlign:"left"}}>Sell On Martek <i className="fa fa-chevron-right"/></Tab>
                            <Tab tabFor="vertical-tab-two" style={{textAlign:"left"}}>Own A Shop On Martek <i className="fa fa-chevron-right"/></Tab>
                            <Tab tabFor="vertical-tab-three" style={{textAlign:"left"}}>Service Charges <i className="fa fa-chevron-right"/></Tab>
                            </TabList>
                           
                                    <TabPanel tabId="vertical-tab-one">
                                    <Container>
                                    <Row>
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I sell an item on Martek?</h4>
                                                    <p>Selling your item on Martek is quick and easy! Simply click on "Sell" button and follow the instructions. If you are not already logged in, you will need to log in as the first step of selling a item.<br/><br/>
                                                    Your item will go live once it has been reviewed(this usually takes less than 1 hour during office hours).
                                                    Please not, all first-time sellers are verified before items are approved.
                                                    </p>
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I delete my item?</h4>
                                                    <p>
                                                    To delete an item, open menu and select “My Item” under the User option to open the “My Item” page to delete your item
                                                    </p>
                                                    
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I edit my item?</h4>
                                                    <p>
                                                    To delete an item, open menu and select “My Item” under the User option to open the “My Item” page to edit your item

                                                    </p>
                                                    
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How long does an item stay on Martek?</h4>
                                                    <p>
                                                    Item appear for 30 days, unless you delete them earlier.

                                                    </p>
                                              
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
                                              
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>Why has my item been rejected?</h4>
                                                    <p>
                                                    All of the items are manually reviewed - if your item violates our posting rules it will be rejected. You can read what changes you have to make before the item can be approved in the rejection email.
                                                    </p>
                                              
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>I'm getting contacted about an item I didn't post. Can you help me?</h4>
                                                    <p>
                                                    Of course. Please contact us and we will help you right away.
                                                    </p>
                                                   
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
                                                    <br/><br/><br/>
                                                    </p>
                                                    
                                            </Col>    
                                        </Row>
                                        </Container>
                                    </TabPanel>
                                    <TabPanel tabId="vertical-tab-two">
                                    <Container>
                                    <Row>
                                            <Col md="12" lg="12" sm="12" xs="12" >
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I own a shop on Martek?</h4>
                                                    <p>
                                                    To own a shop on Martek, simply open menu and select “My Shop” from the Martek options to open the Shop Sign-in page. Select Register and follow the instructions to own a shop. </p>
                                                    
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I add an item in my shop?</h4>
                                                    <p>
                                                    To add an item to your shop, open your shop account, select add item and provide product details to add an item to your shop.
                                                    </p>
                                                    
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I edit an item in my shop?</h4>
                                                    <p>
                                                    To edit an item in your shop, long in to your shop select item to open item page. Select edit product and make the appropriate changes and select “Save Changes”
                                                    </p>
                                                    
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do I go back to back to Martek Home page form My shop?</h4>
                                                    <p>
                                                    Simply open “Menu” in my shop and select “Back to Site”.
                                                    </p>
                                            
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>How do Sign-out of my shop?</h4>
                                                    <p>
                                                    Select the Sign-out option in menu to “Sign out”.
                                                    </p>
                                                    
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
                                                    <br/><br/><br/>
                                                    </p>
                                                    
                                            </Col>    
                                        </Row>
                                        </Container>
                                    </TabPanel>
                                    <TabPanel tabId="vertical-tab-three">
                                    <Container>
                                    <Row>
                                            <Col md="12" lg="12" sm="12" xs="12">
                                                    <h4 style={{fontSize:"18px",fontWeight:500,marginBottom:"20px"}}>Service Charges</h4>
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

                                        <Row style={{marginTop:"30px"}}>
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
                                        </Container>
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