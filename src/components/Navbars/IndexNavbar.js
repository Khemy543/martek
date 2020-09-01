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
import { Link, NavLink as Naver } from "react-router-dom";
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
  //const [navbarColor, setNavbarColor] = React.useState("");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [campusCollapse, setCampusCollapse] = React.useState(false);
  const [searchValue, setSearchValue] = React.useState("");
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [name , setName] = React.useState("");
  const [campusList , setCampusList] = React.useState([]);
  const [loggedin, setLoggedin] =React.useState(false);
  const [dropdownCampusOpen, setDropdowncampusOpen] =React.useState(false);
  const [searchShow, setSearchShow] = React.useState(false);
  
 
  
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
  
  

React.useEffect(()=>{
 let user = localStorage.getItem('access_token');

  if(localStorage.getItem('access_token') !== null){
    setLoggedin(true);
  }else{
    setLoggedin(false);
  }
      axios.get("https://martek.herokuapp.com/api/auth/user",{
          headers:{ 'Authorization':`Bearer ${user}`}
  }
  )
  .then(res=>{
      if(res.data!== null){
        localStorage.setItem("user_id",res.data.id);
        setName(res.data.name);
      }
  }).catch(error=>{
  });

  axios.get("https://martek.herokuapp.com/api/campuses")
  .then(res=>{
      const campuses = res.data;
      if(res.status === 200){
        setCampusList(campuses)
      }
  });
  },[])
  return (
    <div className={classnames("fixed-top")}>
       
    <Navbar expand="lg" color="info" className='nav'>
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
          >
          <a href="/user/home" style={{textDecoration:'none', color:"white", fontWeight:"bold"}}>
          <img alt="#" src= {require("../../assets/img/martlogo.png")}
            style={{maxWidth:"80px", height:"auto",marginRight:"8px"}}
            className="top"
            />
            <img alt="#" src= {require("../../assets/img/martek.png")}
            style={{maxWidth:"40px", height:"auto", marginTop:"-5px",marginRight:"-8px"}}
            className="bottom"
            />
            
            </a>
          </NavbarBrand>

          <ProductConsumer> 
            {
              value=>(
          <Row>
          <Col md="12">      
         <Form inline >
         <FormGroup className="mb-2 ml-sm--6 mb-sm-0">
          <Input type="search" placeholder="Search..." name="search" className="searchbar" style={{borderRadius:3,height:"35px"}} value={searchValue}
          onChange = {
           e=>{
             setSearchValue(e.target.value);
             setSearchShow(true);
             value.searchPrediction(e.target.value);
             value.searchShopPrediction(e.target.value)
           }
           }
           require
          />
          {searchShow?
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
        </div> }
          </FormGroup>
          <Link to="/user/search-results"><Button type="submit" color="info" className="search-button"
          style={{height:"35px", borderRadius:5,fontSize:"11px", }}          
          onClick={(e) => {
          value.search(searchValue);
          value.searchShop(searchValue);
          setSearchShow(false);
             
            }
             }><i className="fa fa-search" style={{marginRight:"-15px", marginLeft:"-15px"}}/></Button></Link>
             
             
        </Form>
         
        </Col>
        </Row>
        )
            }
          </ProductConsumer>
         
            
          
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
              } | Campus
                </NavLink>
              
              <UncontrolledPopover placement="bottom" isOpen={dropdownCampusOpen} toggle={toggleCampus} target="campusPopOver" trigger="legacy">
                  
                  <PopoverBody  style={{paddingLeft:"0px", paddingRight:"0px"}}>
                    <ListGroup>
                  {campusList.map((value,index)=>(
                     <ListGroupItem style={{border:"none", marginTop:"-10px", textAlign:"left"}} className="campuspop"
                     onClick={()=>{history.push(`/user/campus-home/${value.campus}`,{id:value.id});setDropdowncampusOpen(false);console.log("clicked")}}
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
              <i className = "fa fa-shopping-bag" style={{fontSize:"11px"}}/> | my shop
              </NavLink>
             
            </NavItem>
            <NavItem>
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
                  <PopoverHeader>ACCOUNT</PopoverHeader>
                  <PopoverBody style={{paddingLeft:"0px",paddingRight:"0px"}}>
                   <ListGroup >  
                    <ListGroupItem style={{border:"none", textAlign:"left"}} className="userdrop" onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setDropdownOpen(false);
              }}><i className="fa fa-user"/> <Link to="/user/profile">{name}</Link></ListGroupItem>
                  <ListGroupItem style={{border:"none", textAlign:"left"}} className="userdrop" onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setDropdownOpen(false);
              }}><i className="fa fa-tablet"/> <Link to="/user/products">My Products</Link></ListGroupItem>

              <ListGroupItem style={{border:"none", textAlign:"left"}} className="userdrop" onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setDropdownOpen(false);
              }}><i className="fa fa-users"/> <Link to="/user/following">Following <Badge color="danger">{value.followShops.length}</Badge></Link></ListGroupItem>
                  <ListGroupItem style={{border:"none", textAlign:"left",cursor:"pointer"}} className="userdrop" onClick={()=>{value.logout(); document.documentElement.classList.toggle("nav-open");
                setDropdownOpen(false); }}><i className="fa fa-sign-out"/> SIGN OUT</ListGroupItem>
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
            <NavItem style={{borderBottom:"1px solid  #eaeaea", borderTop:"1px solid #eaeaea"}}>
              <NavLink>
              MARTEK
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
              <i className="fa fa-shopping-bag mr-3"/> My Shop
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
              <i className="fa fa-cart-plus mr-3"/> cart <Badge color="danger">{value.cart.length}</Badge>
              </NavLink>
            </NavItem>

            <NavItem style={{borderBottom:"1px solid #eaeaea", borderTop:"1px solid #eaeaea"}}>
              <NavLink onClick={toggleCampusCollapse}>
              Campus <i className={!campusCollapse? "fa fa-chevron-down ml-3":"fa fa-chevron-up ml-3"}/>
              </NavLink>
            </NavItem>
            <Collapse isOpen={campusCollapse}>
            {campusList.map((value,index)=>(
              <div key={index}>
              <NavLink style={{fontWeight:600, fontSize:"12px", lineHeight:"1.5em", color:"#9A9A9A"}} className="text-uppercase"
              onClick={()=>{
                history.push("/user/campus-home/"+value.campus+"",{id:value.id}); 
                document.documentElement.classList.toggle("nav-open");
                setNavbarCollapse(false)
                }}
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
              color="danger"
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
              >
              <i className="fa fa-user-o mr-3"/> {name}
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
              <i className="fa fa-users mr-3"/> Following <Badge color="danger">{value.followShops.length}</Badge>
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
