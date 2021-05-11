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
import history from "../../history.js";
import { ProductConsumer } from '../../context.js';

// reactstrap components
import {
  Collapse,
  NavbarBrand,
  Navbar,
  NavItem,
  NavLink,
  Nav,
  Container,UncontrolledPopover,PopoverBody,PopoverHeader,ListGroup,ListGroupItem
} from "reactstrap";
import axios from "axios";

function ExamplesNavbar() {
  const [navbarColor] = React.useState("");
  const [navbarCollapse, setNavbarCollapse] = React.useState(false);
  const [dropdownOpen, setDropdownOpen] = React.useState(false);
  const [company_name, setCompany_name] = React.useState("");
  const [loggedin , setLoggedin] = React.useState(false);
  const [paymentRequired, setPaymentRequired] = React.useState(false)
  const [shopType, setShopType] = React.useState('')
  
  const toggle = () => setDropdownOpen(prevState => !prevState);
 
  let merchandiser = localStorage.getItem('shop_access_token')

  /* React.useEffect(()=>{
    
    axios.get("https://backend-api.martekgh.com/api/merchandiser",{
        headers:{ 'Authorization':`Bearer ${merchandiser}`}
}
)
.then(res=>{
    if(res.data !== null){
      setCompany_name(res.data.company_name);
      setLoggedin(true);
      setShopType(res.data.shop_type);
      if(res.data.payment_status === 'payment required'){
        setPaymentRequired(true)
      }
    } 

}).catch(error=>{
   
})
},[merchandiser]); */

/* const Logout=(e)=>{
  document.documentElement.classList.toggle("nav-open");
  setDropdownOpen(false);
  setNavbarCollapse(false);
} */


  return (
    <div className={classnames("fixed-top")}>
      {navbarCollapse ? (
        <div
          id="bodyClick"
          onClick={() => {
            document.documentElement.classList.toggle("nav-open");
            setNavbarCollapse(false);
          }}
        />
      ) : null}
    <Navbar
      className="nav"
      expand="lg"
      color="info"
    >
      <Container>
      <div className="navbar-translate">
          <NavbarBrand
            data-placement="bottom"
            tag={Link}
            to="/shop/shop-page"
          >
          {/* <Link to="/shop/shop-page" style={{textDecoration:'none', color:"white", fontWeight:"bold"}}> */}
          <img alt="#" src= {require("../../assets/img/martlogo.png")}
          style={{maxWidth:"100px", height:"auto", marginTop:"-5px",marginRight:"8px"}}
          className="top"
          />
          <img alt="#" src= {require("../../assets/img/martek.png")}
          style={{maxWidth:"40px", height:"auto", marginTop:"-5px",marginRight:"8px"}}
          className="bottom"
          />
            
            {/* </Link> */}
          </NavbarBrand>
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
          </div>
          <Nav navbar 
          className="justify-content-end"
          style={{maxWidth:"50%"}}
          id="desktop-cat"
          >
          <ProductConsumer>
            {
              value=>(
                <>
                
                   <NavItem>
              <NavLink 
              tag={Naver}
              to="/user/home"
              style={{fontSize:"11px"}}
              >
              <i className = "fa fa-chevron-left" style={{fontSize:"11px"}}/> | Back to site
              </NavLink>
            </NavItem>
         
            <NavItem>
              <NavLink
              tag={Naver}
              to="/shop/settings"
              style={{fontSize:"11px"}}
              >
              <i className="fa fa-cog" style={{fontSize:"11px"}}/> | settings

                </NavLink>
              </NavItem>
                            
              <NavItem>
              {!value.merchandiser?
              <div>
                </div>
                :
              <div>
              <NavLink id="Popover5" style={{fontSize:"11px", cursor:"pointer"}}>
              {!dropdownOpen?
                <i className="fa fa-chevron-down" style={{fontSize:"11px"}}/>
                :
                <i className="fa fa-chevron-up" style={{fontSize:"11px"}}/>
              }  
            <i className="fa fa-user-o" style={{fontSize:"11px"}}/> | user
            </NavLink>
          <UncontrolledPopover trigger="legacy" isOpen={dropdownOpen} placement="bottom" toggle={toggle} target="Popover5">
            <PopoverHeader>ACCOUNT</PopoverHeader>
            <PopoverBody style={{paddingLeft:"0px",paddingRight:"0px"}}>
             <ListGroup >  
              <ListGroupItem style={{border:"none", textAlign:"left",cursor:"pointer"}} className="userdrop"onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setDropdownOpen(false);
                history.push('/shop/settings')
              }}><i className="fa fa-user mr-1"/>{value.merchandiser?.company_name}
              </ListGroupItem>
              {value.merchandiser?.shop_type === "Max Shop" || value.merchandiser?.shop_type === "Non-student shop"?
              <ListGroupItem style={{border:"none", textAlign:"left",cursor:"pointer"}} className="userdrop"onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setDropdownOpen(false);
                history.push(`/shop/${value.merchandiser?.id}/manage-ad`,{id:value.merchandiser?.id})
              }}><i className="fa fa-podcast mr-1"/>Manage Ad
              </ListGroupItem>
              :
              null}
              {value.merchandiser?.payment_status !== 'payment required'?
              null
              :
              <ListGroupItem style={{border:"none", textAlign:"left",cursor:"pointer"}} className="userdrop"onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setDropdownOpen(false);
                history.push('/shop/payment/information',{shopType:shopType})
              }}><i className="fa fa-credit-card mr-1"/>Make Payment
              </ListGroupItem>
              }
              <ListGroupItem style={{border:"none", textAlign:"left",cursor:"pointer"}} className="userdrop"onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setDropdownOpen(false);
                history.push('/shop/transactions')
              }}><i className="fa fa-credit-card mr-1"/>Transactions
              </ListGroupItem>
            <ListGroupItem style={{border:"none", textAlign:"left", cursor:"pointer"}} className="userdrop" onClick={()=>{
              document.documentElement.classList.toggle("nav-open");
              setDropdownOpen(false);
              value.shopLogout()}}><i className="fa fa-sign-out"/> Sign Out</ListGroupItem>
            </ListGroup>
            </PopoverBody>
            </UncontrolledPopover>
              </div>}
            </NavItem>
                </>
              )
            }
          </ProductConsumer>
         
            </Nav>

            <Collapse 
            navbar
            isOpen={navbarCollapse}
            > 
            <Nav navbar
            className="phone-nav"
            >
            <ProductConsumer>
              {
                value=>(
                  <>
              <NavItem style={{borderBottom:"1px solid  #eaeaea", borderTop:"1px solid #eaeaea"}}>
              <NavLink>
              {value.merchandiser?.company_name}
              </NavLink>
             </NavItem> 
             <NavItem>
             <NavLink
             tag={Naver}
             to="/user/home"
             onClick={() => {
               document.documentElement.classList.toggle("nav-open");
               setNavbarCollapse(false);
             }}
             >
             <i className="fa fa-chevron-left mr-3"/> back to site 
             </NavLink>
           </NavItem> 

           <NavItem>
              <NavLink
              tag={Naver}
              to="/shop/settings"
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setNavbarCollapse(false);
              }}
              >
              <i className="fa fa-cog mr-3"/> settings
              </NavLink>
            </NavItem>
            {value.merchandiser?.shop_type === "Max Shop" || value.merchandiser?.shop_type === "Non-student shop"?
            <NavItem>
              <NavLink
              tag={Naver}
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setNavbarCollapse(false);
                history.push(`/shop/${value.merchandiser?.id}/manage-ad`,{id:value.merchandiser?.id})
              }}
              >
              <i className="fa fa-cog mr-3"/> Manage Ad
              </NavLink>
            </NavItem>
            :
            null}
            {!value.merchandiser?.payment_status !== 'payment required'?
            null
            :
            <NavItem>
              <NavLink
              tag={Naver}
              onClick={() => {
                document.documentElement.classList.toggle("nav-open");
                setNavbarCollapse(false);
                history.push('/shop/payment/information',{shopType:shopType})
              }}
              >
              <i className="fa fa-credit-card mr-3"/> Make Payment
              </NavLink>
            </NavItem>
            }
            <NavItem>
              <NavLink
              tag={Naver}
              to="/shop/transactions"
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
              onClick={()=>{
                document.documentElement.classList.toggle("nav-open");
                setNavbarCollapse(false);
                value.shopLogout()}}
              >
              <i className="fa fa-sign-out mr-3"/> LogOut
              </NavLink>
            </NavItem>
                  </>
                )
              }
            </ProductConsumer>
            
            </Nav>  
            </Collapse>
      </Container>
      </Navbar>
    </div>
  );
}

export default ExamplesNavbar;
