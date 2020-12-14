import React from "react";
//import { Link } from "react-scroll";
// reactstrap components
import{
    Container,
    Row,
    Col,
    TabContent,
    TabPane,
    Nav,
    NavLink,
    NavItem,
    Spinner
} from "reactstrap";

// core components
import CarouselView from "../../components/Carousel/Carousel.js";
import axios from "axios";
import { Link } from "react-router-dom";

function AllCategories({history}){
    const [activeTab, setActiveTab] = React.useState("3");
    const [categoryList, setCategoryList]=React.useState([]);
    const [isActive, setIsActive] = React.useState(false);
    

      React.useEffect(()=>{
        setIsActive(true);
        axios.get("https://backend-api.martekgh.com/api/categories")
        .then(res=>{
          const categories = res.data;
          console.log(categories)
          setCategoryList(categories);
          setIsActive(false)
        });

        
      },[])
      
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
                            <TabPane className="text-center" tabId="3" id="categories">
                                {isActive?
                                    <Spinner size="sm" color="info" style={{marginTop:"10px"}}/>
                                :
                                <Row>
                                {categoryList.map((value,index)=>(
                                    <Col md="4" className="mt-auto mb-auto">
                                    <img src={require(`assets/img/categories/${value.id}.jpeg`)} 
                                        style={{width:"100%",height:"105px", borderRadius:"10px", marginBottom:"20px", cursor:"pointer"}}
                                        onClick = {()=>history.push("/user/categories",{category_id:value.id, category_name:value.category, image:`${value.id}.jpeg`})}
                                    />
                                    </Col>
                                ))}
                                </Row>
                                }
                            </TabPane>
                            
                        </TabContent>
                       
                        </Container>
                        
                    </div>
                    
                        
                        
                    
                    </div>
                </React.Fragment>
                </div>
        );
    }

    

export default AllCategories;