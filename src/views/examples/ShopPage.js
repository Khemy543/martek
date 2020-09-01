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
import { Link } from "react-router-dom";
// reactstrap components
import {
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Col, Card, CardBody,CardTitle
} from "reactstrap";

import axios from "axios";
import {ProductConsumer } from "../../context.js";
// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import history from "../../history.js";


function ShopPage(props) {
  const [activeTab, setActiveTab] = React.useState("1");
  const [/* avatar */, setAvatar] = React.useState(undefined);
  const [company_name, setCompany_name] = React.useState("");
  const [company_description, setCompany_description] = React.useState("");
  const [shopProducts, setShopProducts] = React.useState([]);
  const [campus, setCampus] = React.useState("");
  const [noFollowing, setNumberFollowing] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

let merchandiser = localStorage.getItem("shop_access_token")
  
  React.useEffect(()=>{
    setIsActive(true);
      axios.get("https://martek.herokuapp.com/api/merchandiser",{
          headers:{ 'Authorization':`Bearer ${merchandiser}`}
  }
  )
  .then(res=>{
      
      if(res.data.id !== null){
        setAvatar(res.data.avatar);
        setCompany_name(res.data.company_name);
        setCompany_description(res.data.company_description);
        setCampus(res.data.campus);
        setNumberFollowing(res.data.no_followers);

        axios.get("https://martek.herokuapp.com/api/merchandiser/"+res.data.id+"/products"
      )
        .then(response=>{
            setShopProducts(response.data[0]);
            setIsActive(false)
        })
        .catch(error=>{
        })
      }

      
  })
 
},[merchandiser])


  document.documentElement.classList.remove("nav-open");
  React.useEffect(() => {
    document.body.classList.add("landing-page");
    return function cleanup() {
      document.body.classList.remove("landing-page");
    };
  });
  return (
    <div>
       <LoadingOverlay 
    active = {isActive}
    spinner={<BounceLoader color={'#4071e1'}/>}
    >
      
      <div className="section profile-content text-center">
      <img alt="#" src={require("../../assets/img/header.jpg")} style={{width:"95%", height:"40vh"}}/>
      
        <Container>
        <br/>
        <br/>
        <Container>
          <Row>
            <Col md="4" className="ml-auto mr-auto">
            <div className="avatar">
              <img
                alt="..."
                className="img-circle img-no-padding img-responsive"
                width="150px"
                style={{border:"1px solid #eaeaea" , marginTop:"-245px"}}
                src={require("../../assets/img/new_logo.png")}
              />
            </div>
            </Col>
            </Row>
            <Row style={{marginTop:"-40px"}}>
              <Col md="6">
              <h4 style={{fontSize:"20px", marginTop:"0px",fontWeight:"bold"}}>
                {company_name}
              </h4>
              
              <p>{company_description}</p>
              <h4 style={{ fontSize:"14px"}}>{campus}</h4>
              </Col>
              <Col md="6">
              <div>
                <h5 style={{display:"inline", fontSize:"14px", fontWeight:"bold"}}>{noFollowing}</h5><h4 style={{display:"inline",fontSize:"14px"}}> | followers</h4>
                <h5 style={{display:"inline", fontSize:"14px", fontWeight:"bold", marginLeft:"20px"}}> {shopProducts.length}</h5><h4 style={{display:"inline",fontSize:"14px"}}> | Products</h4>
              </div>
              </Col>

            </Row>  
              
          </Container>
          <br />
          <br/>
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
                    Your Products
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
                <Col lg="3" md="4" sm="6" xs="6">
                <Card className="card-plain" style={{borderRight:"1px solid #eaeaea",margin:"10px 0px 0px 0px", padding:"0px 0px 0px 0px"}}>
                <CardTitle style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", padding:"0px 0px 0px 0px"}}>
                    Add New Product
                    </CardTitle>
                    <br/>
                    <Link to="/shop/add-to-shop">
                    <div style={{textAlign:"center"}}>
                    <img alt="#" src={require("../../assets/img/addproduct.png")} style={{ maxHeight:"185.13px",maxWidth:"100px"}}/>
                    </div>
                    </Link>
                    <br/>
                  
                  </Card>
                </Col>
                <ProductConsumer>
                  {(value=>(
                shopProducts.map(products=>(
                  <Col lg="3" md="4" sm="6" xs="6">
              <Card className="card-plain" style={{borderRight:"1px solid #eaeaea",margin:"10px 0px 0px 0px", padding:"0px 0px 0px 0px"}}>
                <CardTitle style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", padding:"0px 0px 0px 0px"}}>
                {products.product_name}
                    </CardTitle>
                    <br/>
                    
                    <div style={{textAlign:"center",cursor:"pointer"}} onClick={()=>history.push("/shop/shop-product-details",{id:products.id})}>
                    <img alt="#" src={require("../../assets/img/iphone.png")} style={{ maxHeight:"185.13px",maxWidth:"100px"}}/>
                    </div>
                    <br/>
                    <CardBody style={{color:"#5588b7", fontSize:"14px", fontWeight:"500",padding:"0px 0px 0px 0px"}}>¢ {products.price}</CardBody>
                </Card>
                </Col>
                
                ))
              ))}
                </ProductConsumer>
                
              </Row>

              </Container>
            </TabPane>
          </TabContent>
        </Container>
      </div>
      </LoadingOverlay>
    </div>
  );
}

export default ShopPage;
