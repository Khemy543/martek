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
  NavItem,
  NavLink,
  Nav,
  TabContent,
  TabPane,
  Container,
  Row,
  Input,
  Col, Card, CardBody,CardTitle, Spinner,
  InputGroup,InputGroupAddon,InputGroupText,Modal,ModalBody, ModalFooter,ModalHeader
} from "reactstrap";

import axios from "axios";
import {ProductConsumer } from "../context.js";
import StarRatings from 'react-star-ratings';
// core components
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";


function ShopView(props) {
  const [activeTab, setActiveTab] = React.useState("1");
  const [followloader, setfollowLoader] = React.useState(false)
  const [followingloader, setfollowingLoader] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [name ,setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [campus, setCampus] = React.useState("");
  const [followers, setFollowers] = React.useState("");
  const [email, setEmail] = React.useState('');
  const [phone, setPhone]= React.useState('');
  const [shopType, setShopType] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [shopProducts, setShopProducts] = React.useState([]);
  const [followDisable, setFollowDisable] = React.useState(false);
  const [unfollowDisable , setUnfollowDisable] =React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const [reviewAdd, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [average, setAverage] = React.useState(0);
  const [reportmodal, setReportmodal] = React.useState(false);
  const[reportSent,setReportsent] = React.useState(false)
  const [message, setMessage] = React.useState("");
  
  let user = localStorage.getItem('access_token')

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  React.useEffect(()=>{
        setIsActive(true)
        axios.get("https://martek.herokuapp.com/api/merchandiser/"+props.location.state.id+"/products"
      )
        .then(response=>{
            setShopProducts(response.data[0]);
        })
        .catch(error=>{
        });

        let authenticated = localStorage.getItem('access_token')
        if(authenticated !== null){
         setLoggedIn(true);
        }
        else{
            setLoggedIn(false);
        }

        axios.get("https://martek.herokuapp.com/api/shop/"+props.location.state.id+"/details")
        .then(res=>{
          console.log(res.data)
          setName(res.data.company_name);
          setDescription(res.data.company_description);
          setCampus(res.data.campus)
          setFollowers(res.data.no_followers)
          setEmail(res.data.email);
          setPhone(res.data.phone);
          setShopType(res.data.shop_type)
          setIsActive(false)
        })
        .catch(error=>{
          console.log(error)
          setIsActive(false)
        })
        

        axios.get("https://martek.herokuapp.com/api/shop/"+props.location.state.id+"/reviews")
        .then(res=>{
          console.log("reviews:",res.data);
          setReviews(res.data.product_reviews);
          setAverage(Math.round(res.data.average_rating));
        })
        .catch(error=>{
          console.log(error)
        })
 
},[props.location.state.id]);

const postReview=()=>{
  if(reviewAdd !== "" || rating !== 0){
  setIsActive(true)
  axios.post("https://martek.herokuapp.com/api/add-shop/reviews",
    {
      rating: rating,
  
      merchandiser_id: props.location.state.id,
  
      review : reviewAdd
  },
  
 { headers:{"Authorization":`Bearer ${user}`}} )
 .then(res=>{
   console.log(res.data);
   if(res.data.status === "saved"){
     let tempReviews = reviews;
     tempReviews.push({rating:rating,review:reviewAdd,user:{name:res.data.name}});
     setReviews(tempReviews);
     setReview("");
     setIsActive(false);
     setRating(0)
   }
 })
 .catch(error=>{
   console.log(error)
 })
}
}


const handlePostReport=()=>{
  axios.post("https://martek.herokuapp.com/api/add-shop/report",
  {report:message, shop_report:1,merchandiser_id:props.location.state.id},
  { headers:{"Authorization":`Bearer ${user}`}})
  .then(res=>{
    console.log(res.data)
    if(res.data.status === "saved"){
      setReportsent(true)
    }
  })
  .catch(error=>{
    console.log(error.response.data)
  })
}

const changeRating=( newRating )=> {
 setRating(newRating)
}

const toggleReportModal=()=>{
  setReportmodal(!reportmodal)
}

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
      <img alt="#" src={require("../assets/img/header.jpg")} style={{width:"95%", height:"40vh"}}/>
      
        <Container>
        <br/>
        <br/>
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
                style={{border:"1px solid #eaeaea" , marginTop:"-330px"}}
                src={require("../assets/img/new_logo.png")}
              />
            </div>
            </Col>
            </Row>
            <Row style={{marginTop:"-70px"}}>
              <Col md="4">
              <div>
              <h4 style={{fontSize:"20px", marginTop:"0px",fontWeight:"bold"}}>
                {name}
              </h4>
              
              <p>{description}</p>
              <StarRatings
                rating={average}
                starRatedColor="#CFB53B"
                numberOfStars={5}
                name='rating'
                starDimension="20px"
                starSpacing="2px"
                />
             
              </div>
              </Col>
              <Col md="4">
              {/* <p>{email}</p>
              <p>{phone}</p>
              <p>{shopType}</p>
              <p>{campus}</p> */}
              </Col> 
              <Col md="4">
              <div>
                <h5 style={{display:"inline", fontSize:"14px", fontWeight:"bold", marginTop:"-15px"}}>{followers} </h5><h4 style={{display:"inline",fontSize:"14px"}}> | followers</h4>
                <h5 style={{display:"inline", fontSize:"14px", fontWeight:"bold", marginLeft:"20px"}}> {shopProducts.length}</h5><h4 style={{display:"inline",fontSize:"14px"}}> | Products</h4>
                <br/>
                <br/>
                {loggedIn?
                <ProductConsumer>
              {value=>(
                <div>
                {value.followShops.find(item=>item.shop_id===props.location.state.id)?<Button style={{fontSize:"10px"}} className="btn-round" disabled={followDisable} color="info" onClick={()=>{value.unfollow(props.location.state.id);setfollowingLoader(true); setfollowLoader(false);setFollowers(followers-1); setFollowDisable(true);setUnfollowDisable(false)}}>{followingloader?<Spinner animation="grow" size="sm"/>:<p style={{fontWeight:1000, fontSize:"10px"}}>following</p>}</Button>:<Button disabled={unfollowDisable} color='danger' style={{fontSize:"10px"}} className="btn-round" onClick={()=>{value.follow(props.location.state.id); setUnfollowDisable(true);setFollowDisable(false); setfollowingLoader(false);setFollowers(followers+1); setfollowLoader(true)}}>{followloader?<Spinner animation="grow" size="sm"/>:<p style={{fontWeight:1000, fontSize:"10px"}}>+follow</p>}</Button>}
                </div>
            )}
              </ProductConsumer>
              :
              <div></div> 
               }
               </div>
               <br/>
               <span style={{color:"red", fontSize:"12px", fontWeight:600, cursor:"pointer"}} onClick={()=>setReportmodal(true)}>REPORT</span>
              </Col>

            </Row> 
          </Container>
        
          <br />
          <div className="nav-tabs-navigation">
            <div className="nav-tabs-wrapper">
              <Nav role="tablist" tabs>
                <NavItem>
                  <NavLink  style={{cursor:"pointer"}}
                    className={activeTab === "1" ? "active" : ""}
                    onClick={() => {
                      toggle("1");
                    }}
                  >
                  Products
                  </NavLink>
                </NavItem>

                <NavItem>
                  <NavLink  style={{cursor:"pointer"}}
                    className={activeTab === "2" ? "active" : ""}
                    onClick={() => {
                      toggle("2");
                    }}
                  >
                  Reviews
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
                <ProductConsumer>
                  {(value=>(
                shopProducts.map(products=>(
                  <Col lg="3" md="4" sm="6" xs="6">
              <Card className="card-plain" style={{borderRight:"1px solid #eaeaea",margin:"10px 0px 0px 0px", padding:"0px 0px 0px 0px"}}>
                <CardTitle style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", padding:"0px 0px 0px 0px"}}>
                {products.product_name}
                    </CardTitle>
                    <br/>
                    
                    <div style={{textAlign:"center"}} onClick={()=>props.history.push("/user/product-details",{id:products.id})}>
                    <img alt="#" src={require("../assets/img/iphone.png")} style={{ maxHeight:"185.13px",maxWidth:"100px"}}/>
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
            <TabPane tabId="2" id="reviews">
              <Container>
              {reviews.length <=0 ?
              <Row>
                  <Col md="6" className="ml-auto mr-auto">
                      <h4 style={{textAlign:"center",marginBottom:"10px"}}>No Reviews</h4>
                  </Col>
              </Row>
              :
              <Row>
              <Col md="6" className="ml-auto mr-auto" style={{maxHeight:"50vh",overflowY:"scroll"}}>
              {reviews&&reviews.map(value=>(
                <Row style={{borderBottom:"1px solid #F1EAE0",marginBottom:"10px"}}>
                  <Col md="3" sm="3" xs="3" lg="3" className="ml-auto mr-auto">
                  <div className="avatar">
                  <img
                    alt="#"
                    className="img-circle img-no-padding img-responsive"
                    src={require("../assets/img/new_logo.png")}
                    style={{border:"1px solid #eaeaea"}}
                  />
                </div>
                  </Col>
                  <Col md="9" sm="9" xs="9" lg="9" style={{textAlign:"left"}}>
                  <h5 style={{marginTop:"0px", fontWeight:"bold"}}>{value.user.name}</h5>
                  <StarRatings
                      rating={value.rating}
                      starRatedColor="#D4AF37"
                      numberOfStars={5}
                      name='rating'
                      starDimension="15px"
                      starSpacing="2px"
                      />
                  <p style={{fontSize:"10px"}}>{value.date}</p>
                  <p style={{fontWeight:400}}>{value.review}</p>
                  </Col>
                </Row>
              ))}
              </Col>
              </Row>
              }
              
              <Row>
              {loggedIn?
                <Col md="6" className="mr-auto ml-auto">
                <InputGroup>
                  <Input placeholder="Add your comment" type="textarea" value={reviewAdd} onChange={e=>setReview(e.target.value)} required/>
                  <InputGroupAddon addonType="append">
                    <InputGroupText>
                    <i className="fa fa-paper-plane-o" onClick={postReview} style={{cursor:"pointer"}}/>
                    </InputGroupText>
                  </InputGroupAddon>
                  </InputGroup>
                  <p style={{marginTop:"5px",marginBottom:"0px", textAlign:"left"}}>Rate this shop</p>
                  <div style={{float:"left"}}>
                  <StarRatings
                      rating={rating}
                      starRatedColor="#CFB53B"
                      changeRating={changeRating}
                      numberOfStars={5}
                      name='rating'
                      starDimension="20px"
                      starSpacing="2px"
                      />
                      </div>
                </Col>
                
              :
              <div></div>}
               
              </Row>
              </Container>
            </TabPane>
            
          </TabContent>
        </Container>
      </div>
      <Modal isOpen={reportmodal} toggle={()=>toggleReportModal()}>
            <ModalHeader>
                <h4 style={{fontWeight:"bold",fontSize:"17px", marginTop:"0px"}}>Report Shop</h4>
            </ModalHeader>
            {!reportSent?
            <>
            <ModalBody>
            <Row>
                <Col md="12">
                <Input type="textarea" placeholder="report message..." value={message} onChange={(e)=>setMessage(e.target.value)}/>

                </Col>
            </Row>
            </ModalBody>
            <ModalFooter style={{border:"none",marginBottom:"20px", marginRight:"15px"}}>
                <Button color="info" onClick={()=>handlePostReport()}>Report</Button>
                <Button color="danger" onClick={()=>setReportmodal(false)}>Close</Button>
            </ModalFooter>
            </>
            :
            <>
            <div style={{textAlign:'center',marginTop:"10px",marginBottom:"10px"}}>
            <p style={{fontWeight:"bold"}}><i className="fa fa-check mr-1" style={{color:"green", fontSize:"20px"}}/> sent!!</p>
              <p>Thanks for the report!<br/>Action is being taken, Feedback will be sent soon</p>
            </div>
            </>
            }
        </Modal>
      </LoadingOverlay>
    </div>
  );
}

export default ShopView;
