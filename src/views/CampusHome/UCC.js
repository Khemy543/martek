import React from "react";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
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
import ShopCard from "../../components/ShopCard.js";
import axios from "axios";
import Pagination from "react-js-pagination";
//context
import { ProductConsumer } from "../../context";

let user = localStorage.getItem('access_token')

var settings = {
    dots: true,
    infinite: true,
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

  let id = null;

class Ucc extends React.Component{

    state={
        activeTab:"1",
        categoryList:[],
        isActive:false,
        shops:[],
        newid:"",
        phone:[],
        electronics:[],
        fashion:[],
        newItems:[]
    }
    
     toggle = tab => {
        if (this.state.activeTab !== tab) {
          this.setState({activeTab:tab})
        }
      };

     componentDidMount(){
         console.log(this.props.location)
         this.setState({isActive:true});
        axios.get("http://backend-api.martekgh.com/api/categories")
        .then(res=>{
          const categories = res.data
          this.setState({categoryList:categories})
        });

        axios.get(`http://backend-api.martekgh.com/api/get/campus/2/carousel`,{
            headers:{ 'Authorization':`Bearer ${user}`}
        })
        .then(res=>{
            console.log(res.data)
        })

        axios.get(`http://backend-api.martekgh.com/api/get/campus/${this.props.location.state.id}/new-this-week`)
        .then(res=>{
            console.log(res.data);
            this.setState({newItems:res.data})
        })

        axios.get("http://backend-api.martekgh.com/api/get-campus/"+this.props.location.state.id+"/product")
        .then(res=>{
          console.log("produxts:", res.data);
          for(var i =0; i<res.data.products.length; i++){
            if(res.data.products[i].Electronics !== undefined){
                this.setState({electronics:res.data.products[i].Electronics})
            }
            else if(res.data.products[i].Phones !== undefined){
                this.setState({phone:res.data.products[i].Phones})
            }
            else if(res.data.products[i].Fashion !== undefined){
                this.setState({fashion:res.data.products[i].Fashion})
            }
        }
        });


        this.getShops();
        
      }

     getShops(pageNumber=1){
        axios.get("http://backend-api.martekgh.com/api/get-campus/"+this.props.location.state.id+"/shop?page="+pageNumber+"")
        .then(res=>{
            console.log(res.data)
            this.setState({shops:res.data, isActive:false});
        })
        .catch(error=>{
            console.log(error)
        });
      }


      renderShops(){
        const {data, meta} = this.state.shops;
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
        onChange={(pageNumber)=>this.getShops(pageNumber)}
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
        render(){
        return(
            <div>
                <LoadingOverlay 
                active = {this.state.isActive}
                spinner={<BounceLoader color={'#4071e1'}/>}
                >
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
                                    className={this.state.activeTab === "1" ? "active" : ""}
                                    onClick={() => {
                                    this.toggle("1");
                                    }}
                                >
                                   <i className="fa fa-home"/> All
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                style={{cursor:"pointer"}}
                                    className={this.state.activeTab === "2" ? "active" : ""}
                                    onClick={() => {
                                    this.toggle("2");
                                    }}
                                >
                                    <i className="fa fa-shopping-bag"/>Shops
                                </NavLink>
                                </NavItem>
                                <NavItem>
                                <NavLink
                                style={{cursor:"pointer"}}
                                    className={this.state.activeTab === "3" ? "active" : ""}
                                    onClick={() => {
                                    this.toggle("3");
                                    }}
                                >
                                    <i className="fa fa-bars"/>Categories
                                </NavLink>
                                </NavItem>
                            </Nav>
                            </div>
                        </div>

                         {/*Tabs*/}

                         <TabContent className="" activeTab={this.state.activeTab}>
                            <TabPane tabId="1" id="home">
                            <Container>
                            <Row>
                        <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                            <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                                <h3 style={{borderBottom:"1px solid #eaeaea", fontWeight:"bold"}} className="category">
                                    <i className="fa fa-gg" style={{color:"#ff8d00"}}/> PHONES & ACCESSORIES
                                    
                                    </h3>
                                </CardTitle>
                                <CardBody>
                                <Container>
                                    <Row>
                                    {this.state.phone && this.state.phone.map((value, index)=>(
                                        <Product key={value.id} product={value}/>
                                    ))}
                                        </Row>
                                        </Container>
                                    </CardBody>
    
                            </Card>
                            </Row>
                            
                            <Row>
                        <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                        <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                            <h3 style={{borderBottom:"1px solid #eaeaea", fontWeight:"bold"}} className="category">
                                <i className="fa fa-gg" style={{color:"#ff8d00"}}/> NEW THIS WEEK
                                
                                </h3>
                            </CardTitle>
                    
                                <CardBody>
                                    <Container>
                                    <Row>
                                        <Col md="12" style={{padding:"0px 0px 0px 0px"}}>
                                        <Slider {...settings} infinite={this.state.newItems.length>3}>
                                        {this.state.newItems.map((value,key)=>(
                                            <div key={key}>
                                                <Col>
                                            <Card className="card-plain" style={{borderRight:"1px solid #eaeaea",margin:"0px 0px 0px 0px", padding:"0px 20px 0px 20px",cursor:"pointer"}}>
                                                <CardTitle style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", padding:"0px 0px 0px 0px"}}>
                                                {value.product_name}
                                                    </CardTitle>
                                                    <br/>
                                                    <div style={{textAlign:"center"}} onClick={() => this.props.history.push("/user/product-details",{id:value.id})}>
                                                    <img alt="#" src={require("../../assets/img/iphone.png")} style={{height:"185.13px", width:"180px"}}/>
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
                            <h3 style={{borderBottom:"1px solid #eaeaea", fontWeight:"bold"}} className="category">
                                <i className="fa fa-gg" style={{color:"#ff8d00"}}/> FASHION
                               
                                </h3>
                            </CardTitle>
                            <CardBody>
                            <Container>
                                <Row>
                                {this.state.fashion && this.state.fashion.map((value, index)=>(
                                    <Product key={value.id} product={value}/>
                                ))}
                                    </Row>
                                    </Container>
                                </CardBody>

                        </Card>
                        </Row>

                        
                       

                    <Row>
                    <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                        <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                            <h3 style={{borderBottom:"1px solid #eaeaea", fontWeight:"bold"}} className="category">
                                <i className="fa fa-gg" style={{color:"#ff8d00"}}/> ELECTRONICS & APPLIANCES
                               
                                </h3>
                            </CardTitle>
                            <CardBody>
                            <Container>
                                <Row>
                                {this.state.electronics && this.state.electronics.map((value, index)=>(
                                    <Product key={value.id} product={value}/>
                                ))}
                                    </Row>
                                    </Container>
                                </CardBody>

                        </Card>
                        </Row>


                    
                        <Row>
                        <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white", boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                            <CardTitle style={{borderBottom:"1px solid #eaeaea", fontWeight:"bold", marginLeft:"15px", marginRight:"15px", fontSize:"20px"}}>
                            <i className="fa fa-gg" style={{color:"#ff8d00"}}/>  FEATURED CATEGORY
                                </CardTitle>
                                <CardBody >
                                    <Row>
                                    <Col>
                                        <Card className="card-plain">
                                            <div className="img-container">
                                            <div>
                                            <img alt="#" src={require("../../assets/img/iphone.png")} style={{maxHeight:"150px", maxWidth:"120px"}}/>
                                            <h4>PHONES</h4>
                                            </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="card-plain">
                                            <div className="img-container">
                                            <div>
                                            <img alt="#" src={require("../../assets/img/game.png")} style={{maxHeight:"150px", maxWidth:"120px"}}/>
                                            <h4>GAMING</h4>
                                            </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="card-plain">
                                            <div className="img-container">
                                            <div>
                                            <img alt="#" src={require("../../assets/img/shoe.png")} style={{maxHeight:"150px", maxWidth:"120px"}}/>
                                            <h4>FOOT WEARS</h4>
                                            </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="card-plain">
                                            <div className="img-container">
                                            <div>
                                            <img alt="#" src={require("../../assets/img/game.png")} style={{maxHeight:"150px", maxWidth:"120px"}}/>
                                            <h4>GAMING</h4>
                                            </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="card-plain">
                                            <div className="img-container">
                                            <div>
                                            <img alt="#" src={require("../../assets/img/flatscreen.png")} style={{maxHeight:"150px", maxWidth:"120px"}}/>
                                            <h4>TELE</h4>
                                            </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    <Col>
                                        <Card className="card-plain">
                                            <div className="img-container">
                                            <div>
                                            <img alt="#" src={require("../../assets/img/game.png")} style={{maxHeight:"150px", maxWidth:"120px"}}/>
                                            <h4>GAMING</h4>
                                            </div>
                                            </div>
                                        </Card>
                                    </Col>
                                    </Row>

                                        
                                    </CardBody>
    
                            </Card>
                            </Row>
                    
                            </Container>
                            </TabPane>
                            <TabPane className="text-center" tabId="2" id="shops">
                                
                                    <Container>
                                    {this.state.shops && this.renderShops()}
                                    
                                    </Container>
                               
                                    
                            </TabPane>

                            <TabPane className="text-center" tabId="3" id="categories">
                                <Row>
                                {this.state.categoryList.map((value,index)=>(
                                    <Col md="6" className="mt-auto mb-auto">
                                    <Card className="card-plain" style={{backgroundColor:"white",cursor:"pointer",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} 
                                    onClick = {()=>this.props.history.push("/user/categories",{category_id:value.id, category_name:value.category})}

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
                                    </Card>
                                    </Col>
                                ))}
                                </Row>
                            </TabPane>
                            
                        </TabContent>
                       
                        </Container>
                        
                    </div>
                    
                        
                        
                    
                    </div>
                </React.Fragment>
                </LoadingOverlay>
                </div>
        );
    }
}

    

export default Ucc;