import React from "react";
import axios from "axios";
// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";
import { Link } from "react-router-dom";

//react strap
import{
    Container,
    Row,
    Col,
   Input,
    Button, InputGroup, InputGroupAddon, InputGroupText,Popover,PopoverBody,PopoverHeader,
    
} from "reactstrap";
//import { ProductConsumer } from "../context";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
//import ShopCard from "../components/ShopCard.js";
import history from "../history.js";

function Profile(){
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [campus, setCampus] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  
  
    
  const toggle = () => setPopoverOpen(!popoverOpen);


  let user = localStorage.getItem('access_token')
  
  const handleDelete=()=>{
    setPopoverOpen(false);
    setIsActive(true);
    axios.delete("https://martek.herokuapp.com/api/auth/user/delete",{
        headers:{"Authorization":`Bearer ${user}`}
    })
    .then(res=>{
        localStorage.removeItem('access_token');
        window.location.reload("/");
        setIsActive(false)
    })
    .catch(error=>{
        setIsActive(false)
    })
}

  React.useEffect(()=>{
      setIsActive(true);
      axios.get("https://martek.herokuapp.com/api/auth/user",{
          headers:{ 'Authorization':`Bearer ${user}`}
  }
  )
  .then(res=>{
      if(res.data!== null){
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setCampus(res.data.campus.campus)
        setIsActive(false)
      }
  }).catch(error=>{
  })
  },[user])


    return(
        <div>
            <div className="main">
                <div className="section">
                <br/>
                <br/>
                
                <Container>
                <p style={{marginBottom:"10px", fontSize:"13px"}}><span style={{cursor:"pointer"}} onClick={()=>history.push("/user/home")}>Home</span><i className="fa fa-chevron-right"/> {name}</p>
               
                <Col className="ml-auto mr-auto" md="6" style={{marginTop:"20px"}}>
               
                <Row>
                    <Col>
                    <Row>
                        <label>NAME</label>
                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-money-coins" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Name" type="text" disabled value={name}/>
                      </InputGroup>
                    </Row>
                    <br/>
                    <Row>
                        <label>EMAIL</label>
                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-envelope-o" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="text" disabled value={email}/>
                      </InputGroup>
                    </Row>
                    <br/>
                    <Row>
                        <label>PHONE</label>
                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-phone" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="phone" type="text" disabled value={phone}/>
                      </InputGroup>
                    </Row>
                    <br/>
                    <Row>
                        <label>CAMPUS</label>
                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-hat-3" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Campus" type="text" disabled value={campus}/>
                      </InputGroup>
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                        <Col>
                        <Link to="/user/edit-profile">
                        <Button
                        color="info"
                        block

                        >edit profile
                            </Button>
                          </Link>
                            </Col>

                            <Col>
                        <Button
                        color="danger"
                        block
                        id="Popover1"
                        >delete account
                            </Button>
                            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                                <PopoverHeader>Do you want to delete?</PopoverHeader>
                                <br/>
                                <PopoverBody><Button color="danger" onClick={handleDelete}>yes</Button> <Button color="info" onClick={toggle} style={{marginLeft:"15px"}}>no</Button></PopoverBody>
                            </Popover>
                            </Col>
                        </Row>
                    </Col>
                </Row>
                </Col>
                </Container>
                
                

                    </div>

                </div>
            </div>
    );
}
export default Profile;