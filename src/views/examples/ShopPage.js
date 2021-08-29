import React,{useContext} from "react";
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
  Col, Card, CardBody,CardTitle,Button,UncontrolledPopover,PopoverBody, PopoverHeader
} from "reactstrap";
import Skeleton from 'react-loading-skeleton'

import axios from "axios";
import StarRatings from 'react-star-ratings';
import ShopProduct from "components/ShopProduct.js";
import { ProductConsumer, ProductContext } from '../../context.js'


function ShopPage(props) {
  const merchandiserContext = useContext(ProductContext);
  let id = merchandiserContext.merchandiser.id;
  const [activeTab, setActiveTab] = React.useState("1");
  const [shopProducts, setShopProducts] = React.useState([]);
  const [isActive, setIsActive] = React.useState(false);
  const [popover, setPopover] = React.useState(false)

  const toggle = tab => {
    if (activeTab !== tab) {
      setActiveTab(tab);
    }
  };

  const ShareToggle =()=>{
    setPopover(!popover)
  }
  
  React.useEffect(()=>{
    if(id){
    setIsActive(true);
    axios.get(`https://backend-api.martekgh.com/api/merchandiser/${id}/products`)
    .then(response=>{
      const categories = response.data[0].filter(item => item.product_image[0] !== undefined);
        setShopProducts(categories);
        setIsActive(false)
    })
    .catch(error=>{
    });
  }
 
},[id])


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
      <ProductConsumer>
        {
          value=>(
            <>
      <img alt="#" src={value.merchandiser?.cover_photo != null?`https://backend-api.martekgh.com/${value.merchandiser?.cover_photo}`: require('assets/img/banner3.png')} style={{width:"95%", marginTop:"10px", objectFit:"cover"}} className="cover-photo"/>
      
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
                  src={value.merchandiser?.avatar != null?`https://backend-api.martekgh.com/${value.merchandiser?.avatar}` : require('assets/img/thumbnail2.png')}
              />
            </div>
            </Col> 
            </Row>
            <Row style={{marginTop:"-40px"}}>
              <Col md="4" sm="4" xs="4" lg="4" xl="4">
              <h4 style={{fontSize:"16px", marginTop:"0px",fontWeight:"bold"}}>
                {value.merchandiser?.company_name}
              </h4>
              <StarRatings
                rating={value.merchandiser?.avg_rating ? Number(value.merchandiser?.avg_rating) : 0}
                starRatedColor="#CFB53B"
                numberOfStars={5}
                name='rating'
                starDimension="14px"
                starSpacing="1px"
                />
              </Col>
              <Col md="4" sm="4" xs="4" lg="4" xl="4">

              </Col>
              <Col md="4" sm="4" xs="4" lg="4" xl="4">
              <div className="d-flex justify-content-between">
                <div>
                  <h5 style={{display:"inline", fontSize:"14px", fontWeight:"bold"}}>{value.merchandiser?.no_followers}</h5><h4 style={{display:"inline",fontSize:"14px"}}> | followers</h4>
                    
                    <h4 style={{ fontSize:"14px", marginTop:"5px"}}>{value.merchandiser.shop_type === "Non-student shop" ? 'All Campus' : value.merchandiser?.campus}</h4>
                </div>
              </div>
              </Col>

            </Row>  
            <Row style={{marginTop:"10px"}}>
              <Col md="7" xl="7" sm="12" xs="12" lg="7" className="mr-auto ml-auto">
              <p style={{whiteSpace:"pre-line"}}>{value.merchandiser?.company_description}</p>
              <div className="mt-1">
                    <Button size="sm" className="btn-round" color="info" id="sharebutton" onClick={()=> setPopover(true)} >Share</Button>
                    <UncontrolledPopover trigger="legacy" isOpen={popover} placement="bottom" toggle={ShareToggle} target="sharebutton">
                      <PopoverHeader style={{fontWeight:"bold"}}>Share !!</PopoverHeader>
                      <PopoverBody>
                        <div className="d-flex mt-2">
                            <a href={`https://www.facebook.com/sharer/sharer.php?u=https://martekgh.com/user/shop-view/${id}/${value.merchandiser?.company_name}`}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                            <i className="fa fa-facebook-square fa-2x" style={{color:'#4267B2'}}/>
                            </a>
                            <a href={`https://twitter.com/intent/tweet?text=Check%20out&url=https://martekgh.com/user/shop-view/${id}/${value.merchandiser?.company_name}`} 
                              target="_blank"
                              rel="noopener noreferrer"
                              style={{marginLeft:"20px"}}>
                            <i className="fa fa-twitter-square fa-2x" style={{color:"#1DA1F2"}}/>
                            </a>
                            <a href={`https://wa.me/?text=https://martekgh.com/user/shop-view/${id}/${value.merchandiser?.company_name}`} 
                              style={{marginLeft:"20px"}}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              <i className="fa fa-whatsapp fa-2x" style={{color:'#25D366'}}/>
                            </a>
                        </div>
                      </PopoverBody>
                    </UncontrolledPopover>
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
                <Card style={{ width: "100%", border: "1px solid #eaeaea", borderRadius: "5px", backgroundColor: "white", boxShadow: "0 2px 12px rgba(0,0,0,0.1)" }} className="card-plain">
                  <CardTitle style={{ padding: "5px 0px 0px 0px", margin: "0px 15px 0px 15px", borderBottom: "1px solid #eaeaea" }}>
                        <h3 style={{ fontWeight: 500, fontSize:"16px", textAlign:"left"}}>
                          <i className="fa fa-gg" style={{ color: "#ff8d00" }} /> PRODUCTS
                        </h3>
                  </CardTitle>
                  <CardBody>
                    <Container>
                      <Row>
                      {shopProducts.length<20 && !value.paymentRequired?
                          <Col lg="2" md="2" sm="6" xs="6" xl="2">
                          <Card className="card-plain" style={{borderRight:"1px solid #eaeaea",margin:"10px 0px 0px 0px", padding:"0px 0px 0px 0px"}}>
                              <CardTitle style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", padding:"0px 0px 0px 0px"}}>
                              Add New Product
                              </CardTitle>
                              <br/>
                              <Link to="/shop/add-to-shop">
                              <div style={{textAlign:"center"}}>
                              <img alt="#" src={require("../../assets/img/addproduct.png")} style={{ maxHeight:"80px",maxWidth:"auto"}}/>
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
              )
            }
          </ProductConsumer>
        </div>
      }
      </div>
  );
}

export default ShopPage;
