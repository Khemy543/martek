import React from "react";
//import { Link } from "react-scroll";
// reactstrap components
import{
    Container,
    Row,
    Card,
    CardTitle,
    CardBody,
    Col,
    TabContent,
    TabPane,
    Nav,
    NavLink,
    NavItem
} from "reactstrap";

// core components
import Slider from "react-slick";
import Product from "../../components/Product.js";
import CarouselView from "../../components/Carousel/Carousel.js";
import axios from "axios";
//context
import { ProductConsumer } from "../../context";
import { Link } from "react-router-dom";

var settings = {
    dots: true,
    speed: 500,
    slidesToShow: 5,
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
function All({history}){
    const [activeTab, setActiveTab] = React.useState("1");
    const [isActive, setIsActive] = React.useState(false);
    const [newItems,setNewItems] = React.useState([]);
    const [electronics,setElectronics] = React.useState([]);
    const [fashion, setFashion] = React.useState([]);
    const [phones,setPhones] = React.useState([])
    

      React.useEffect(()=>{
        axios.get('https://backend-api.martekgh.com/api/fetch/new-this-week')
        .then(res=>{
            console.log(res.data);
            setNewItems(res.data);
        })
        setProducts();
      },[])

      const setProducts =() =>{
        // localStorage.clear();
         axios.get("https://backend-api.martekgh.com/api/2/product-index")
         .then(res=>{
             console.log(res.data)
             const categories = res.data[0];
             setPhones(categories)
         })
 
         axios.get("https://backend-api.martekgh.com/api/3/product-index")
         .then(res=>{
             console.log(res.data)
             const categories = res.data[0];
             setFashion(categories)
         })
 
         axios.get("https://backend-api.martekgh.com/api/1/product-index")
         .then(res=>{
             const nextProducts = res.data[0];
             setElectronics(nextProducts)
         })
         
     };
 


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
                                    tag={Link}
                                    to="/user/home"
                                >
                                   <i className="fa fa-home"/> All
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                style={{cursor:"pointer"}}
                                    className={activeTab === "2" ? "active" : ""}
                                    tag={Link}
                                    to="/user/shops"
                                >
                                    <i className="fa fa-shopping-bag"/>Shops
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                style={{cursor:"pointer"}}
                                    className={activeTab === "3" ? "active" : ""}
                                    tag={Link}
                                    to="/user/all-categories"
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
                                    <i className="fa fa-gg mr-1" style={{color:"#ff8d00"}}/> Phones & Accessories
                                    
                                </h3>
                                </Col>
                                <Col sm="3" md="3" lg="3" xl="3" xs="3">
                                <p style={{fontWeight:500, fontSize:"12px", float:"right",marginTop:"20px", marginBottom:"0px", cursor:"pointer"}} 
                                onClick = {()=>history.push("/user/categories",{category_id:2, category_name:"Phones and Accessories", image:"2.jpeg"})}
                                >See All <i className="fa fa-chevron-right"/></p>
                                </Col>
                                </Row>
                                </CardTitle>
                                <CardBody>
                                    <Container>
                                        <Row>
                                        {newItems.slice(0,6).map((product)=>(
                                            <Product key={product.id} product={product}/>
                                        ))}
                                        </Row>
                                </Container>
                                </CardBody>
    
                            </Card>
                            </Row>
                            
                        <Row>
                        <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                        <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                            <h3 style={{borderBottom:"1px solid #eaeaea", fontWeight:500}} className="category">
                                <i className="fa fa-gg mr-1" style={{color:"#ff8d00"}}/> New This Week
                                
                                </h3>
                            </CardTitle>
                    
                                <CardBody>
                                    <Container>
                                    <Row>
                                        <Col md="12" style={{padding:"0px 0px 0px 0px"}}>
                                        <Slider {...settings} infinite={newItems.length>5}>
                                        {newItems.map((value,key)=>(
                                            <div key={key}>
                                                <Col style={{padding:"0px 3px 0px 3px"}}>
                                                <div style={{textAlign:"center"}}>
                                                    <div style={{textAlign:"center"}} onClick={() => history.push("/user/product-details",{id:value.id})}>
                                                    <img alt="#" src={`https://backend-api.martekgh.com/${value.product_image[0].path}`} style={{height:"185.13px", width:"180px", borderRadius:'5px'}}/>
                                                    </div>
                                                    <h3 style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", textAlign:"left"}}>
                                                    {value.product_name}
                                                    </h3>
                                                    <h3 style={{color:"#5588b7", fontSize:"14px", fontWeight:600, textAlign:"left", marginTop:"3px"}}>GH¢ {value.price}</h3>
                                                </div>
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
                                    <i className="fa fa-gg mr-1" style={{color:"#ff8d00"}}/> Fashion
                                    
                                </h3>
                                </Col>
                                <Col sm="3" md="3" lg="3" xl="3" xs="3">
                                <p style={{fontWeight:500, fontSize:"12px", float:"right",marginTop:"20px", marginBottom:"0px", cursor:"pointer"}}
                                onClick = {()=>history.push("/user/categories",{category_id:3, category_name:"Fashion", image:"3.jpeg"})}
                                >See All <i className="fa fa-chevron-right"/></p>
                                </Col>
                            </Row>
                                </CardTitle>
                            <CardBody>
                            <Container>
                                        <Row>
                                        {fashion.map((product)=>(
                                             <Product key={product.id} product={product}/>
                                        ))}
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
                                    <i className="fa fa-gg" style={{color:"#ff8d00"}}/> Electronics & Appliances
                                    
                                </h3>
                                </Col>
                                <Col sm="3" md="3" lg="3" xl="3" xs="3">
                                <p style={{fontWeight:500, fontSize:"12px", float:"right",marginTop:"20px", marginBottom:"0px", cursor:"pointer"}}
                                onClick = {()=>history.push("/user/categories",{category_id:1, category_name:"Electronics", image:"1.jpeg"})}
                                >See All <i className="fa fa-chevron-right"/></p>
                                </Col>
                            </Row>
                                </CardTitle>
                            <CardBody>
                            <Container>
                                        <Row>
                                        {electronics.map((product)=>(
                                             <Product key={product.id} product={product}/>
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
                        
                    </div>
                    </div>
                </React.Fragment>
                </div>
        );
    }

    

export default All;