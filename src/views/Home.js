import React from "react";
//import { Link } from "react-scroll";
// reactstrap components
import{
    Container,
    Row,
    Card,
    CardTitle,
    CardBody,
    CardImg,
    Col,
    TabContent,
    TabPane,
    Nav,
    NavLink,
    NavItem
} from "reactstrap";

// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";
import Slider from "react-slick";
import Product from "../components/Product.js";
import CarouselView from "../components/Carousel/Carousel.js";
import ShopCard from "../components/ShopCard.js";
import axios from "axios";
import Pagination from "react-js-pagination";
//context
import { ProductConsumer } from "../context";

var settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay:true,
    responsive:[
        {
          breakpoint:450,
          settings:{
              centerMode:true,
              slidesToShow:1
          }
        }
      ]
  };
function Home({history}){
    const [activeTab, setActiveTab] = React.useState("1");
    const [categoryList, setCategoryList]=React.useState([]);
    const [isActive, setIsActive] = React.useState(false);
    const [shops, setShops] = React.useState([]);
    const [newItems,setNewItems] = React.useState([])
    
    
    const toggle = tab => {
        if (activeTab !== tab) {
          setActiveTab(tab);
        }
      };

      React.useEffect(()=>{
        setIsActive(true);
        axios.get("https://backend-api.martekgh.com/api/categories")
        .then(res=>{
          const categories = res.data;
          setCategoryList(categories);
          setIsActive(false)
        });

        getShops();
        
      },[])
      function getShops(pageNumber=1){
          setIsActive(true);
        axios.get("https://backend-api.martekgh.com/api/all-shops?page="+pageNumber+"")
        .then(res=>{
            setShops(res.data);
            setIsActive(false)
        })
        .catch(error=>{
        });

        axios.get('https://backend-api.martekgh.com/api/fetch/new-this-week')
        .then(res=>{
            setNewItems(res.data)
        })
      }


     function renderShops(){
        const {data, meta} = shops;
        return(
        <React.Fragment>
        <Row>
            {data && data.map(shop=>{
            return<ShopCard key={shop.id} shop={shop} />
        })}
        </Row>
        <Row>
        <Col md="10" className="ml-auto mr-auto">    
        <Pagination
        totalItemsCount={meta&&meta.total}
        activePage={meta&&meta.current_page}
        itemsCountPerPage={meta&&meta.per_page}
        onChange={(pageNumber)=>getShops(pageNumber)}
        itemClass="page-item"
        linkClass="page-link"
        firstPageText="First"
        lastPageText = "Last"
        />
        </Col>
        </Row>
        </React.Fragment>
    )

    }
      
        return(
            <div>
            <React.Fragment>
                <br/>
                <br/>
                <br/>
                <br/>
                <br/>
                <div style={{marginTop:"-15px", background:"#f7f7f7"}}>
                <div className="section" style={{marginTop:"-90px"}}>
                <CarouselView />
                
                    
                    <Container>
                        
                        <div className="nav-tabs-navigation" style={{marginTop:"10px", marginBottom:"-4px"}}>
                            <div className="nav-tabs-wrapper">
                            <Nav role="tablist" tabs>
                                <NavItem>
                                <NavLink
                                    style={{cursor:"pointer"}}
                                    className={activeTab === "1" ? "active" : ""}
                                    onClick={() => {
                                    toggle("1");
                                    }}
                                >
                                   <i className="fa fa-home"/> All
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                style={{cursor:"pointer"}}
                                    className={activeTab === "2" ? "active" : ""}
                                    onClick={() => {
                                    toggle("2");
                                    }}
                                >
                                    <i className="fa fa-shopping-bag"/>Shops
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                style={{cursor:"pointer"}}
                                    className={activeTab === "3" ? "active" : ""}
                                    onClick={() => {
                                    toggle("3");
                                    }}
                                >
                                    <i className="fa fa-bars"/>Categories
                                </NavLink>
                                </NavItem>
                            </Nav>
                            </div>
                        </div>

                         {/*Tabs*/}

                         <TabContent className="" activeTab={activeTab}>
                            <TabPane tabId="1" id="home">
                            <Container>
                            <Row>
                        <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                            <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                            <Row style={{borderBottom:"1px solid #eaeaea"}}>
                                <Col sm="9" md="9" lg="9" xl="9" xs="9">
                                <h3 style={{fontWeight:500}} className="category">
                                    <i className="fa fa-gg" style={{color:"#ff8d00"}}/> PHONES & ACCESSORIES
                                    
                                </h3>
                                </Col>
                                <Col sm="3" md="3" lg="3" xl="3" xs="3">
                                <p style={{fontWeight:500, fontSize:"12px", float:"right",marginTop:"20px", marginBottom:"0px", cursor:"pointer"}} 
                                onClick = {()=>history.push("/user/categories",{category_id:2, category_name:"Phones and Accessories", image:"2.jpg"})}
                                >ALL <i className="fa fa-chevron-right"/></p>
                                </Col>
                            </Row>
                                </CardTitle>
                                <CardBody>
                                <Container>
                                    <Row>
                                    <ProductConsumer>
                                        {
                                            value => {
                                                return value.products.map(product => {
                                                    return <Product key={product.id} product={product}/>;
                                                })
                                            }
                                        }
    
                                        </ProductConsumer>
                                        </Row>
                                        </Container>
                                    </CardBody>
    
                            </Card>
                            </Row>
                            
                        <Row>
                        <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                        <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                            <h3 style={{borderBottom:"1px solid #eaeaea", fontWeight:500}} className="category">
                                <i className="fa fa-gg" style={{color:"#ff8d00"}}/> NEW THIS WEEK
                                
                                </h3>
                            </CardTitle>
                    
                                <CardBody>
                                    <Container>
                                    <Row>
                                        <Col md="12" style={{padding:"0px 0px 0px 0px"}}>
                                        <Slider {...settings} infinite={newItems.length>3}>
                                        {newItems.map((value,key)=>(
                                            <div key={key}>
                                                <Col>
                                            <Card className="card-plain" style={{borderRight:"1px solid #eaeaea",margin:"0px 0px 0px 0px", padding:"0px 20px 0px 20px", cursor:"pointer"}}>
                                                <CardTitle style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", padding:"0px 0px 0px 0px"}}>
                                                {value.product_name}
                                                    </CardTitle>
                                                    <br/>
                                                    <div style={{textAlign:"center"}} onClick={() => history.push("/user/product-details",{id:value.id})}>
                                                    <img alt="#" src={require("../assets/img/iphone.png")} style={{height:"185.13px", width:"180px"}}/>
                                                    </div>
                                                    <br/>
                                                    <CardBody style={{color:"#5588b7", fontSize:"14px", fontWeight:"500",padding:"0px 0px 0px 0px"}}>¢ {value.price}</CardBody>
                                                </Card>
                                                </Col>
                                            </div>
                                            ))}
                                        </Slider>
                                        
                                        </Col>
                                        </Row>
                                        </Container>
                                    </CardBody>
    
                            </Card>
                            </Row>

                            <Row>
                    <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                    <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                            <Row style={{borderBottom:"1px solid #eaeaea"}}>
                                <Col sm="9" md="9" lg="9" xl="9" xs="9">
                                <h3 style={{fontWeight:500}} className="category">
                                    <i className="fa fa-gg" style={{color:"#ff8d00"}}/> FASHION
                                    
                                </h3>
                                </Col>
                                <Col sm="3" md="3" lg="3" xl="3" xs="3">
                                <p style={{fontWeight:500, fontSize:"12px", float:"right",marginTop:"20px", marginBottom:"0px", cursor:"pointer"}}
                                onClick = {()=>history.push("/user/categories",{category_id:3, category_name:"Fashion", image:"3.jpg"})}
                                >ALL <i className="fa fa-chevron-right"/></p>
                                </Col>
                            </Row>
                                </CardTitle>
                            <CardBody>
                            <Container>
                                <Row>
                                <ProductConsumer>
                                    {
                                        value => {
                                            return value.indexFashion.map(product => {
                                                return <Product key={product.id} product={product}/>;
                                            })
                                        }
                                    }

                                </ProductConsumer>
                                    </Row>
                                    </Container>
                                </CardBody>

                        </Card>
                        </Row>

                        
                       

                    <Row>
                    <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                    <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                            <Row style={{borderBottom:"1px solid #eaeaea"}}>
                                <Col sm="9" md="9" lg="9" xl="9" xs="9">
                                <h3 style={{fontWeight:500}} className="category">
                                    <i className="fa fa-gg" style={{color:"#ff8d00"}}/> ELECTRONICS & APPLIANCES
                                    
                                </h3>
                                </Col>
                                <Col sm="3" md="3" lg="3" xl="3" xs="3">
                                <p style={{fontWeight:500, fontSize:"12px", float:"right",marginTop:"20px", marginBottom:"0px", cursor:"pointer"}}
                                onClick = {()=>history.push("/user/categories",{category_id:1, category_name:"Electronics", image:"1.jpg"})}
                                >ALL <i className="fa fa-chevron-right"/></p>
                                </Col>
                            </Row>
                                </CardTitle>
                            <CardBody>
                            <Container>
                                <Row>
                                <ProductConsumer>
                                    {
                                        value => {
                                            return value.nextProducts.map(product => {
                                                return <Product key={product.id} product={product}/>;
                                            })
                                        }
                                    }

                                </ProductConsumer>
                                    </Row>
                                    </Container>
                                </CardBody>

                        </Card>
                        </Row>


                    
                        {/* <Row>
                        <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white", boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                            <CardTitle style={{borderBottom:"1px solid #eaeaea", fontWeight:500, marginLeft:"15px", marginRight:"15px", fontSize:"20px"}}>
                            <i className="fa fa-gg" style={{color:"#ff8d00"}}/>  FEATURED CATEGORY
                                </CardTitle>
                                <CardBody >
                                    <Row>
                                    <Col>
                                        <Card className="card-plain">
                                            <div className="img-container">
                                            <div>
                                            <img alt="#" src={require("../assets/img/iphone.png")} style={{maxHeight:"150px", maxWidth:"120px"}}/>
                                            <h4>PHONES</h4>
                                            </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="card-plain">
                                            <div className="img-container">
                                            <div>
                                            <img alt="#" src={require("../assets/img/game.png")} style={{maxHeight:"150px", maxWidth:"120px"}}/>
                                            <h4>GAMING</h4>
                                            </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="card-plain">
                                            <div className="img-container">
                                            <div>
                                            <img alt="#" src={require("../assets/img/shoe.png")} style={{maxHeight:"150px", maxWidth:"120px"}}/>
                                            <h4>FOOT WEARS</h4>
                                            </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="card-plain">
                                            <div className="img-container">
                                            <div>
                                            <img alt="#" src={require("../assets/img/game.png")} style={{maxHeight:"150px", maxWidth:"120px"}}/>
                                            <h4>GAMING</h4>
                                            </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="card-plain">
                                            <div className="img-container">
                                            <div>
                                            <img alt="#" src={require("../assets/img/flatscreen.png")} style={{maxHeight:"150px", maxWidth:"120px"}}/>
                                            <h4>TELE</h4>
                                            </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="card-plain">
                                            <div className="img-container">
                                            <div>
                                            <img alt="#" src={require("../assets/img/game.png")} style={{maxHeight:"150px", maxWidth:"120px"}}/>
                                            <h4>GAMING</h4>
                                            </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    </Row>

                                        
                                    </CardBody>
    
                            </Card>
                            </Row> */}
                    
                            </Container>
                            </TabPane>
                            <TabPane className="text-center" tabId="2" id="shops">
                                    {shops.data !== undefined && shops.data.length<=0?
                                    <Container>
                                    <h4 style={{fontWeight:500}}>No Shops Available</h4>
                                    </Container>
                                    :
                                    <Container>
                                    {shops && renderShops()}
                                    
                                    </Container>
                                    }
                            </TabPane>

                            <TabPane className="text-center" tabId="3" id="categories">
                                <Row>
                                {categoryList.map((value,index)=>(
                                    <Col md="4" className="mt-auto mb-auto">
                                    <img src={require(`assets/img/categories/${value.id}.png`)} 
                                        style={{width:"100%",height:"105px", borderRadius:"10px", marginBottom:"20px", cursor:"pointer"}}
                                        onClick = {()=>history.push("/user/categories",{category_id:value.id, category_name:value.category, image:`${value.id}.png`})}
                                    />
                                    {/* <Card className="card-plain" style={{backgroundColor:"white",cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} 
                                    onClick = {()=>history.push("/user/categories",{category_id:value.id, category_name:value.category, image:`${value.id}.png`})}

                                    >
                                        <CardBody>
                                        {value.category === "Phones"?
                                        <h4 
                                        style={{marginTop:"-7px"}}    
                                        >
                                        Phones And Accessories
                                        </h4>
                                        :
                                        <h4 
                                        style={{marginTop:"-7px"}}    
                                        >
                                        {value.category}
                                        </h4>
                                        }
                                        </CardBody>
                                    </Card> */}
                                    </Col>
                                ))}
                                </Row>
                            </TabPane>
                            
                        </TabContent>
                       
                        </Container>
                        
                    </div>
                    
                        
                        
                    
                    </div>
                </React.Fragment>
                </div>
        );
    }

    

export default Home;