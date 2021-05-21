import React,{useContext} from "react";
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
    NavItem,
    Spinner
} from "reactstrap";
import Skeleton,{SkeletonTheme} from 'react-loading-skeleton';


// core components
import Slider from "react-slick";
import Product from "../../components/Product.js";
import CarouselView from "../../components/Carousel/Carousel.js";
import axios from "axios";
import { Link } from "react-router-dom";
import {ProductConsumer,ProductContext} from '../../context.js'
/* import Pagination from "react-js-pagination"; */
import ShopCard from "../../components/ShopCard.js";
import Pagination from '../../components/Pagination/Pagination.js';
import ImageContainer from '../../components/ImageContainer.js'
import ProductHolder from "components/ProductHolder.js";
import { FormatAlignCenterSharp } from "@material-ui/icons";
import StoreIcon from '@material-ui/icons/Store';


var settings = {
    dots: false,
    speed: 500,
    slidesToShow: 6,
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

  var adssettings = {
    dots: false,
    speed: 1000,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay:true,
    responsive:[
        {
          breakpoint:450,
          settings:{
              centerMode:false,
              slidesToShow:1
          }
        }
      ] 
  };
function All({history}){
    const [isActive, setIsActive] = React.useState(false);
    const [newItems,setNewItems] = React.useState([1,2,3,4,5,6]);
    const [electronics,setElectronics] = React.useState([1,2,3,4,5,6]);
    const [fashion, setFashion] = React.useState([1,2,3,4,5,6]);
    const [phones,setPhones] = React.useState([1,2,3,4,5,6]);
    const [shops, setShops] = React.useState([]);
    const [pagination, setPagination] = React.useState({});
    const [activeCampus, setActiveCampus] = React.useState(localStorage.getItem('activeCampus_id'));
    const [categoryList, setCategoryList]=React.useState([]);
    const [ads, setAds] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [loading, setLoading] = React.useState(true);
    const [phoneLoading, setPhoneLoading] = React.useState(true);
    const [newLoading, setNewLoading] = React.useState(true);
    const [fashionLoading, setFashionLoading] = React.useState(true);
    const [electronicLoading, setElectronicLoading] = React.useState(true)
    
    

      React.useEffect(()=>{
        setLoading(true)
        var url = ''
        if(activeCampus == null){
          url = `https://backend-api.martekgh.com/api/admin/fetch/all/carousel-images`
        }else{
          url = `https://backend-api.martekgh.com/api/admin/campus/${activeCampus}/carousel-images`
        }
        axios.get(url)
        .then(res=>{
          let items = [];
          for(var i=0; i<res.data.length; i++){
            items.push({src:res.data[i].image_path})
          }
          setImages(items);
          setLoading(false)
        }).catch(error=>{
          console.log(error)
        })

        getShops();
        axios.get('https://backend-api.martekgh.com/api/fetch/all/ads')
        .then(response=>{
            setAds(response.data.shop_ad)
        })
        axios.get("https://backend-api.martekgh.com/api/categories")
        .then(res=>{
          const categories = res.data;
          setCategoryList(categories);
          setIsActive(false)
        });
        axios.get('https://backend-api.martekgh.com/api/fetch/new-this-week',
        {
            params:{campus_id:activeCampus}
        })
        .then(res=>{
            setNewItems(res.data);
            setNewLoading(false)
        })
        .catch(error=>{
            console.log(error)
        })

        axios.get("https://backend-api.martekgh.com/api/2/product-index",
         {
            params:{campus_id:activeCampus}
        })
         .then(res=>{
             const categories = res.data[0];
             setPhones(categories)
             setPhoneLoading(false)
         })
         .catch(error=>{
             console.log(error)
         })
 
         axios.get("https://backend-api.martekgh.com/api/3/product-index",
         {
            params:{campus_id:activeCampus}
        })
         .then(res=>{
             const categories = res.data[0];
             setFashion(categories);
             setFashionLoading(false)
         })
 
         axios.get("https://backend-api.martekgh.com/api/1/product-index",
         {
            params:{campus_id:activeCampus}
        })
         .then(res=>{
             const nextProducts = res.data[0];
             setElectronics(nextProducts);
             setElectronicLoading(false)
         })
      },[activeCampus])

      
      function getShops(page){
        setIsActive(true)
        let new_page = page || `https://backend-api.martekgh.com/api/all-shops?page=1`
        axios.get(new_page,
        {
            params:{
                campus_id:activeCampus,
            }
        })
        .then(response=>{
            setShops(response.data.data);
            let paginationData = {
                current_page : response.data.meta.current_page,
                last_page : response.data.meta.last_page,
                from_page : response.data.meta.from,
                to_page : response.data.meta.to,
                total_page : response.data.meta.total,
                path_page : response.data.meta.path+"?page=",
                first_link : response.data.links.first,
                last_link : response.data.links.last,
                prev_link : response.data.links.prev,
                next_link : response.data.links.next
              }
              setPagination(paginationData)
        })
        .finally((_)=>setIsActive(false))
      }


      function renderShops(){
        return(
        <React.Fragment>
        <Row>
            {shops && shops.map(shop=>{
            return<ShopCard key={shop.id} shop={shop} />
        })}
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
                    <ProductConsumer>
                        {value=>(
                    <Container>
                        <Row style={{height:"auto"}}>
                            <Col md="2" style={{padding:"0px 3px"}} className="d-none d-lg-block">
                                <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)", padding:"15px", height:"100%"}} className="card-plain">
                                    <h4 style={{fontSize:"12px", fontWeight:500, paddingTop:"0px"}}><i className="fa fa-heart-o mr-1"/> Tips</h4>
                                    <h4 style={{fontSize:"12px", fontWeight:500}}>
                                    1. Ensure to meet a campus seller in person, check the item(s) and make sure you are satisfied with the product.<br/><br/>
                                    2. Make payments only on delivery.<br/><br/>
                                    3. Avoid deals that are too good to be true; unrealistically low prices inclusive.<br/><br/>
                                    4. Never give out personal Information.
                                    </h4>
                                </Card>
                            </Col>
                            <Col md="8" sm="12" xs="12" style={{padding:"0px 4px"}}>
                                {loading?
                                    <div className="text-center">
                                        <Skeleton style={{marginTop:"10px", width:"100%", textAlign:"center", height:"40vh"}}/>
                                    </div>
                                :
                                <CarouselView images={images}/>
                                }  
                            </Col>
                            <Col md="2" style={{padding:"0px 3px"}} className="d-none d-lg-block">
                                <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)", padding:"30px 15px", height:"100%"}} className="card-plain">
                                    
                                    <Row style={{cursor:'pointer'}} onClick={()=>history.push('/user/add-product')}>
                                        <Col md="3">
                                        <div className="rounded-icon">
                                            <i className="fa fa-money" style={{fontSize:"18px"}}/>
                                        </div>
                                        </Col>
                                        <Col md="9">
                                            <h3 style={{fontSize:"12px", marginTop:0, fontWeight:500}}>Sell on Martek</h3>
                                            <p style={{fontSize:"10px"}}>Start advertising</p>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row style={{cursor:'pointer'}} onClick={()=>history.push('/user/shop/free-trial')}>
                                        <Col md="3">
                                        <div className="rounded-icon">
                                            <StoreIcon style={{fontSize:"18px"}}/>
                                        </div>
                                        </Col>
                                        <Col md="9">
                                            <h3 style={{fontSize:"12px", marginTop:0, fontWeight:500}}>Own a shop</h3>
                                            <p style={{fontSize:"10px"}}>Get your shop</p>
                                        </Col>
                                    </Row>
                                    <br/>
                                    <Row style={{cursor:'pointer'}} onClick={()=>history.push('/user/contact-us')}>
                                        <Col md="3">
                                        <div className="rounded-icon">
                                            <i className="fa fa-phone" style={{fontSize:"18px"}}/>
                                        </div>
                                        </Col>
                                        <Col md="9">
                                            <h3 style={{fontSize:"12px", marginTop:0, fontWeight:500}}>Contact Us</h3>
                                            <p style={{fontSize:"10px"}}>Let us help you</p>
                                        </Col>
                                    </Row>
                                    <br/>
                                </Card>
                            </Col>
                        </Row>
                        <div className="nav-tabs-navigation" style={{marginTop:"10px", marginBottom:"-4px"}}>
                            <div className="nav-tabs-wrapper">
                            <Nav role="tablist" tabs>
                                <NavItem>
                                <NavLink
                                    style={{cursor:"pointer"}}
                                    className={value.activeTabIndex === "1" ? "active" : ""}
                                    tag={Link}
                                    to="#"
                                    onClick={()=>value.actions.changeIndex("1")}
                                >
                                   <i className="fa fa-home"/> All
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                    style={{cursor:"pointer"}}
                                    className={value.activeTabIndex === "2" ? "active" : ""}
                                    tag={Link}
                                    onClick={()=>value.actions.changeIndex("2")}
                                    to="#"
                                >
                                   <StoreIcon style={{marginLeft:'-9px', marginRight:"3px", fontSize:"19px", marginBottom:"4px"}}/>Shops
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                    style={{cursor:"pointer"}}
                                    className={value.activeTabIndex === "3" ? "active" : ""}
                                    tag={Link}
                                    onClick={()=>value.actions.changeIndex("3")}
                                    to="#"
                                >
                                    <i className="fa fa-bars"/>Categories
                                </NavLink>
                                </NavItem>
                            </Nav>
                            </div>
                        </div>

                         {/*Tabs*/}

                         <TabContent className="" activeTab={value.activeTabIndex}>
                            <TabPane tabId="1" id="home">
                            <Container>
                            <Row>
                            <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                            <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                            <Row style={{borderBottom:"1px solid #eaeaea"}}>
                                <Col sm="8" md="9" lg="9" xl="9" xs="8">
                                <h3 style={{fontWeight:500}} className="category">
                                    <i className="fa fa-gg mr-1" style={{color:"#ff8d00"}}/> Phones & Accessories
                                    
                                </h3>
                                </Col>
                                <Col sm="4" md="3" lg="3" xl="3" xs="4">
                                <p style={{fontWeight:500, fontSize:"12px", float:"right",marginTop:"20px", marginBottom:"0px", cursor:"pointer"}} 
                                onClick = {()=>history.push("/user/categories",{category_id:2, category_name:"Phones and Accessories", image:"2.png"})}
                                >See All<i className="fa fa-chevron-right"/></p>
                                </Col>
                                </Row>
                                </CardTitle>
                                <CardBody>
                                    <Container>
                                        <Row>
                                        {phones.map((product)=>(
                                            <>
                                            {phoneLoading?
                                                <Col lg="2" md="2" sm="6" xs="6" style={{padding:"0px 2px 0px 2px"}}>
                                                    <ProductHolder />
                                                </Col>
                                                :
                                                <Product key={product.id} product={product}/>
                                            }
                                            </>
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
                                    <Row className="d-none d-lg-block">
                                        <Col md="12" style={{padding:"0px 0px 0px 0px"}} >
                                        <Slider {...settings} infinite={newItems.length>5}>
                                        {newItems.map((value,key)=>(
                                            <>
                                                {newLoading?
                                                    <div>
                                                    <Col style={{padding:"0px 3px 0px 3px", borderRight:"1px solid #eaeaea"}}>
                                                        <ProductHolder />
                                                    </Col>
                                                </div>
                                                :
                                                <div key={key}>
                                                    <Col className=" ml-auto mr-auto" style={{padding:"0px 3px 0px 3px", borderRight:"1px solid #eaeaea"}}>
                                                        <div className="text-center" onClick={() => history.push(`/user/product-details/${value.id}/${value.product_name}`,{id:value.id})}>
                                                            <ImageContainer 
                                                                src={`https://backend-api.martekgh.com/${value.product_image[0].path}`}
                                                                width={180}
                                                                height={180}
                                                                alt="alt"
                                                            />
                                                            {/* <img alt="#" src={`https://backend-api.martekgh.com/${value.product_image[0].path}`} style={{height:"180px", width:"180px", borderRadius:'5px', objectFit:"cover"}}/> */}
                                                        <h3 style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", textAlign:"left"}}>
                                                            {value.product_name}
                                                        </h3>
                                                        <h3 style={{color:"#5588b7", fontSize:"14px", fontWeight:600, textAlign:"left", marginTop:"3px"}}>GH¢ {value.price}</h3>
                                                    </div>
                                                    </Col>
                                                </div>
                                                    }
                                                </>
                                            ))}
                                        </Slider>
                                        
                                        </Col>
                                        </Row>
                                        <Row className="d-block d-lg-none">
                                        <Col md="12" style={{padding:"0px 0px 0px 0px"}} >
                                        <Slider {...settings} infinite={newItems.length>5}>
                                        {newItems.map((value,key)=>(
                                            <>
                                                {newLoading?
                                                    <div>
                                                    <Col style={{padding:"0px 3px 0px 3px", borderRight:"1px solid #eaeaea"}}>
                                                        <ProductHolder />
                                                    </Col>
                                                </div>
                                                :
                                                <div key={key}>
                                                    <Col className=" ml-auto mr-auto" style={{padding:"0px 3px 0px 3px", borderRight:"1px solid #eaeaea"}}>
                                                        <div className="text-center" onClick={() => history.push(`/user/product-details/${value.id}/${value.product_name}`,{id:value.id})}>
                                                            <ImageContainer 
                                                                src={`https://backend-api.martekgh.com/${value.product_image[0].path}`}
                                                                width={226}
                                                                height={226}
                                                                alt="alt"
                                                            />
                                                            {/* <img alt="#" src={`https://backend-api.martekgh.com/${value.product_image[0].path}`} style={{height:"180px", width:"180px", borderRadius:'5px', objectFit:"cover"}}/> */}
                                                        <h3 style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", textAlign:"left"}}>
                                                            {value.product_name}
                                                        </h3>
                                                        <h3 style={{color:"#5588b7", fontSize:"14px", fontWeight:600, textAlign:"left", marginTop:"3px"}}>GH¢ {value.price}</h3>
                                                    </div>
                                                    </Col>
                                                </div>
                                                    }
                                                </>
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
                                <Col sm="8" md="9" lg="9" xl="9" xs="8">
                                <h3 style={{fontWeight:500}} className="category">
                                    <i className="fa fa-gg mr-1" style={{color:"#ff8d00"}}/> Fashion
                                    
                                </h3>
                                </Col>
                                <Col sm="4" md="3" lg="3" xl="3" xs="4">
                                <p style={{fontWeight:500, fontSize:"12px", float:"right",marginTop:"20px", marginBottom:"0px", cursor:"pointer"}}
                                onClick = {()=>history.push("/user/categories",{category_id:3, category_name:"Fashion", image:"3.png"})}
                                >See All <i className="fa fa-chevron-right"/></p>
                                </Col>
                            </Row>
                                </CardTitle>
                            <CardBody>
                            <Container>
                                        <Row>
                                        {fashion.map((product)=>(
                                            <>
                                                {fashionLoading?
                                                <Col lg="2" md="2" sm="6" xs="6">
                                                    <ProductHolder />
                                                </Col>
                                                :
                                                <Product key={product.id} product={product}/>
                                                }
                                            </>
                                        ))}
                                        </Row>
                                    </Container>
                                </CardBody>

                        </Card>
                        </Row>




                        <Row>
                        <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                    
                                <CardBody style={{padding:"5px"}}>
                                    <Container>
                                    <Row>
                                        <Col md="12" style={{padding:"0px 0px 0px 0px"}} >
                                        <Slider {...adssettings} infinite={ads.length>3}>
                                        {ads.map((value,key)=>(
                                            <div key={key}>
                                                <Col style={{padding:"0px"}}>
                                                <div style={{cursor:"pointer"}}>
                                                    <div className="text-center" onClick={() => history.push(`/user/shop-view/${value.merchandiser_id}/shop`, {id:value.merchandiser_id})}>
                                                        <ImageContainer 
                                                            src={`https://backend-api.martekgh.com/${value.ad_path}`}
                                                            width={360}
                                                            height={260}
                                                            alt="alt"
                                                        />
                                                       {/*  <img alt="#" src={`https://backend-api.martekgh.com/${value.ad_path}`} style={{height:"230px",width:"100%",borderRadius:'5px', objectFit:"cover", border:"1px solid #eaeaea"}}/> */}
                                                    </div>
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
                                <Col sm="8" md="9" lg="9" xl="9" xs="8">
                                <h3 style={{fontWeight:500}} className="category">
                                    <i className="fa fa-gg" style={{color:"#ff8d00"}}/> Electronics & Appliances
                                    
                                </h3>
                                </Col>
                                <Col sm="4" md="3" lg="3" xl="3" xs="4">
                                <p style={{fontWeight:500, fontSize:"12px", float:"right",marginTop:"20px", marginBottom:"0px", cursor:"pointer"}}
                                onClick = {()=>history.push("/user/categories",{category_id:1, category_name:"Electronics", image:"1.png"})}
                                >See All <i className="fa fa-chevron-right"/></p>
                                </Col>
                            </Row>
                                </CardTitle>
                            <CardBody>
                            <Container>
                                        <Row>
                                        {electronics.map((product)=>(
                                            <>
                                            {electronicLoading?
                                                <Col lg="2" md="2" sm="6" xs="6">
                                                    <ProductHolder />
                                                </Col>
                                                :    
                                                 <Product key={product.id} product={product}/>
                                            }
                                            </>
                                        ))}
                                        </Row>
                                    </Container>
                                </CardBody>

                        </Card>
                        </Row>

                            </Container>
                            </TabPane>
                           
                        </TabContent>
                        {value.activeTabIndex === '2'?
                        <TabContent className="" activeTab={value.activeTabIndex}>
                            <TabPane className="text-center" tabId="2" id="shops">
                                {isActive?
                                    <Spinner color="info" size="sm"
                                        style={{marginTop:"10px"}}
                                    />
                                    :
                                    <>
                                    {shops.data !== undefined && shops.data.length<=0?
                                    <Container>
                                    <h4 style={{fontWeight:500}}>No Shops Available</h4>
                                    </Container>
                                    :
                                    <Container>
                                    {shops && renderShops()}
                                    {pagination.last_page > 1?
                                    <Pagination
                                        pagination={pagination && pagination}
                                        loadData={getShops}
                                    />
                                    : null
                                    }
                                    </Container>
                                    }
                                    </>
                                }
                            </TabPane>
                        </TabContent>
                        :
                        null}
                        <TabContent className="" activeTab={value.activeTabIndex}>
                            <TabPane className="text-center" tabId="3" id="categories">
                                {isActive?
                                    <Spinner size="sm" color="info" style={{marginTop:"10px"}}/>
                                :
                                <Row>
                                {categoryList.map((value,index)=>(
                                    <Col md="4" className="mt-auto mb-auto">
                                    <img src={require(`assets/img/categories/${value.id}.png`)} 
                                        style={{width:"100%",height:"105px", borderRadius:"10px", marginBottom:"20px", cursor:"pointer", objectFit:"cover"}}
                                        onClick = {()=>history.push("/user/categories",{category_id:value.id, category_name:value.category, image:`${value.id}.png`})}
                                    />
                                    </Col>
                                ))}
                                </Row>
                                }
                            </TabPane>
                            
                        </TabContent>
                       
                        </Container>
                        )}
                        </ProductConsumer>
                    </div>
                    </div>
                </React.Fragment>
                </div>
        );
    }

    

export default All;