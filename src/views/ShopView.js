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
import Skeleton from 'react-loading-skeleton';
import Product from "components/Product.js";


function ShopView(props) {
  const [activeTab, setActiveTab] = React.useState("1");
  const [loggedIn, setLoggedIn] = React.useState(false);
  const [name, setName] = React.useState("");
  const [description, setDescription] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [followers, setFollowers] = React.useState("");
  const [shopProducts, setShopProducts] = React.useState([]);
  const [followDisable, setFollowDisable] = React.useState(false);
  const [unfollowDisable, setUnfollowDisable] = React.useState(false);
  const [reviews, setReviews] = React.useState([]);
  const [reviewAdd, setReview] = React.useState("");
  const [rating, setRating] = React.useState(0);
  const [average, setAverage] = React.useState(0);
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
    axios.get("https://backend-api.martekgh.com/api/merchandiser/" + props.match.params.id + "/products"
    )
      .then(response => {
        let products = response.data[0].filter(items => items.product_image[0] !== undefined)
        setShopProducts(products);
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

    axios.get("https://backend-api.martekgh.com/api/shop/" + props.match.params.id + "/details")
      .then(res => {
        setName(res.data.company_name);
        setDescription(res.data.company_description);
        setFollowers(res.data.no_followers)
        setAvatar(res.data.avatar)
        setCover(res.data.cover_photo)
        setIsActive(false);
      })
      .catch(error => {
        setIsActive(false)
      })


    axios.get("https://backend-api.martekgh.com/api/shop/" + props.match.params.id + "/reviews")
      .then(res => {
        setReviews(res.data.product_reviews);
        setAverage(Math.round(res.data.average_rating));
      })
      .catch(error => {
      })

  }, [props.match.params.id]);

  const postReview = () => {
    if (reviewAdd !== "" || rating !== 0) {
      setIsActive(true)
      axios.post("https://backend-api.martekgh.com/api/add-shop/reviews",
        {
          rating: rating,

          merchandiser_id: props.match.params.id,

          review: reviewAdd
        },

        { headers: { "Authorization": `Bearer ${user}` } })
        .then(res => {
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
      {isActive?
      <div className="section profile-content text-center">
        <Skeleton style={{marginTop:"10px", width:"95%", textAlign:"center"}} className="cover-photo"/>
        <div className="avatar">
        <Skeleton circle height={120} width={120} 
            id="img-circle"
            className="img-circle img-no-padding img-responsive"
            style={{marginTop:"-500px"}}/>
        </div>
        <div>
          <Container>
            <Row>
              <Col md="5" sm="5" xs="5" xl="5" lg="5" style={{padding:"0px"}}>
                  <div>
                    <h4 style={{ fontSize: "19px", marginTop: "0px", fontWeight: "bold" }}>
                      <Skeleton width={200} height={12} />
                    </h4>

                    <Skeleton width={150} height={12} />

                  </div>
                </Col>
                <Col></Col>
                <Col md="4" sm="4" xs="4" xl="4" lg="4">
                  <Skeleton width={150} height={12} />
                  <br/>
                  <Skeleton width={100} height={12} />
                </Col>
            </Row>
            <Row style={{ marginTop: "10px" }}>
                <Col md="7" sm="12" xs="12" lg="7" xl="7" className="mr-auto ml-auto">
                  <Skeleton width={200} height={12} />
                  <br/>
                  <Skeleton width={150} height={12} />
                  <br/>
                  <Skeleton width={100} height={12}/>
                </Col>
              </Row>
          </Container>
        </div>
      </div>
      :
        <div className="section profile-content text-center">
          <img alt="#" src={cover != null?`https://backend-api.martekgh.com/${cover}` : require('assets/img/banner3.png')} style={{ width: "95%", marginTop: '10px', objectFit:"cover" }} className="cover-photo" />

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
                      style={{ border: "1px solid #eaeaea", width: "120px", height: "120px", objectFit:"cover" }}
                      src={avatar != null?`https://backend-api.martekgh.com/${avatar}`:require('assets/img/thumbnail2.png')}
                    />
                  </div>
                </Col>
              </Row>
              <Row style={{ marginTop: "-70px" }}>
                <Col md="5" sm="5" xs="5" xl="5" lg="5" style={{paddingLeft:"0px"}}>
                  <div className="shop-view-name">
                    <h4 style={{ fontSize: "16px", marginTop: "0px", fontWeight: "bold" }}>
                      {name}
                    </h4>

                    <StarRatings
                      rating={average}
                      starRatedColor="#CFB53B"
                      numberOfStars={5}
                      name='rating'
                      starDimension="14px"
                      starSpacing="1px"
                    />

                  </div>
                </Col>
                <Col md="3" sm="3" xs="3" xl="3" lg="3">
                  <br />
                </Col>
                <Col md="4" sm="4" xs="4" xl="4" lg="4">
                  <ProductConsumer>
                    {value => (
                      <>
                  <div>
                    <h5 style={{ display: "inline", fontSize: "14px", fontWeight: "bold", marginTop: "-15px" }}>{value.activeShopFollowers ? value.activeShopFollowers : followers} </h5><h4 style={{ display: "inline", fontSize: "14px" }}> | followers</h4>
                      <br />
                      <br />
                          <div>
                            {value.followShops.some(item => item.shop_id == props.match.params.id) 
                            ? <Button size="sm" style={{ fontSize: "9px" }} 
                                className="btn-round" 
                                disabled={followDisable} 
                                color="info" 
                                onClick={() => { value.unfollow(props.match.params.id)}}>
                                {value.unfollowLoader ? <Spinner animation="grow" size="sm" /> : <p style={{ fontWeight: 1000, fontSize: "9px" }}>following</p>}
                              </Button> 
                              : 
                              <Button size="sm" disabled={unfollowDisable} color='info' style={{ fontSize: "9px" }} className="btn-round" 
                                onClick={() => { value.follow({id:props.match.params.id,name,description,avatar}) }}>
                                {value.followLoader ? <Spinner animation="grow" size="sm" /> : <p style={{ fontWeight: 1000, fontSize: "9px" }}>+follow</p>}</Button>}
                          </div>

                            <Modal isOpen={value.followModal}>
                              <ModalBody>
                                <div style={{fontSize:"16px", fontWeight:"500", textTransform:"capitalize", textAlign:"center"}}>
                                  Please Login to follow a shop
                                </div>
                                <img src={require('assets/img/Push notifications-rafiki.svg')} alt="notifications" />
                              </ModalBody>
                              <ModalFooter>
                                <Button color="info" onClick={()=>props.history.push('/auth/login-page')}>
                                  Login
                                </Button>
                                <Button color="danger" onClick={()=>value.closeFollowModal()}>
                                  Cancel
                                </Button>
                              </ModalFooter>
                            </Modal>
                            </div>
                          </>
                        )}
                      </ProductConsumer>
                </Col>

              </Row>
              <Row style={{ marginTop: "10px", whiteSpace:"pre-line" }}>
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
      }
    </div>
  );
}

export default ShopView;
