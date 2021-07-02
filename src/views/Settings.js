import React from "react";
// reactstrap components
import {
  Button,
  Input,
  Container,
  Row,
  Form,
  InputGroup,InputGroupAddon,InputGroupText,Col,Popover,PopoverBody,PopoverHeader,Modal,ModalBody, TabPane, Nav,
  NavLink, NavItem,TabContent
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
//import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import history from "../history";


function Settings() {
  const [activeTab, setActiveTab] = React.useState("1");
const [company_name, setCompany_name] = React.useState("");
const [email, setEmail] = React.useState("");
const [company_description, setCompany_description] = React.useState("");
const [shopType, setShopType] = React.useState("");
const [shop_type_list, setShop_type_list]=React.useState([]);
const [/* shop_type_id, */ setshop_type_id]=React.useState(null);
const [campus_id, setCampus_id] = React.useState(null);
const [campusList, setCampusList]=React.useState([]);
const [isActive, setIsActive] = React.useState(false);
const [phone, setPhone] = React.useState('');
const [id, setId] = React.useState(null);
const [popoverOpen, setPopoverOpen] = React.useState(false);
const [modal, setModal] = React.useState(false);
const [new_password, setNewPassword] = React.useState("");
const [password, setOldPassword] = React.useState("")
const [confirmPassword, setConfirmPassword] = React.useState("")
const [eye1, setEye1] = React.useState(false);
const [eye2, setEye2] = React.useState(false);
const [eye3, setEye3] = React.useState(false);
const [message, setMessage] = React.useState("");
const [avatarImagePreview, setAvatarImage] = React.useState("");
const [coverImagePreview, setCoverImage] = React.useState("");
const [cover, setCover] = React.useState("");
const [avatar, setAvatar] = React.useState("")

const toggle = () => setPopoverOpen(!popoverOpen);

let merchandiser = localStorage.getItem("shop_access_token")
const tabToggle = tab => {
  if (activeTab !== tab) {
    setActiveTab(tab);
  }
};

  React.useEffect(()=>{
    setIsActive(true)
    axios.get("https://backend-api.martekgh.com/api/merchandiser",{
      headers:{ 'Authorization':`Bearer ${merchandiser}`}
})
    .then(res=>{
      setCompany_name(res.data.company_name);
      setCompany_description(res.data.company_description);
      setShopType(res.data.shop_type);
      setPhone(res.data.phone);
      setEmail(res.data.email);
      setCoverImage(`https://backend-api.martekgh.com/${res.data.cover_photo}`);
      setAvatarImage(`https://backend-api.martekgh.com/${res.data.avatar}`)
      setIsActive(false);
      setId(res.data.id);
      if(res.data.campus === "KNUST"){
      setCampus_id(1);
      }else  if(res.data.campus === "UCC"){
        setCampus_id(2);
        }else  if(res.data.campus === "UENR"){
          setCampus_id(3);
          }else  if(res.data.campus === "UMAT"){
            setCampus_id(4);
            }else  if(res.data.campus === "LEGON"){
              setCampus_id(5);
              }else  if(res.data.campus === "UPSA"){
                setCampus_id(6);
                }
    })
    .catch(error=>{
    });

    axios.get("https://backend-api.martekgh.com/api/shop-types")
    .then(res=>{
        const shop_type_data = res.data;
        
         setShop_type_list(shop_type_data)
         setIsActive(false)
    });

    axios.get("https://backend-api.martekgh.com/api/campuses")
    .then(res=>{
        const campuses = res.data;
        if(res.status === 200){
          setCampusList(campuses)
          setIsActive(false)
        }
    });
  },[merchandiser])


  const handleSubmit=(e)=>{
    setIsActive(true);
    e.preventDefault();

    axios.patch("https://backend-api.martekgh.com/api/merchandiser/"+id+"/update",{company_name,campus_id,company_description,phone,email},
    { headers:{"Authorization":`Bearer ${merchandiser}`}})
    .then(res=>{
      if(res.data.status === "success"){
        setModal(true);
        setMessage("UPDATED")
        setIsActive(false);
        setTimeout(
          function(){
              setModal(false);
              setNewPassword("");
              setOldPassword("");
              setConfirmPassword("");
              setActiveTab("1")
          },
          1500
      )
      }
    }).catch(error=>{
      setIsActive(false);
    })
    
  }

  const changePassword=(e)=>{
    e.preventDefault()
    if(new_password === confirmPassword){
    axios.post("https://backend-api.martekgh.com/api/merchandiser/change/password",
    {password,new_password},{
      headers:{ 'Authorization':`Bearer ${merchandiser}`}
}).then(res=>{
  setModal(true);
  setMessage("Password Changed")
  setTimeout(
    function(){
        setModal(false);
    },
    1500
)
})
.catch(error=>{
})

  }
  else{
    setModal(true);
    setMessage("Passwords Do Not Match") 
    setTimeout(
      function(){
          setModal(false);
      },
      1500
  )
  }
}

function _handleAvatarChange(e) {
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];

  reader.onloadend = () => {
    setAvatar(file);
    setAvatarImage(reader.result)
  }

  reader.readAsDataURL(file);

  let bodyFormData = new FormData();
  bodyFormData.append('avatar',file);
  axios({method:"post",
  url:`https://backend-api.martekgh.com/api/merchandiser/${id}/store-photos`,
  data:bodyFormData,
  headers:{
    "Content-Type": "multipart/form-data",
  },
  onUploadProgress: (progressEvent) => {
      const {loaded , total} = progressEvent;
      let percentage = Math.floor(loaded * 100 / total);
      if(percentage<100){

      }
  }})
 .then(res=>{
  setModal(true);
  setMessage("SHOP LOGO UPDATED !")
  setTimeout(
    function(){
        setModal(false);
    },
    1500
)
 })
 .catch(error=>{
 })

}

function _handleCoverChange(e) {
  e.preventDefault();

  let reader = new FileReader();
  let file = e.target.files[0];

  reader.onloadend = () => {
   setCover(file);
   setCoverImage(reader.result)
  }

  reader.readAsDataURL(file);

  let bodyFormData = new FormData();
   bodyFormData.append('cover_photo',file);
   axios({method:"post",
   url:`https://backend-api.martekgh.com/api/merchandiser/${id}/store-photos`,
   data:bodyFormData,
   headers:{
     "Content-Type": "multipart/form-data",
   },
   onUploadProgress: (progressEvent) => {
       const {loaded , total} = progressEvent;
       let percentage = Math.floor(loaded * 100 / total);
       if(percentage<100){

       }
   }})
  .then(res=>{
    setModal(true);
  setMessage("COVER PHOTO UPDATED !")
  setTimeout(
    function(){
        setModal(false);
    },
    1500
)
  })
  .catch(error=>{
  })
}

  return (
    <div>
      <div className="section">
          <br/>
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
                          tabToggle("1");
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
                        tabToggle("2");
                      }}
                    >
                    Change Password
                    </NavLink>
                  </NavItem>
                  </Nav>
                </div>
              </div>
              {/* tabs */}
          <TabContent className="" activeTab={activeTab}>
          <TabPane tabId="1" id="follows">
          <Container>
          <Row>
          <Col md="6">
          <Row> 
                  <Col sm="12" xs="12" md="6">
                      <small className=" d-block text-uppercase font-weight-bold mb-4">
                        Shop Logo
                      </small>
                      <img
                        alt="..."
                        className=" img-fluid rounded-circle shadow"
                        src={avatarImagePreview}
                        style={ {width: "150px",height:"150px",marginBottom:"20px"} }
                      ></img>
                      <br/>
                  <Input type="file" 
                               onChange={(e)=>_handleAvatarChange(e)}  />
                    </Col>
                    <Col sm="12" xs="12" md="6">
                      <small className=" d-block text-uppercase font-weight-bold mb-4">
                        Cover photo
                      </small>
                      <img
                        alt="..."
                        className=" img-fluid rounded-circle shadow"
                        src={coverImagePreview}
                        style={ {width: "150px",height:"150px",marginBottom:"20px"} }
                      ></img>
                      <br/>
                  <Input type="file" 
                                onChange={(e)=>_handleCoverChange(e)} />
                    </Col>
                      </Row>
          </Col>
      
      <Col md="6">
      <Form onSubmit={handleSubmit}>
      <Row>
          <Col>
              <label>SHOP NAME</label>
              <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="nc-icon nc-money-coins" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Shop name" type="text" value={company_name} onChange={e=>setCompany_name(e.target.value)}/>
            </InputGroup>
          </Col>
      </Row>
      <br/>
      <Row>
          <Col>
              <label>PHONE</label>
              <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="nc-icon nc-money-coins" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Phone" type="text" value={phone} onChange={e=>setPhone(e.target.value)}/>
            </InputGroup>
          </Col>
      </Row>
      <br/>
      <Row>
          <Col>
              <label>Email</label>
              <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="nc-icon nc-money-coins" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)}/>
            </InputGroup>
          </Col>
      </Row>
      <br/>
      <Row>
          <Col>
              <label>CAMPUS</label>
              <InputGroup>
              <InputGroupAddon addonType="prepend">
                <InputGroupText>
                  <i className="nc-icon nc-money-coins" />
                </InputGroupText>
              </InputGroupAddon>
              <Input placeholder="Campus" type="select" value={campus_id} onChange={e=>{setCampus_id(e.target.value);}}>
                      {campusList.map(value => <option key={value.id} value={value.id}>{value.campus}</option>)}
                      </Input>
            </InputGroup>
          </Col>
      </Row>
      <br/>
      <Row>
          <Col>
              <label>DESCRIPTION</label>
              <InputGroup>
              <InputGroupAddon addonType="prepend">
              
              </InputGroupAddon>
              <Input placeholder="more about your shop..." type="textarea" style={{height:"120px"}} value={company_description} onChange={e=>setCompany_description(e.target.value)}/>
            </InputGroup>
          </Col>
      </Row>
      
      <br/>
      <Row>
      <Col md='6'>
      <Button
      block
      color="info"
      type="submit"
      >Update
          </Button>
       </Col>   
       <Col md="6">
       <Button
       block
       type="button"
       color="danger"
       onClick={()=>history.push('/shop/delete-shop',{name:company_name})}
       >
       Delete Shop
         </Button>
         {/* <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
            <PopoverHeader>Do you want to delete?</PopoverHeader>
            <br/>
            <PopoverBody><Button color="danger" onClick={handleDelete}>yes</Button> <Button color="info" onClick={toggle} style={{marginLeft:"15px"}}>no</Button></PopoverBody>
        </Popover> */}
       </Col>
       </Row>
          </Form>  
      </Col>

      
      
      </Row>
      
            </Container>
            </TabPane>
            <TabPane tabId="2" id="changepassword">
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
       <div style={{
         display:"flex",
         justifyContent:"center"
       }}>
          <Modal isOpen={modal} style={{maxHeight:"40px", maxWidth:"500px"}} className="alert-modal">
              <ModalBody style={{ color: "white", fontSize: "12px", fontWeight: 500 }} className="text-center">
                {message}!
              </ModalBody> 
          </Modal>
      </div>
    </div>
  );
}

export default Settings;
