import React from "react";
import axios from "axios";
// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";

//react strap
import{
    Container,
    Row,
    Col,
    Form, Label, Input, Nav, NavItem,NavLink,TabContent,TabPane, 
    Button, InputGroup, InputGroupAddon, InputGroupText,Modal,ModalBody, Alert
   
} from "reactstrap";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import history from "../history.js";

function EditProfile(props){
  const [activeTab, setActiveTab] = React.useState("1");
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [campus_id, setCampus_id] = React.useState(1);
  const [campusList, setCampusList]=React.useState([]);
  const [userID, setUserID] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [alert, setAlert] = React.useState(false);
  const [eye1, setEye1] = React.useState(false);
  const [eye2, setEye2] = React.useState(false);
  const [eye3, setEye3] = React.useState(false);
  const [new_password, setNewPassword] = React.useState("");
  const [password, setOldPassword] = React.useState("")
  const [confirmPassword, setConfirmPassword] = React.useState("");
  const [message, setMessage] = React.useState("")
    
  let user = localStorage.getItem('access_token')
  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  const handleProfileUpdate=(e)=>{
    setIsActive(true);
    e.preventDefault();
    axios.patch("https://martek.herokuapp.com/api/auth/update/"+userID+"/user",{name, email, phone, campus_id},
   {headers:{'Authorization':`Bearer ${user}`}}
  )
  .then(res=>{
    console.log(res.data);
    if(res.data.status === "success"){
      setIsActive(false);
      setModal(true);
      setMessage("UPDATED")
      setTimeout(
        function(){
            setModal(false);
            history.push("/user/profile");
        },
        1500
    )
      
    }
  })
  .catch(error=>{
    console.log(error.response.data);
    setIsActive(false);
    setAlert(true)
  })
  }



  React.useEffect(()=>{
      setIsActive(true)
      axios.get("https://martek.herokuapp.com/api/auth/user",{
          headers:{ 'Authorization':`Bearer ${user}`}
  }
  )
  .then(res=>{
      if(res.data!== null){
        setName(res.data.name);
        setEmail(res.data.email);
        setPhone(res.data.phone);
        setCampus_id(res.data.campus.id);
        setUserID(res.data.id);
        setIsActive(false)
      }
  }).catch(error=>{
  })


  axios.get("https://martek.herokuapp.com/api/campuses")
  .then(res=>{
      const campuses = res.data;
      if(res.status === 200){
        setCampusList(campuses)
      }
      
  });
  },[user])

  const changePassword=(e)=>{
    e.preventDefault()
    if(new_password === confirmPassword){
    axios.post("https://martek.herokuapp.com/api/auth/change/password",
    {password,new_password},{
      headers:{ 'Authorization':`Bearer ${user}`}
}).then(res=>{
  console.log(res.data);
  setModal(true);
  setMessage(res.data.status)
  setTimeout(
    function(){
        setModal(false);
        history.push("/user/profile");
    },
    1500
)
})
.catch(error=>{
  console.log(error)
})

  }
  else{
    setModal(true)
    setMessage("Passwords Do Not Match")
    setTimeout(
      function(){
          setModal(false);
      },
      1500
  )
  }
}


    return(
        <div>
            <div className="main">
                <div className="section">
                <br/>
                <br/>
                <Container>
                <div className="nav-tabs-navigation">
                <div className="nav-tabs-wrapper">
                  <Nav role="tablist" tabs>
                    <NavItem>
                      <NavLink
                        className={activeTab === "1" ? "active" : ""}
                        onClick={() => {
                          toggle("1");
                        }}
                        style={{cursor:"pointer"}}
                      >
                        Edit Profile
                      </NavLink>
                    </NavItem>
                    <NavItem>

                    <NavLink  style={{cursor:"pointer"}}
                      className={activeTab === "2" ? "active" : ""}
                      onClick={() => {
                        toggle("2");
                      }}
                    >
                    Change Password
                    </NavLink>
                  </NavItem>
                  </Nav>
                </div>
              </div>
              {/* Tab panes */}
            <TabContent className="" activeTab={activeTab}>
              <TabPane tabId="1" id="follows">
              <Container>
                  <Row>
                <Col md="6" className="ml-auto mr-auto">
                {alert?
                <Alert color="danger" className="text-center">
                  Email or Phone is taken!!
                </Alert>:
                <div>
                </div>}
                
                <Row>
                    <Col>
                    
                <Form onSubmit={handleProfileUpdate}>
                    <Row>
                    <Col>
                        <label>NAME</label>
                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-money-coins"/>
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Name" type="text" value={name} onChange={e=>setName(e.target.value)}/>
                      </InputGroup>
                    </Col>
                </Row>
                <br/>
                <Row>
                <Col md="6">
                    <label>EMAIL</label>
                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-money-coins" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Email" type="text" value={email} onChange={e=>setEmail(e.target.value)}/>
                      </InputGroup>
                    </Col>
                    <Col md="6">
                    <label>PHONE</label>
                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="fa fa-phone" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Phone" type="text" value={phone} onChange={e=>setPhone(e.target.value)}/>
                      </InputGroup>
                    </Col>
                    
                </Row>
                <br/>
                <Row>
                    <Col>
                    <Label>CAMPUS</Label>
                    <InputGroup>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          <i className="nc-icon nc-hat-3" />
                        </InputGroupText>
                      </InputGroupAddon>
                      <Input placeholder="Campus" type="select" value={campus_id} onChange={e=>setCampus_id(e.target.value)}>
                      {campusList.map(value => <option key={value.id} value={value.id}>{value.campus}</option>)}
                      </Input>

                    </InputGroup>
                    </Col>
                </Row>
                
                <br/>
                <Button
                block
                color="info"
                type="submit"
                >update profile
                  </Button>
                  </Form>
                  </Col>
                </Row>
                </Col>
                </Row>
                </Container>
                </TabPane>
                
                <TabPane tabId="2" id="password">
                <Container>
                <Row>
                <Col md="6" className="ml-auto mr-auto">
                <Form onSubmit={changePassword}>
                <Row>
                  <Col>
                  <label>CURRENT PASSWORD</label>
                  <InputGroup>
                        
                    <Input type={!eye1?"password":"text"} required placeholder="Current Password" value={password} onChange={e=>setOldPassword(e.target.value)}/>
                    <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className={eye1?"fa fa-eye":"fa fa-eye-slash"} onClick={()=>setEye1(!eye1)}/>
                          </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
                  <br/>
                <Row>
                  <Col>
                  <label>NEW PASSWORD</label>
                  <InputGroup>
                        
                    <Input type={!eye2?"password":"text"} required placeholder="New Password" value={new_password} onChange={e=>setNewPassword(e.target.value)}/>
                    <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className={eye2?"fa fa-eye":"fa fa-eye-slash"} onClick={()=>setEye2(!eye2)}/>
                          </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                  <label>RETYPE PASSWORD</label>
                  <InputGroup>
                    <Input type={!eye3? "password":"text"} required placeholder="Retype Password" value={confirmPassword} onChange={e=>setConfirmPassword(e.target.value)}/>
                    <InputGroupAddon addonType="append">
                          <InputGroupText>
                            <i className={eye3?"fa fa-eye":"fa fa-eye-slash"}  onClick={()=>setEye3(!eye3)}/>
                          </InputGroupText>
                        </InputGroupAddon>
                    </InputGroup>
                  </Col>
                </Row>
                  <br/>
                  <Button type="submit" color="info" block>Submit</Button>
                </Form>
                </Col>
                </Row>
                </Container>
                </TabPane>
                </TabContent>
                </Container>

                    </div>

                </div>
                <Modal isOpen={modal} className="login-modal">
      
                <ModalBody style={{color:"white", fontSize:"12px", fontWeight:500}} className="text-center">
                  {message}!!
                </ModalBody>
                
              </Modal>
            </div>
    );
}
export default EditProfile;