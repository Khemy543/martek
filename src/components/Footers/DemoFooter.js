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
    <footer className="footer">
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
        <Col xs="6" md="4" lg="4" xl="4" sm="6">
        <Nav>
          <NavItem>
            <NavLink>
            LET US HELP YOU
            </NavLink>
            <ul className="left">
              <li>
              <a href="/user/help-center">Help Center</a>
              </li>
              <li>
              <a href="/user/contact-us">Contact Us</a>
              </li>
              <li>
              <a href="/user/how-to-buy-on-martek">How to buy on Martek</a>
              </li>
            </ul> 
          </NavItem>
        </Nav>
        </Col>

        <Col xs="6" md="4" lg="4" xl="4" sm="6">
        <Nav>
          <NavItem>
            <NavLink>
            ABOUT MARTEK
            </NavLink>
            <ul>
              <li>
              <a href="/user/about-us">About Us</a>
              </li>
              <li>
              <a href="/user/terms-and-condition">Terms and Conditions</a>
              </li>
              <li>
              <a href="/user/privacy-policy">Privacy Policy</a>
              </li>
            </ul>
          </NavItem>
        </Nav>
        </Col>
 
        <Col xs="6" md="4" lg="4" xl="4" sm="6">
        <Nav>
          <NavItem>
            <NavLink>
            MAKE MONEY ON MARTEK
            </NavLink>
            <ul>
              <li>
              <a href="/user/sell-on-martek">Sell on Martek</a>
              </li>
              <li>
                <a href="/user/own-shop-on-martek">Own a Shop on Martek</a>
              </li>
              <li>
              <a href="/user/service-charges">Service Charges</a>
              </li>
            </ul>
            
          </NavItem>
        </Nav>
        </Col>
        </Row>
        {/* <Row>
        <Col md="5" xs="6" sm="6" xl="5" lg="5" className="ml-auto mr-auto">
        <Nav>
          <NavItem>
            <NavLink>
            <div className="credits">
            <span className="copyright" style={{textAlign:"center"}}>
              © {new Date().getFullYear()}{" "}
              <i className="fa fa-heart heart" /> martek
            </span>
          </div>
            </NavLink>
          </NavItem>
        </Nav>
        </Col>
        </Row> */}
                
      </Container>
    </footer>
  );
}

export default DemoFooter;
