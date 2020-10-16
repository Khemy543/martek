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
/*eslint-disable*/
import React,{useState} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Row, Container, Modal, ModalBody, ModalHeader,Col, Button, Form, Input, InputGroup,Alert,
  InputGroupAddon,InputGroupText, ModalFooter, Nav, NavLink, NavItem

} from "reactstrap";

function DemoFooter() {
  return (
    <footer className="footer footer-black">
      <Container>
        <Row>
        <Col md="12">
        <Nav>
          <NavItem>
            <NavLink>
            <img alt="#" src={require("../../assets/img/martlogo.png")} style={{maxWidth:"120px", height:"30px"}}/>
            </NavLink>
          </NavItem>
        </Nav>
        </Col>
        </Row>
        <Row>
        <Col xs="6" md="4">
        <Nav>
          <NavItem>
            <NavLink style={{paddingLeft:"0px"}}>
            LET US HELP YOU
            </NavLink>
            <a href="/user/help-center">Help Center</a><br/>
            <a href="/user/contact-us">Contact Us</a><br/>
            <a href="/user/how-to-buy-on-martek">How to buy on Martek</a>
          </NavItem>
        </Nav>
        </Col>

        <Col xs="6" md="4">
        <Nav>
          <NavItem>
            <NavLink style={{paddingLeft:"0px"}}>
            ABOUT MARTEK
            </NavLink>
            <a>About Us</a><br/>
            <a>Terms and Conditions</a><br/>
            <a>Privacy Policy</a>
          </NavItem>
        </Nav>
        </Col>
 
        <Col xs="6" md="4">
        <Nav>
          <NavItem>
            <NavLink style={{paddingLeft:"0px"}}>
            MAKE MONEY ON MARTEK
            </NavLink>
            <a href="/user/sell-on-martek">Sell on Martek</a><br/>
            <a href="/user/own-shop-on-martek">Own a Shop on Martek</a><br/>
            <a href="/user/service-charges">Service Charges</a>
          </NavItem>
        </Nav>
        </Col>
        </Row>
        <Row>
        <Col md="6" xs="8" sm="6" xl="6" lg="6" className="ml-auto mr-auto">
        <Nav>
          <NavItem>
            <NavLink>
            <div className="credits">
            <span className="copyright" style={{textAlign:"center"}}>
              © {new Date().getFullYear()}, made with{" "}
              <i className="fa fa-heart heart" /> martek
            </span>
          </div>
            </NavLink>
          </NavItem>
        </Nav>
        </Col>
        </Row>
                
      </Container>
    </footer>
  );
}

export default DemoFooter;
