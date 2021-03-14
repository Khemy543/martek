
import React from 'react';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import history from "../history.js";
import {
  Alert,Row,Col,Container, Input,
  InputGroup, InputGroupAddon, InputGroupText,Button, FormFeedback
} from "reactstrap";
 
import axios from "axios";
import swal from 'sweetalert'

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
  const [eye, setEye] = React.useState(false);
  const [eye2, setEye2] = React.useState(false);
  const [errors, setErrors] = React.useState({});
  
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
      setIsActive(true);
      setErrors({});
      let tempErrors = {};
      if(phone.length != 9){
        tempErrors.phone = "9 digit number without preceding 0"
      }
      if(password.length < 6){
        tempErrors.password = "Password must have more than 6 characters";
      }
      if(password != confrimPassword){
        tempErrors.confrim_password = "Passwords do not match";
      }

      if(!(Object.keys(tempErrors).length === 0 && tempErrors.constructor === Object)){
        console.log(tempErrors)
        setErrors(tempErrors);
        setIsActive(false)
        return;
      }

    axios.post('https://backend-api.martekgh.com/api/register-merchandiser',
    {company_name, email,phone:`233${phone}`,password, campus_id,company_description,shop_type_id, free_trail:props.location.state.status}
  ).then(res => {
    console.log(res);
    axios.post('https://backend-api.martekgh.com/api/merchandiser/login', {email, password}).then(response=>{localStorage.setItem('shop_access_token', response.data.access_token)})
        swal({
          title: "Success!",
          text: "Registration Successful!",
          icon: "success",
          buttons:false,
          timer:2500
        })
        setTimeout(
          function(){
            history.push("/auth/upload-avatar",
            {
              id:res.data.merchandiser_id
            });
          },
          100
      )
    }).catch(error => {
      /* console.log("error",error);
      console.log(error.response.data)
      setIsActive(false); */
      if(error.response.status == 422){
        setErrors(error.response.data.errors)
      }
      setIsActive(false)
    })
  
  }

  return (
    <div className="main">
        <div className="section">
        <br/>
        <Container>
          <Row>
            <Col md='7' className="mr-auto ml-auto">
          <h4 className="title mx-auto" style={{ fontWeight: 600, fontSize: "15px", color: "#ff6a00" }}>Own A Shop</h4>
          <form onSubmit={handleSubmit}>
              <Row>
                <Col item xs='12' sm="12" md="12" lg="12" xl="12">
                  <label style={{fontWeight:500}}>Shop Name</label>
                  <Input
                    invalid={errors.company_name}
                    required={true}
                    id="shop_name"
                    label="Shop Name"
                    name="shop_name"
                    type="text"
                    placeholder="Shop Name"
                    value={company_name} onChange={e=>setCompany_name(e.target.value)}
                  />
                  <FormFeedback style={{fontWeight:500}}>{errors.company_name}</FormFeedback>
                  </Col>
                </Row> 
                <br/>
                <Row>
                  <Col item xs='12' sm="12" md="6" lg="6" xl="6">
                    <label style={{fontWeight:500}}>Email</label>
                    <Input
                      invalid={errors.email}
                      required={true}
                      name="email"
                      label="Email"
                      type="email"
                      id="email"
                      placeholder="Email"
                      value={email} onChange={e=>setEmail(e.target.value)}
                    />
                    <FormFeedback style={{fontWeight:500}}>{errors.email}</FormFeedback>
                  </Col>
                  <Col item xs='12' sm="12" md="6" lg="6" xl="6">
                    <label style={{fontWeight:500}}>Phone</label>
                    <InputGroup>
                          <InputGroupAddon addonType="prepend">
                            <InputGroupText>
                              +233
                            </InputGroupText>
                          </InputGroupAddon>
                    <Input invalid={errors.phone} placeholder="Phone" type="text" name="country_code" value={phone} onChange={e => setPhone(e.target.value)} required/>
                    <FormFeedback style={{fontWeight:500}}>{errors.phone}</FormFeedback>
                    </InputGroup>
                  </Col>
                </Row>
                {shop_type_id != 3?
                <>
                <br/>
                <Row>
                  <Col item md={12} sm={12} xs={12} lg={12} xl={12}>
                    <label style={{fontWeight:500}}>Campus</label>
                    <Input invalid={errors.campus} type="select" value={campus_id} onChange={e=>setCampus_id(e.target.value)}>
                      {campusList.map((value)=>(<option value={value.id}>{value.campus}</option>))}
                    </Input>
                    <FormFeedback style={{fontWeight:500}}>{errors.campus}</FormFeedback>
                  </Col>
                </Row>
                </>
                :
                null }
                <br/>
                <Row>
                  <Col>
                    <label style={{fontWeight:500}}>Description</label>
                    <Input 
                      invalid={errors.company_description}
                      value={company_description} onChange={e=>setCompany_description(e.target.value)} 
                      placeholder='Tell us about your shop...'
                      type="textarea"
                    />
                    <FormFeedback style={{fontWeight:500}}>{errors.company_description}</FormFeedback>
                  </Col>
                </Row>
                <br/>
                <Row>
                  <Col sm="12" xs="12" md="6">
                    <label style={{fontWeight:500}}>Password</label>
                        <Input invalid={errors.password} placeholder="Password" type={eye?"text":"password"} name="password"
                        value={password} onChange={e => setPassword(e.target.value)} required/>
                        <FormFeedback style={{fontWeight:500}}>{errors.password}</FormFeedback>        
                  </Col>
                  <br/>
                    <Col sm="12" xs="12" md="6">
                      <label style={{fontWeight:500}}>Confirm Password</label>
                      <Input invalid={errors.confrim_password} placeholder="Confirm Password" type={eye2?"text":"password"} name="confirmPassword" value={confrimPassword} onChange={e => setConfirmPassword(e.target.value)} required/>
                      <FormFeedback style={{fontWeight:500}}>{errors.confrim_password}</FormFeedback>
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