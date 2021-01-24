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
  Col, Card, CardBody,CardTitle, Spinner
} from "reactstrap";

import axios from "axios";
import {ProductConsumer } from "../../context.js";
// core components
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import Product from "components/Product.js"
import StarRatings from 'react-star-ratings';
import ShopProduct from "components/ShopProduct.js";
import history from '../../history.js';


function ShopPage(props) {
  const [activeTab, setActiveTab] = React.useState("1");
  const [avatar, setAvatar] = React.useState(undefined);
  const [cover, setCover] = React.useState(undefined);
  const [company_name, setCompany_name] = React.useState("");
  const [company_description, setCompany_description] = React.useState("");
  const [shopProducts, setShopProducts] = React.useState([]);
  const [campus, setCampus] = React.useState("");
  const [noFollowing, setNumberFollowing] = React.useState(0);
  const [average, setAverage] = React.useState(0);
  const [isActive, setIsActive] = React.useState(false);

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

let merchandiser = localStorage.getItem("shop_access_token")
  
  React.useEffect(()=>{
    console.log(history)
    setIsActive(true);
      axios.get("https://backend-api.martekgh.com/api/merchandiser",{
          headers:{ 'Authorization':`Bearer ${merchandiser}`}
  }
  )
  .then(res=>{
        console.log(res.data);
        if(res.data.payment_status === "payment required"){
          history.push('/shop/payment/information',{shopType:res.data.shop_type})
        }else{
        setAvatar(res.data.avatar);
        setCompany_name(res.data.company_name);
        setCompany_description(res.data.company_description);
        setCampus(res.data.campus);
        setNumberFollowing(res.data.no_followers);
        setCover(res.data.cover_photo);
        setAverage(res.data.avg_rating)
        axios.get("https://backend-api.martekgh.com/api/merchandiser/"+res.data.id+"/products"
      )
        .then(response=>{
          console.log(response.data)
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
      <div className="section profile-content text-center">
      {isActive?
      <Container>
      <br/>
      <br/>
        <Row>
          <Col className="mr-auto ml-auto">
            <Spinner size="sm" color="info"/> Please Wait
          </Col>
        </Row>
      </Container>
      :
      <>
      <img alt="#" src={`https://backend-api.martekgh.com/${cover}`} style={{width:"95%", marginTop:"10px", objectFit:"cover"}} className="cover-photo"/>
      
        <Container>
        <br/>
        <br/>
        <br/>
        <br/>
        <Container>
          <Row>
            <Col md="5" sm="6" xs="6" xl="5" lg="5" className="ml-auto mr-auto">
            <div className="avatar">
              <img
                  alt="..."
                  id="img-circle"
                  className="img-circle img-no-padding img-responsive"
                  style={{border:"1px solid #eaeaea", width:"120px",height:"120px", marginTop:"200px",objectFit:"cover"}}
                  src={`https://backend-api.martekgh.com/${avatar}`}
              />
            </div>
            </Col>
            </Row>
            <Row style={{marginTop:"-40px"}}>
              <Col md="4" sm="4" xs="4" lg="4" xl="4">
              <h4 style={{fontSize:"20px", marginTop:"0px",fontWeight:"bold"}}>
                {company_name}
              </h4>
              <StarRatings
                rating={Number(average)}
                starRatedColor="#CFB53B"
                numberOfStars={5}
                name='rating'
                starDimension="18px"
                starSpacing="1px"
                />
              </Col>
              <Col md="4" sm="4" xs="4" lg="4" xl="4">

              </Col>
              <Col md="4" sm="4" xs="4" lg="4" xl="4">
              <div>
                <h5 style={{display:"inline", fontSize:"14px", fontWeight:"bold"}}>{noFollowing}</h5><h4 style={{display:"inline",fontSize:"14px"}}> | followers</h4>
                
              <h4 style={{ fontSize:"14px", marginTop:"5px"}}>{campus}</h4>
              </div>
              </Col>

            </Row>  
            <Row style={{marginTop:"10px"}}>
              <Col md="7" xl="7" sm="12" xs="12" lg="7" className="mr-auto ml-auto">
              <p>{company_description}</p>
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
                <Card style={{ width: "100%", border: "1px solid #eaeaea", borderRadius: "5px", backgroundColor: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }} className="card-plain">
                  <CardTitle style={{ padding: "5px 0px 0px 0px", margin: "0px 15px 0px 15px", borderBottom: "1px solid #eaeaea" }}>
                        <h3 style={{ fontWeight: 500, fontSize:"16px", textAlign:"left"}}>
                          <i className="fa fa-gg" style={{ color: "#ff8d00" }} /> PRODUCTS
                        </h3>
                  </CardTitle>
                  <CardBody>
                    <Container>
                      <Row>
                      {shopProducts.length<20?
                          <Col lg="2" md="2" sm="6" xs="6" xl="2">
                          <Card className="card-plain" style={{borderRight:"1px solid #eaeaea",margin:"10px 0px 0px 0px", padding:"0px 0px 0px 0px"}}>
                              <CardTitle style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", padding:"0px 0px 0px 0px"}}>
                              Add New Product
                              </CardTitle>
                              <br/>
                              <Link to="/shop/add-to-shop">
                              <div style={{textAlign:"center"}}>
                              <img alt="#" src={require("../../assets/img/addproduct.png")} style={{ maxHeight:"170.13px",maxWidth:"100px"}}/>
                              </div>
                              </Link>
                              <br/>
                            
                            </Card>
                          </Col>
                          :
                          <></>
                          }
                        {shopProducts.map((product) => (
                          <ShopProduct key={product.id} product={product} />
                        ))}
                      </Row>
                    </Container>
                  </CardBody>

                </Card>
              </Row>
              </Container>
            </TabPane>
          </TabContent>
        </Container>
        </>
      }
      </div>
    </div>
  );
}

export default ShopPage;
