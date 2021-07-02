import React from "react";

// reactstrap components
import { Button, Card, FormFeedback, Form, Input, Container, Row, Col, Modal, ModalBody, Alert, InputGroup, InputGroupAddon, InputGroupText, Spinner } from "reactstrap";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import history from "../history.js";

//axios
import axios from "axios";
import swal from 'sweetalert';

axios.defaults.withCredentials = false;
//axios.defaults.headers.common['Auth-Token'] = 'foo bar';
const config = {
  withCredentials: false,
  headers: {
    "Access-Control-Allow-Origin": "*",
    "Content-Type": "application/json",
    "Accept": "application/json"

  },

};


function RegisterPage(props) {

  //states
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [campus_id, setCampus_id] = React.useState(1);
  const [campusList, setCampusList] = React.useState([]);
  const [isActive, setIsActive] = React.useState(false);
  const [modal, setModal] = React.useState(false);
  const [errorMessage, setErrorMessage] = React.useState("");
  const [confrimPassword, setConfirmPassword] = React.useState("");
  const [errors, setErrors] = React.useState({});


  React.useEffect(() => {
    axios.get("https://backend-api.martekgh.com/api/campuses")
      .then(res => {
        if (res.status === 200) {
          setCampusList(res.data)
        }
      })
      .catch(error => {
      })
  }, []);


  const handleSubmit = (e) => {
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
        tempErrors.confirm_password = "Passwords do not match";
      }

      if(!(Object.keys(tempErrors).length === 0 && tempErrors.constructor === Object)){
        setErrors(tempErrors);
        setIsActive(false)
        return;
      }
      axios.post('https://backend-api.martekgh.com/api/register-user', {
        config, name, email, phone: `233${phone}`, password, campus_id
      }).then(res => {
        if (res.data.status === "success") {
          setIsActive(false);
          swal({
            title: "Success!",
            text: "Registration Successful!",
            icon: "success",
            buttons:false,
            timer:2500
          })
            axios.post('https://backend-api.martekgh.com/api/auth/login',{
              email, password
            })
            .then(res=>{
              localStorage.setItem('access_token',res.data.access_token);
              setTimeout(
                function () {
                  setModal(false);
                  history.push("/auth/wait-verification", { email: email })
                },
                1500
              )
            })
        }
      }).catch(error => {
        if(error.response.status == 422){
          setErrors(error.response.data.errors)
        }
        setIsActive(false)
      })
  }

  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("register-page");
    return function cleanup() {
      document.body.classList.remove("register-page");
    };
  });
  return (
    <>
      <div className="section">
        <Container style={{ marginTop: "30px" }}>
          <Row>
            <Col className="ml-auto mr-auto" lg="6" md="6">
              <h4 className="title mx-auto" style={{ fontWeight: 600, fontSize: "15px", color: "#ff6a00" }}>Create Account</h4>
              <Form onSubmit={handleSubmit}>
                <Row>
                  <Col>
                    <label style={{ fontWeight: 500 }}>Name</label>
                    <Input invalid={errors.name} placeholder="Name" type="text" name="name" value={name} onChange={e => setName(e.target.value)} required />
                    <FormFeedback style={{fontWeight:500}}>{errors.name}</FormFeedback>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label style={{ fontWeight: 500 }}>Email</label>
                    <Input invalid={errors.email} placeholder="Email" type="email" name="email" value={email} onChange={e => setEmail(e.target.value)} required />
                    <FormFeedback style={{fontWeight:500}}>{errors.email}</FormFeedback>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col md="6">
                    <label style={{ fontWeight: 500 }}>Phone</label>
                    <InputGroup style={{borderColor:"inherit"}}>
                      <InputGroupAddon addonType="prepend">
                        <InputGroupText>
                          +233
                              </InputGroupText>
                      </InputGroupAddon>
                      <Input invalid={errors.phone} placeholder="Phone" type="text" name="country_code" value={phone} onChange={e => setPhone(e.target.value)} required />
                      <FormFeedback style={{fontWeight:500}}>{errors.phone}</FormFeedback>
                    </InputGroup>
                    
                  </Col>
                  <Col md="6">
                    <label style={{ fontWeight: 500 }}>Campus</label>
                    <Input invalid={errors.campus} placeholder="Campus" type="select" name="phone" value={campus_id} onChange={e => setCampus_id(e.target.value)} required>
                      {campusList.map(value => <option key={value.id} value={value.id}>{value.campus}</option>)}
                    </Input>
                    <FormFeedback style={{fontWeight:500}}>{errors.campus}</FormFeedback>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label style={{ fontWeight: 500 }}>Password</label>
                    <Input invalid={errors.password} placeholder="Password" type="password" name="password"
                    value={password} onChange={e => setPassword(e.target.value)} required />
                    <FormFeedback style={{fontWeight:500}}>{errors.password}</FormFeedback>
                  </Col>
                </Row>
                <br />
                <Row>
                  <Col>
                    <label style={{ fontWeight: 500 }}>Confirm Password</label>
                    <Input invalid={errors.confirm_password} placeholder="Confirm Password" type="password" name="confirmPassword" value={confrimPassword} onChange={e => setConfirmPassword(e.target.value)} required />
                    <FormFeedback style={{fontWeight:500}}>{errors.confirm_password}</FormFeedback>
                  </Col>
                </Row>
                 <br />
                {!isActive ?
                  <Button block className="btn-round" color="info" type="submit" style={{ marginBottom: "30px" }}>
                    Register
                  </Button>
                  :
                  <Button color="info" className="btn-round" block style={{ marginBottom: "30px" }}>
                    <Spinner size="sm" />
                  </Button>
                }
              </Form>
              <p style={{ textAlign: "center" }}>Already have an account?</p>
              <div style={{ textAlign: "center" }}>
                <Button
                  style={{ backgroundColor: "transparent", borderColor: "transparent", color: "#ff6a00" }}
                  onClick={() => history.push('/auth/login-page')}
                >LOGIN</Button>
              </div>
            </Col>
          </Row>
        </Container>
        <Modal isOpen={modal} className="login-modal">

          <ModalBody style={{ color: "white", fontSize: "12px", fontWeight: 500 }} className="text-center">
            REGISTERED SUCCESSFULLY
      </ModalBody>

        </Modal>
      </div>
    </>
  );
}

export default RegisterPage;
