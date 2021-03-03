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
import ShopCard from "../../components/ShopCard.js";
import axios from "axios";
import Pagination from "react-js-pagination";
//context
import { Link } from "react-router-dom";
import StoreIcon from '@material-ui/icons/Store';

function Shops({history}){
    const [activeTab, setActiveTab] = React.useState("2");
    const [isActive, setIsActive] = React.useState(true);
    const [shops, setShops] = React.useState([]);
    const [activeCampus, setActiveCampus] = React.useState(localStorage.getItem('activeCampus_id'));
    const [pagination,setPagination] = React.useState({});
    
      React.useEffect(()=>{

        getShops();
        
      },[])
      function getShops(pageNumber=1){
        axios.get("https://backend-api.martekgh.com/api/all-shops",
        {
            params:{
                page:pageNumber,
                campus_id:activeCampus,
            }
        })
        .then(res=>{
            console.log(res.data)
            setShops(res.data);
            setIsActive(false)
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
            pageRangeDisplayed={5   }
            itemClass="page-item"
            linkClass="page-link"
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
                                    <StoreIcon style={{marginLeft:'-9px', marginRight:"3px", fontSize:"19px", marginBottom:"4px"}}/>Shops
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
                                    
                                    </Container>
                                    }
                                    </>
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

    

export default Shops;