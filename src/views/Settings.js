/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";
// reactstrap components
import {
  Button,
  Input,
  Container,
  Row,
  Form,
  InputGroup,InputGroupAddon,InputGroupText,Col,Popover,PopoverBody,PopoverHeader,Modal,ModalBody
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

const toggle = () => setPopoverOpen(!popoverOpen);

let merchandiser = localStorage.getItem("shop_access_token")

  React.useEffect(()=>{
    setIsActive(true)
    axios.get("https://martek.herokuapp.com/api/merchandiser",{
      headers:{ 'Authorization':`Bearer ${merchandiser}`}
})
    .then(res=>{
      console.log(res.data)
      setCompany_name(res.data.company_name);
      setCompany_description(res.data.company_description);
      setShopType(res.data.shop_type);
      setPhone(res.data.phone);
      setEmail(res.data.email)
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

    axios.get("https://martek.herokuapp.com/api/shop-types")
    .then(res=>{
        const shop_type_data = res.data;
        
         setShop_type_list(shop_type_data)
         setIsActive(false)
        
        
        //return setCampusList(campuses)
        
    });

    axios.get("https://martek.herokuapp.com/api/campuses")
    .then(res=>{
        const campuses = res.data;
        if(res.status === 200){
          setCampusList(campuses)
          setIsActive(false)
        }
    });
  },[merchandiser])

  const handleDelete=()=>{
    setIsActive(true)
    axios.delete("https://martek.herokuapp.com/api/merchandiser/delete",{
        headers:{"Authorization":`Bearer ${merchandiser}`}
    })
    .then(res=>{
        history.push("/user/home");
        localStorage.removeItem('shop_access_token');
        setIsActive(false)
    })
    .catch(error=>{
        setIsActive(false)
    })
}

  const handleSubmit=(e)=>{
    setIsActive(true);
    e.preventDefault();

    axios.patch("https://martek.herokuapp.com/api/merchandiser/"+id+"/update",{company_name,campus_id,company_description,phone,email},
    { headers:{"Authorization":`Bearer ${merchandiser}`}})
    .then(res=>{
      console.log(res.data)
      if(res.data.status === "success"){
        setModal(true);
        setIsActive(false);
        setTimeout(
          function(){
              setModal(false);
          },
          1500
      )
      }
    }).catch(error=>{
      setIsActive(false);
    })
    
  }

  return (
    <div>
      <LoadingOverlay 
      active = {isActive}
      spinner={<BounceLoader color={'#4071e1'}/>}
      >
      <div className="section">
          <br/>
          <br/>
          <br/>
          <Container>
          <Row>
          <Col md="3">
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
              {console.log("cam:",campus_id)}
              <Input placeholder="Campus" type="select" value={campus_id} onChange={e=>{setCampus_id(e.target.value); console.log(e.target.value)}}>
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
       id="Popover1"
       >
       Delete Shop
         </Button>
         <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
            <PopoverHeader>Do you want to delete?</PopoverHeader>
            <br/>
            <PopoverBody><Button color="danger" onClick={handleDelete}>yes</Button> <Button color="info" onClick={toggle} style={{marginLeft:"15px"}}>no</Button></PopoverBody>
        </Popover>
       </Col>
       </Row>
          </Form>  
      </Col>

      
      
      </Row>
      
      

            </Container>
      </div>
      </LoadingOverlay>
      <Col className="ml-auto mr-auto" md="12">
                <Modal isOpen={modal} style={{maxHeight:"40px", maxWidth:"300px"}} className="alert-modal">
                    <ModalBody>
                    <h4 style={{textAlign:"center", marginTop:"-3%", fontWeight:"500", color:"white"}}>UPDATED!!</h4>
                    </ModalBody>
                    
                    </Modal>
      </Col>
    </div>
  );
}

export default Settings;
