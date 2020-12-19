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
  Col, Card, CardBody, CardTitle, Spinner,
  InputGroup, InputGroupAddon, InputGroupText, Modal, ModalBody, ModalFooter, ModalHeader
} from "reactstrap";

import axios from "axios";
import { ProductConsumer } from "../context.js";
import StarRatings from 'react-star-ratings';
// core components
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import Product from "components/Product.js";


function ShopView(props) {
  const [activeTab, setActiveTab] = React.useState("1");
  const [followloader, setfollowLoader] = React.useState(false)
  const [followingloader, setfollowingLoader] = React.useState(false);
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [followers, setFollowers] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [shopProducts, setShopProducts] = React.useState([]);
  const [followDisable, setFollowDisable] = React.useState(false);
  const [unfollowDisable, setUnfollowDisable] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const [reviewAdd, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [average, setAverage] = React.useState(0);
  const [reportmodal, setReportmodal] = React.useState(false);
  const [avatar, setAvatar] = React.useState('');
  const [cover, setCover] = React.useState('')

  let user = localStorage.getItem('access_token')

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };
  React.useEffect(() => {
    setIsActive(true)
    axios.get("https://backend-api.martekgh.com/api/merchandiser/" + props.location.state.id + "/products"
    )
      .then(response => {
        setShopProducts(response.data[0]);
      })
      .catch(error => {
      });

    let authenticated = localStorage.getItem('access_token')
    if (authenticated !== null) {
      setLoggedIn(true);
    }
    else {
      setLoggedIn(false);
    }

    axios.get("https://backend-api.martekgh.com/api/shop/" + props.location.state.id + "/details")
      .then(res => {
        console.log(res.data)
        setName(res.data.company_name);
        setDescription(res.data.company_description);
        setFollowers(res.data.no_followers)
        setAvatar(res.data.avatar)
        setCover(res.data.cover_photo)
        setIsActive(false)
      })
      .catch(error => {
        console.log(error)
        setIsActive(false)
      })


    axios.get("https://backend-api.martekgh.com/api/shop/" + props.location.state.id + "/reviews")
      .then(res => {
        console.log("reviews:", res.data);
        setReviews(res.data.product_reviews);
        setAverage(Math.round(res.data.average_rating));
      })
      .catch(error => {
        console.log(error)
      })

  }, [props.location.state.id]);

  const postReview = () => {
    if (reviewAdd !== "" || rating !== 0) {
      setIsActive(true)
      axios.post("https://backend-api.martekgh.com/api/add-shop/reviews",
        {
          rating: rating,

          merchandiser_id: props.location.state.id,

          review: reviewAdd
        },

        { headers: { "Authorization": `Bearer ${user}` } })
        .then(res => {
          console.log(res.data);
          if (res.data.status === "saved") {
            let tempReviews = reviews;
            tempReviews.push({ rating: rating, review: reviewAdd, user: { name: res.data.name } });
            setReviews(tempReviews);
            setReview("");
            setIsActive(false);
            setRating(0)
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }



  const changeRating = (newRating) => {
    setRating(newRating)
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
        active={isActive}
        spinner={<BounceLoader color={'#4071e1'} />}
      >

        <div className="section profile-content text-center">
          <img alt="#" src={`https://backend-api.martekgh.com/${cover}`} style={{ width: "95%", marginTop: '10px' }} className="cover-photo" />

          <Container>
            <br />
            <br />
            <br />
            <br />
            <Container>
              <Row>
                <Col md="5" sm="6" xs="6" xl="5" lg="5" className="ml-auto mr-auto">
                  <div className="avatar">
                    <img
                      alt="..."
                      id="img-circle"
                      className="img-circle img-no-padding img-responsive"
                      style={{ border: "1px solid #eaeaea", width: "120px", height: "120px" }}
                      src={`https://backend-api.martekgh.com/${avatar}`}
                    />
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: "-70px" }}>
                <Col md="5" sm="5" xs="5" xl="5" lg="5">
                  <div>
                    <h4 style={{ fontSize: "20px", marginTop: "0px", fontWeight: "bold" }}>
                      {name}
                    </h4>

                    <StarRatings
                      rating={average}
                      starRatedColor="#CFB53B"
                      numberOfStars={5}
                      name='rating'
                      starDimension="17px"
                      starSpacing="1px"
                    />

                  </div>
                </Col>
                <Col md="3" sm="3" xs="3" xl="3" lg="3">
                  <br />
                </Col>
                <Col md="4" sm="4" xs="4" xl="4" lg="4">
                  <div>
                    <h5 style={{ display: "inline", fontSize: "14px", fontWeight: "bold", marginTop: "-15px" }}>{followers} </h5><h4 style={{ display: "inline", fontSize: "14px" }}> | followers</h4>
                    {/* <h5 style={{display:"inline", fontSize:"14px", fontWeight:"bold", marginLeft:"20px"}}> {shopProducts.length}</h5><h4 style={{display:"inline",fontSize:"14px"}}> | Products</h4>
                */} <br />
                    <br />
                    {loggedIn ?
                      <ProductConsumer>
                        {value => (
                          <div>
                            {value.followShops.find(item => item.shop_id === props.location.state.id) ? <Button size="sm" style={{ fontSize: "9px" }} className="btn-round" disabled={followDisable} color="info" onClick={() => { value.unfollow(props.location.state.id); setfollowingLoader(true); setfollowLoader(false); setFollowers(followers - 1); setFollowDisable(true); setUnfollowDisable(false) }}>{followingloader ? <Spinner animation="grow" size="sm" /> : <p style={{ fontWeight: 1000, fontSize: "9px" }}>following</p>}</Button> : <Button size="sm" disabled={unfollowDisable} color='info' style={{ fontSize: "9px" }} className="btn-round" onClick={() => { value.follow(props.location.state.id); setUnfollowDisable(true); setFollowDisable(false); setfollowingLoader(false); setFollowers(followers + 1); setfollowLoader(true) }}>{followloader ? <Spinner animation="grow" size="sm" /> : <p style={{ fontWeight: 1000, fontSize: "9px" }}>+follow</p>}</Button>}
                          </div>
                        )}
                      </ProductConsumer>
                      :
                      <div></div>
                    }
                  </div>
                </Col>

              </Row>
              <Row style={{ marginTop: "10px" }}>
                <Col md="7" sm="12" xs="12" lg="7" xl="7" className="mr-auto ml-auto">
                  <p>{description}</p>
                </Col>
              </Row>
            </Container>

            <br />
            <div className="nav-tabs-navigation">
              <div className="nav-tabs-wrapper">
                <Nav role="tablist" tabs>
                  <NavItem>
                    <NavLink style={{ cursor: "pointer" }}
                      className={activeTab === "1" ? "active" : ""}
                      onClick={() => {
                        toggle("1");
                      }}
                    >
                      Products
                  </NavLink>
                  </NavItem>

                  <NavItem>
                    <NavLink style={{ cursor: "pointer" }}
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
                    <Card style={{ width: "100%", border: "1px solid #eaeaea", borderRadius: "5px", backgroundColor: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }} className="card-plain">
                      <CardTitle style={{ padding: "5px 0px 0px 0px", margin: "0px 15px 0px 15px", borderBottom: "1px solid #eaeaea" }}>
                            <h3 style={{ fontWeight: 500, fontSize:"16px", textAlign:"left"}}>
                              <i className="fa fa-gg" style={{ color: "#ff8d00" }} /> PRODUCTS
                            </h3>
                      </CardTitle>
                      <CardBody>
                        <Container>
                          <Row>
                            {shopProducts.map((product) => (
                              <Product key={product.id} product={product} />
                            ))}
                          </Row>
                        </Container>
                      </CardBody>

                    </Card>
                  </Row>
                </Container>
              </TabPane>
              <TabPane tabId="2" id="reviews">
                <Row>
                <Col md="12">
                <Card className="card-plain" style={{borderRadius: "5px", backgroundColor: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.1)"}}>
                    <CardTitle style={{ padding: "5px 0px 0px 0px", margin: "0px 15px 0px 15px", borderBottom: "1px solid #eaeaea" }}>
                            <h3 style={{ fontWeight: 500, fontSize:"16px", textAlign:"left"}}>
                              <i className="fa fa-gg" style={{ color: "#ff8d00" }} /> REVIEWS
                            </h3>
                      </CardTitle>
                  {reviews.length <= 0 ?
                    <Row>
                      <Col md="12" className="ml-auto mr-auto">
                        <h4 style={{ textAlign: "center", marginBottom: "10px" }}>No Reviews</h4>
                      </Col>
                    </Row>
                    :
                    <Row style={{margin:"10px 0px 10px 0px"}}>
                    <Col md="12" className="ml-auto mr-auto" style={{maxHeight:"35vh", overflowY:"scroll", borderBottom:"1px solid #F1EAE0"}}>
                      {reviews.map(value=>(
                          <Row style={{marginBottom:"10px"}}>
                          <Col md="12" sm="12" xs="12" lg="12" style={{textAlign:"left"}}>
                          <h5 style={{marginTop:"0px", fontSize:"16px", fontWeight:500, marginBottom:"-4px"}}>{value.review}</h5>
                          <StarRatings
                              rating={value.rating}
                              starRatedColor="#D4AF37"
                              numberOfStars={5}
                              name='rating'
                              starDimension="15px"
                              starSpacing="2px"
                              />
                          <p style={{fontSize:"11px",fontWeight:400}}>{value.date} by {value.user.name}</p>
                          </Col>
                          </Row>
                      ))}
                      </Col>
                    </Row>
                  }

                  <Row style={{margin:"10px 0px 10px 0px"}}>
                    {loggedIn ?
                      <Col md="12">
                        <p style={{ marginTop: "5px", marginBottom: "0px", textAlign: "left" }}>Rate this shop</p>
                        <div style={{ float: "left", marginBottom:"10px" }}>
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
                        <InputGroup>
                          <Input placeholder="Add your comment" type="textarea" value={reviewAdd} onChange={e => setReview(e.target.value)} required />
                          <InputGroupAddon addonType="append">
                            <InputGroupText>
                              <i className="fa fa-paper-plane-o" onClick={postReview} style={{ cursor: "pointer" }} />
                            </InputGroupText>
                          </InputGroupAddon>
                        </InputGroup>
                      </Col>

                      :
                      <div></div>}

                  </Row>
                  </Card>
                  </Col>
                </Row>
              </TabPane>

            </TabContent>
          </Container>
        </div>
      </LoadingOverlay>
    </div>
  );
}

export default ShopView;
