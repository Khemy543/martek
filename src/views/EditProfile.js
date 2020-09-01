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
    Form, Label, Input,
    Button, InputGroup, InputGroupAddon, InputGroupText,Modal,ModalBody, Alert
   
} from "reactstrap";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import history from "../history.js";

function EditProfile(props){
    
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [campus_id, setCampus_id] = React.useState(1);
  const [campusList, setCampusList]=React.useState([]);
  const [userID, setUserID] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [alert, setAlert] = React.useState(false)

    
  let user = localStorage.getItem('access_token')
  
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



    return(
        <div>
          <LoadingOverlay 
            active = {isActive}
            spinner={<BounceLoader color={'#4071e1'}/>}
            >
            <div className="main">
                <div className="section">
                <br/>
                <br/>
                <Container>
                  <Form onSubmit={handleProfileUpdate}>
                <Col className="ml-auto mr-auto" md="6">
                {alert?
                <Alert color="danger" className="text-center">
                  Email or Phone is taken!!
                </Alert>:
                <div>
                </div>}
                <Row>
                    <Col>
                    <Row>
                    <Col>
                        <label>NAME</label>
                        <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-money-coins" />
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
                    </Col>
                </Row>
                </Col>
                </Form>
                </Container>

                    </div>

                </div>
                </LoadingOverlay>
                <Modal isOpen={modal} className="login-modal">
      
                <ModalBody style={{color:"white", fontSize:"12px", fontWeight:500}} className="text-center">
                  UPDATED!!
                </ModalBody>
                
              </Modal>
            </div>
    );
}
export default EditProfile;