
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import history from "../history.js";
import {
  Alert,Row,Col,Container, Input,
  InputGroup, InputGroupAddon, InputGroupText,Button
} from "reactstrap";
 
import axios from "axios";

export default function OwnShop(props){

  const [company_name, setCompany_name] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [campus_id, setCampus_id] = React.useState(1);
  const [company_description, setCompany_description]=React.useState("");
  const [campusList, setCampusList]=React.useState([]);
  const [shop_type_list, setShop_type_list]=React.useState([]);
  const [shop_type_id, setshop_type_id]=React.useState(props.location.state.shop_id);
  const [isActive, setIsActive] = React.useState(false);
  const [checkbox, setCheckbox] = React.useState("");
  const [alert, setAlert] = React.useState(false);
  const [errorMessage, setErrorMessage ] = React.useState("");
  const [confrimPassword, setConfirmPassword] = React.useState("");
  const [error, setError]= React.useState(false)
  const [eye, setEye] = React.useState(false);
  const [eye2, setEye2] = React.useState(false);
  
  //const [storeId, setStoreId]=React.useState(undefined);
  
  
  const toggleEye =()=> setEye(!eye);
  const toggleEye2 =()=> setEye2(!eye2);

  React.useEffect(()=>{
    console.log(props.location)
            setIsActive(true)
            axios.get("https://backend-api.martekgh.com/api/campuses")
            .then(res=>{
                const campuses = res.data;
                if(res.status === 200){
                  setCampusList(campuses)
                }
                
            });
  
            axios.get("https://backend-api.martekgh.com/api/shop-types")
            .then(res=>{
                const shop_type_data = res.data;
                
                 setShop_type_list(shop_type_data)
                 setIsActive(false)
                
            });
          },[]);
          
  
  const handleSubmit=(e)=>{
      e.preventDefault();
      if(password != confrimPassword){
        setIsActive(false)
        setErrorMessage("Passwords do not match");
        setAlert(true);
        
      }else{
      if(phone.length === 9){

      setIsActive(true);
    axios.post('https://backend-api.martekgh.com/api/register-merchandiser',
    {company_name, email,phone:`233${phone}`,password, campus_id,company_description,shop_type_id}
  ).then(res => {
    console.log(res.data)
        setTimeout(
          function(){
            history.push("/auth/upload-avatar",
            {
              id:res.data.merchandiser_id,
              status:props.location.state.status
            });
          },
          100
      )
    }).catch(error => {
      console.log("error",error);
      console.log(error.response.data)
      setIsActive(false);
      setAlert(true);
      if(error){
      setErrorMessage(error.response.data.errors.email || error.response.data.errors.phone)
      }
    })
  
  }
}
}

  return (
    <div className="main">
        <div className="section">
        <br/>
        <Container>
          <Row>
            <Col md='7' className="mr-auto ml-auto">
          <h4 className="title mx-auto" style={{ fontWeight: 600, fontSize: "15px", color: "#ff6a00" }}>Own A Shop</h4>
          {alert?
            <Alert color="warning" fade={true} style={{textAlign:"center", fontWeight:500}}>
              {errorMessage}
            </Alert>
            :
            <></>}
          <form onSubmit={handleSubmit}>
              <Row>
                <Col item xs='12' sm="12" md="12" lg="12" xl="12">
                    <label style={{fontWeight:500}}>Shop Name</label>
                  <Input
                    required={true}
                    id="shop_name"
                    label="Shop Name"
                    name="shop_name"
                    type="text"
                    placeholder="Shop Name"
                    value={company_name} onChange={e=>setCompany_name(e.target.value)}
                  />
                  </Col>
                </Row> 
                <br/>
                <Row>
                  <Col item xs='12' sm="12" md="6" lg="6" xl="6">
                    <label style={{fontWeight:500}}>Email</label>
                    <Input
                      required={true}
                      name="email"
                      label="Email"
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={email} onChange={e=>setEmail(e.target.value)}
                    />
                  </Col>
                  <Col item xs='12' sm="12" md="6" lg="6" xl="6">
                    <label style={{fontWeight:500}}>Phone</label>
                    <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              +233
                            </InputGroupText>
                          </InputGroupAddon>
                    <Input placeholder="Phone" type="text" name="country_code" title="9 digit number" pattern="[1-9]{1}[0-9]{8}" value={phone} onChange={e => setPhone(e.target.value)} required/>
                    </InputGroup>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col item md={12} sm={12} xs={12} lg={12} xl={12}>
                    <label style={{fontWeight:500}}>Campus</label>
                    <Input type="select" value={campus_id} onChange={e=>setCampus_id(e.target.value)}>
                      {campusList.map((value)=>(<option value={value.id}>{value.campus}</option>))}
                    </Input>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col>
                    <label style={{fontWeight:500}}>Phone</label>
                    <Input 
                      value={company_description} onChange={e=>setCompany_description(e.target.value)} 
                      placeholder='Tell us about your shop...'
                      type="textarea"
                    />
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col sm="12" xs="12" md="6">
                    <label style={{fontWeight:500}}>Password</label>
                      <InputGroup>
                        <Input placeholder="Password" type={eye?"text":"password"} name="password" value={password} onChange={e => setPassword(e.target.value)} required/>
                          <InputGroupAddon addonType="append" onClick={()=>toggleEye()}>
                            <InputGroupText>
                              <i className= {eye?'fa fa-eye':"fa fa-eye-slash"} style={{cursor:"pointer"}}/>
                            </InputGroupText>
                          </InputGroupAddon>
                    </InputGroup>
                  </Col>
                  <br/>
                    <Col sm="12" xs="12" md="6">
                      <label style={{fontWeight:500}}>Confirm Password</label>
                      <InputGroup>
                      <Input placeholder="Confirm Password" type={eye2?"text":"password"} name="confirmPassword" value={confrimPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
                         <InputGroupAddon addonType="append" onClick={()=>toggleEye2()}>
                            <InputGroupText>
                              <i className= {eye2?'fa fa-eye':"fa fa-eye-slash"} style={{cursor:"pointer"}}/>
                            </InputGroupText>
                          </InputGroupAddon>
                      </InputGroup>
                   </Col>
                </Row>
                  <br/>{/* 
                  <Row>
                  </Row>
                   <br/> */}
                   <Row>
                     <Col style={{fontWeight:500}}>
                      Agree to our  <Link to="#" style={{color:"#0b7dda"}}>Terms</Link> & <Link to="#" style={{color:"#0b7dda"}}>Privacy Policy</Link> <Checkbox style={{float:"right" , marginRight:"20px"}} type="checkbox" value="1" required onChange={e=>setCheckbox(!checkbox)}/>
                     </Col>
                   </Row>
                   <Row>
                    <Col>
                      <Button
                       block className="btn-round" color="info" type="submit"
                      disabled={!checkbox}
                    >
                      Next
                    </Button>
                    </Col>
                  </Row>
               </form>
            </Col>
          </Row>
          </Container>
          </div>
        </div>
  );
}