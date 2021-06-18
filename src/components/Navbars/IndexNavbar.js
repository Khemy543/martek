import React from "react";
import { Link, NavLink as Naver, Redirect } from "react-router-dom";

import StoreIcon from '@material-ui/icons/Store';
// nodejs library that concatenates strings
import classnames from "classnames";
// reactstrap components
import {
  Button,
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,
  Input,Row,Col,
  Form,Dropdown, DropdownToggle, DropdownMenu, DropdownItem, Badge,
  UncontrolledPopover,PopoverBody,PopoverHeader, ListGroup, ListGroupItem,ListGroupItemText,FormGroup
} from "reactstrap";

import { ProductConsumer } from "../../context";
import axios from "axios";
import history from "../../history.js";


//axios.defaults.withCredentials = false;
//axios.defaults.headers.common['Auth-Token'] = 'foo bar';



function IndexNavbar(props) {
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [campusCollapse, setCampusCollapse] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  /* const [name , setName] = React.useState(""); */
  const [campusList , setCampusList] = React.useState([]);
  const [loggedin, setLoggedin] =React.useState(false);
  const [dropdownCampusOpen, setDropdowncampusOpen] =React.useState(false);
  const [campusName, setCampusName] = React.useState(localStorage.getItem('activeCampus') || 'Campus');

  
 
  
  const toggle = () => setDropdownOpen(prevState => !prevState);
  

  const toggleCampus = () => {
    setDropdowncampusOpen(prevState =>!prevState);
   document.documentElement.classList.toggle("nav-open");
  };

  const toggleCampusCollapse = () => {
    setCampusCollapse(prevState=>!prevState);
    document.documentElement.classList.toggle("campus-open");
  };

  const toggNavbarCollapse=()=>{
    setNavbarCollapse(false);
    document.documentElement.campusList.toggle("nav-open")
  }
  
  const campusChange=(id, campus)=>{
    if(id === null){
      localStorage.removeItem('activeCampus_id')
    }else{
      localStorage.setItem('activeCampus_id',id); 
    }
    localStorage.setItem('activeCampus', campus)
    setDropdowncampusOpen(false);
    window.location.reload("/")
  }
  

React.useEffect(()=>{
 let user = localStorage.getItem('access_token');
  if(localStorage.getItem('access_token') !== null){
    setLoggedin(true);
  }else{
    setLoggedin(false);
  }
  /*  if(user != null){
      axios.get("https://backend-api.martekgh.com/api/auth/user",{
          headers:{ 'Authorization':`Bearer ${user}`}
  }
  )
  .then(res=>{
        localStorage.setItem("user_id",res.data.id);
        setName(res.data.name);
        if(res.data.valid_id === null){
          localStorage.setItem('validity',false)
        }
  }).catch(error=>{
  });
} */

  axios.get("https://backend-api.martekgh.com/api/campuses")
  .then(res=>{
      const campuses = res.data;
      if(res.status === 200){
        setCampusList(campuses)
      }
  });
  },[]);

  const search=(e)=>{
    e.preventDefault();
    let query = searchValue;
    axios.get('https://backend-api.martekgh.com/api/search/item',
    {params:{search:searchValue}})
    .then(res=>{
      console.log(res.data);
      setSearchValue("")
      let products = res.data.filter(item=>item.type === 'products');
      let shops = res.data.filter(item=>item.type === "merchandisers")
      history.push({
        pathname:'/user/search-results',  
        state: { results: res.data, shops:shops, products:products, searchValue:searchValue },
        search:'?search='+query})
    })
    .catch(error=>{
      console.log(error);
    })
  }

  return (
    <div className={classnames("fixed-top")}>
       
    <Navbar expand="lg" color="info" className='nav' id="myhead">
    {navbarCollapse ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setNavbarCollapse(false);
          }}
        />
      ) : null}
      <Container>
          <NavbarBrand
            data-placement="bottom"
            title="Martek gh online"
            tag={Link}
            to="/user/home"
          >
          {/* <Link to="/user/home" style={{textDecoration:'none', color:"white", fontWeight:"bold"}}> */}
          <img alt="#" src= {require("../../assets/img/martlogo.png")}
            style={{maxWidth:"100px", height:"auto",marginRight:"8px"}}
            className="top"
            />
            <img alt="#" src= {require("../../assets/img/martek.png")}
            style={{maxWidth:"40px", height:"auto", marginTop:"-5px",marginRight:"-8px"}}
            className="bottom"
            />
            
            {/* </Link> */}
          </NavbarBrand>

          <Row>
          <Col md="12">      
         <Form inline onSubmit={search}>
         <FormGroup className="mb-2 ml-sm--6 mb-sm-0">
          <Input type="search" placeholder="Search..." name="search" className="searchbar" style={{borderRadius:3,height:"35px"}} value={searchValue}
            onChange = {e=>setSearchValue(e.target.value)}
           required
          />
         {/*  {searchShow?
          <div className="autocomplete-items">
          {value.prediction.map((searchValue,index)=>(
          <Link to="/user/search-results" style={{color:"black", fontWeight:500}}>
          <div key={index} onClick={()=>{value.search(searchValue.product_name);setSearchShow(false); setSearchValue(searchValue.product_name)}}>
            <i className="fa fa-search mr-3" style={{color:"#0000008f"}}/>{searchValue.product_name}
           </div>
           </Link>
          ))}
          {
            value.shopPredicition.map((searchValue,index)=>(
          <Link to="/user/search-results" >
          <div key={index} onClick={()=>{value.searchShop(searchValue.company_name);setSearchShow(false); setSearchValue(searchValue.company_name)}}>
            <h4 style={{color:"black", fontWeight:500, fontSize:"14px",margin:'0px 0px 0px 0px'}}><i className="fa fa-search mr-3" style={{color:"#0000008f"}}/>{searchValue.company_name}</h4>
            <p style={{color:"black", fontSize:"11px", fontWeight:400, paddingLeft:"33px"}} className="truncate">{searchValue.company_description}</p>
           </div>
           </Link>
          ))
          }  
        </div>:
        <div>
        </div> } */}
          </FormGroup>
          <Button type="submit" color="info" className="search-button" style={{height:"35px", borderRadius:5,fontSize:"11px" }}>          
              <i className="fa fa-search" style={{marginRight:"-15px", marginLeft:"-15px"}}/>
          </Button>
        </Form>
        </Col>
        </Row>
         
            
          
          <button
            aria-expanded={navbarCollapse}
            className={classnames("navbar-toggler navbar-toggler")}
            onClick={() => {
              document.documentElement.classList.toggle("nav-open");
              setNavbarCollapse(!navbarCollapse);
            }}
            type="button"
          >
            <span className="navbar-toggler-bar bar1" />
            <span className="navbar-toggler-bar bar2" />
            <span className="navbar-toggler-bar bar3" />
          </button>

          <Nav navbar
          className="justify-content-end"
          style={{maxWidth:"50%",float:"right"}}
          id="desktop-cat"
          >
            <NavItem>
              <div >

              <NavLink id="campusPopOver" style={{fontSize:"11px", cursor:'pointer'}}>
              {!dropdownCampusOpen?
                <i className = "fa fa-chevron-down" style={{fontSize:"10px"}}/>
                :
                <i className = "fa fa-chevron-up" style={{fontSize:"10px"}}/>
              } | {campusName}
                </NavLink>
              
              <UncontrolledPopover placement="bottom" isOpen={dropdownCampusOpen} toggle={toggleCampus} target="campusPopOver" trigger="legacy">
                  
                    <PopoverBody  style={{paddingLeft:"0px", paddingRight:"0px"}}>
                      <ListGroup>
                        <ListGroupItem onClick={()=>campusChange(null,'Campus')} style={{border:"none", marginTop:"-10px", textAlign:"left"}} className="campuspop"
                        ><i className="fa fa-graduation-cap mr-3"/>All</ListGroupItem>
                        {campusList.map((value,index)=>(
                          <ListGroupItem style={{border:"none", marginTop:"-10px", textAlign:"left"}} className="campuspop"
                          onClick={()=>campusChange(value.id , value.campus)}
                          ><i className="fa fa-graduation-cap mr-3"/>{value.campus}</ListGroupItem>
                        ))}
                    </ListGroup>
                    </PopoverBody>
                </UncontrolledPopover>
                </div>
            </NavItem>
            <NavItem>
              
              <NavLink 
              tag={Naver}
              to="/auth/shop-login"
              style={{fontSize:"11px"}}
               >
              <StoreIcon style={{fontSize:"12px"}}/> | my shop
              </NavLink>
             
            </NavItem>
            <NavItem className="d-lg-none">
              <NavLink
              tag={Naver}
              to="/user/add-product"
              style={{fontSize:"11px"}}
              >
              <i className= 'fa fa-money' style={{fontSize:"11px"}}/> | sell
              </NavLink>
            </NavItem>
            <ProductConsumer>
              {value=>(
            <NavItem>
              <NavLink
              tag={Naver}
              to="/user/cart"
              style={{fontSize:"11px"}}
              >
              <i className = "fa fa-cart-plus"style={{fontSize:"11px"}}/> | Cart
              <Badge color="danger" style={{marginLeft:"2px"}}>{value.cart.length}</Badge>
              </NavLink>
            </NavItem>
          )}
            </ProductConsumer>
            <NavItem>
            {!loggedin?
            <NavLink
            tag={Naver}
            to="/auth/login-page"
            style={{fontSize:"11px"}}
            >
            <i className = "fa fa-sign-in"style={{fontSize:"11px"}}/> | Sign in
            </NavLink>
              :
              <div>
              <ProductConsumer>
                {value=>(
                  <div>
                  <NavLink id="Popover2" style={{fontSize:"11px", cursor:"pointer"}}>
                    {!dropdownOpen?
                      <i className="fa fa-chevron-down" style={{fontSize:"11px"}}/>
                      :
                      <i className="fa fa-chevron-up" style={{fontSize:"11px"}}/>
                    }  
                  <i className="fa fa-user-o" style={{fontSize:"11px"}}/> | user
                  </NavLink>
                <UncontrolledPopover trigger="legacy" isOpen={dropdownOpen} placement="bottom" toggle={toggle} target="Popover2">
                 {/*  <PopoverHeader>ACCOUNT</PopoverHeader> */}
                  <PopoverBody style={{paddingLeft:"0px",paddingRight:"0px"}}>
                   <ListGroup >  
                    <ListGroupItem style={{border:"none", textAlign:"left",cursor:"pointer"}} className="userdrop" onClick={() => {
                      document.documentElement.classList.toggle("nav-open");
                      setDropdownOpen(false);
                      history.push('/user/profile')
                      }}><i className="fa fa-user mr-1"/>{value.user?.name}
                      </ListGroupItem>

                    <ListGroupItem style={{border:"none", textAlign:"left",cursor:"pointer"}} className="userdrop" onClick={() => {
                      document.documentElement.classList.toggle("nav-open");
                      setDropdownOpen(false);
                      history.push('/user/user-products')
                     }}><i className="fa fa-tablet mr-1"/>My Products
                     </ListGroupItem>

                     <ListGroupItem style={{border:"none", textAlign:"left",cursor:"pointer"}} className="userdrop" onClick={() => {
                      document.documentElement.classList.toggle("nav-open");
                      setDropdownOpen(false);
                      history.push('/user/transactions')
                     }}><i className="fa fa-credit-card mr-1"/>Transactions
                     </ListGroupItem>

                    <ListGroupItem style={{border:"none", textAlign:"left", cursor:"pointer"}} className="userdrop" onClick={() => {
                      document.documentElement.classList.toggle("nav-open");
                      setDropdownOpen(false);
                      history.push('/user/following')
                    }}><i className="fa fa-users mr-1"/>Following 
                    </ListGroupItem>
                  <ListGroupItem style={{border:"none", textAlign:"left",cursor:"pointer"}} className="userdrop" onClick={()=>{value.logout(); document.documentElement.classList.toggle("nav-open");
                setDropdownOpen(false); }}><i className="fa fa-sign-out"/> Sign Out</ListGroupItem>
                  </ListGroup>
                  </PopoverBody>
                  </UncontrolledPopover>
                  </div>
                )}
            
            </ProductConsumer>
            </div>
            }
            
              
            </NavItem>
          </Nav>


          <Collapse 
          navbar
          isOpen={navbarCollapse}
          className="phone-nav"
          >
          <ProductConsumer>
            {value=>(
          <Nav navbar
          className="phone-nav"
          
          >
            <NavItem style={{borderBottom:"1px solid  #eaeaea"}}>
              <NavLink>
              <img alt="#" src= {require("../../assets/img/martlogo.png")}
                style={{maxWidth:"100px", height:"auto",marginRight:"8px"}}
                />
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
              tag={Naver}
              to="/user/add-product"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setNavbarCollapse(false);
              }}
              >
              <i className= 'fa fa-money mr-3'/>Sell Item
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
              tag={Naver}
              to="/user/cart"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setNavbarCollapse(false);
              }}
              >
              <i className="fa fa-cart-plus mr-3"/> cart <Badge color="info">{value.cart.length}</Badge>
              </NavLink>
            </NavItem>
            
            <NavItem>
              <NavLink
              tag={Naver}
              to="/auth/shop-login"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setNavbarCollapse(false);
              }}
              >
              <StoreIcon style={{marginLeft:'-9px', marginRight:"3px"}}/> My Shop
              </NavLink>
            </NavItem>

            <NavItem style={{borderBottom:"1px solid #eaeaea", borderTop:"1px solid #eaeaea"}}>
              <NavLink onClick={toggleCampusCollapse}>
              <h4 style={{color:"#51bcda",fontWeight:"bold",fontSize:"12px", marginTop:"0px"}}>{campusName} <i className={!campusCollapse? "fa fa-chevron-down ml-3":"fa fa-chevron-up ml-3"}/></h4>
              </NavLink>
            </NavItem>
            <Collapse isOpen={campusCollapse}>
            <NavLink onClick={()=>campusChange(null,'Campus')} style={{fontWeight:600, fontSize:"12px", lineHeight:"1.5em", color:"#9A9A9A"}} className="text-uppercase"
              ><i className="fa fa-graduation-cap mr-3"/>All</NavLink>
            {campusList.map((value,index)=>(
              <div key={index}>
              <NavLink style={{fontWeight:600, fontSize:"12px", lineHeight:"1.5em", color:"#9A9A9A"}} className="text-uppercase"
               onClick={()=>campusChange(value.id , value.campus)}
              >
              <i className="fa fa-graduation-cap mr-3"/> {value.campus}
              </NavLink>
            </div>
          ))}
          </Collapse>

            <NavItem style={{borderBottom:"1px solid #eaeaea", borderTop:"1px solid #eaeaea"}}>
              <NavLink>
                User
              </NavLink>
            </NavItem>
            {!loggedin?
            <>
            <NavItem>
              <Button
              tag={Naver}
              to="/auth/login-page"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setNavbarCollapse(false);
              }}
              color="info"
              >

                Sign in
                </Button>
             </NavItem> 
            </>:
            <>
            <NavItem>
              <NavLink
              tag={Naver}
              to="/user/profile"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setNavbarCollapse(false);
              }}
              style={{color:"black"}}
              >
              <i className="fa fa-user-o mr-3"/> {value.user?.name}
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
              tag={Naver}
              to="/user/user-products"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setNavbarCollapse(false);
              }}
              >
              <i className="fa fa-tablet mr-3"/> My Products
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
              tag={Naver}
              to="/user/transactions"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setNavbarCollapse(false);
              }}
              >
              <i className="fa fa-credit-card mr-3"/> Transactions
              </NavLink>
            </NavItem>

            <NavItem>
              <NavLink
              tag={Naver}
              to="/user/following"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setNavbarCollapse(false);
              }}
              >
              <i className="fa fa-users mr-3"/> Following <Badge color="info">{value.followShops.length}</Badge>
              </NavLink>
            </NavItem>
            <NavItem>
              <NavLink
              onClick={()=>{value.logout();
                document.documentElement.classList.toggle("nav-open");
                setNavbarCollapse(false);
              }}
              >
              <i className="fa fa-sign-out mr-3"/> Sign Out
              </NavLink>
            </NavItem>
            </>}
            
          </Nav> )}
        </ProductConsumer>
          </Collapse>
      </Container>
    </Navbar>
    </div>
  );
}

export default IndexNavbar;