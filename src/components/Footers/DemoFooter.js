import React,{useState} from "react";
import { Link } from "react-router-dom";
// reactstrap components
import { Row, Container,Nav, NavLink, NavItem,Col

} from "reactstrap";


function DemoFooter(props) {
  console.log(props.prop)

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
        <Row style={{marginTop:"-20px"}}>
        <Col xs="6" md="4" lg="4" xl="4" sm="6">
        <Nav>
          <NavItem>
            <NavLink>
            LET US HELP YOU
            </NavLink>
            <ul className="left">
              <li>
              <Link to="/user/help-center">Help Center</Link>
              </li>
              <li>
              <Link to="/user/contact-us">Contact Us</Link>
              </li>
              <li>
              <Link to="/user/how-to-buy-on-martek">How to buy on Martek</Link>
              </li>
              {props.prop.location.pathname.split("/")[2] == "shop-view"?
              <li>
              <a style={{cursor:"pointer"}} onClick={()=>props.prop.history.push("/user/report-shop",{id:props.prop.location.state.id})}>Report This Shop</a>
              </li>
              :
              props.prop.location.pathname.split('/')[2] == 'product-details'?
              <li>
              <a style={{cursor:"pointer"}} onClick={()=>props.prop.history.push("/user/report-product",{id:props.prop.location.state.id})}>Report This Product</a>
              </li>
              :
              <></>
              }
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
              <Link to="/user/about-us">About Us</Link>
              </li>
              <li>
              <Link to="/user/terms-and-condition">Terms and Conditions</Link>
              </li>
              <li>
              <Link to="/user/privacy-policy">Privacy Policy</Link>
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
              <Link to="/user/sell-on-martek">Sell on Martek</Link>
              </li>
              <li>
                <Link to="/user/own-shop-on-martek">Own a Shop on Martek</Link>
              </li>
              <li>
              <Link to="/user/service-charges">Service Charges</Link>
              </li>
            </ul>
            
          </NavItem>
        </Nav>
        </Col>
        </Row>
        <br/>
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
