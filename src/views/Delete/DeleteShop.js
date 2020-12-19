import React from "react";
// reactstrap components
import {
  Button,
  Input,
  Container,
  Row,
  Form,
  InputGroup,InputGroupAddon,InputGroupText,Col,Popover,PopoverBody,PopoverHeader,Modal,ModalBody, TabPane, Nav,
  NavLink, NavItem,TabContent
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
//import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import history from "../../history.js";

let merchandiser = localStorage.getItem("shop_access_token")

function DeleteShop() {
    const [isActive, setIsActive] = React.useState(false)

    const handleDelete=()=>{
        console.log(merchandiser)
        setIsActive(true)
        axios.delete("https://backend-api.martekgh.com/api/merchandiser/delete",{
            headers:{"Authorization":`Bearer ${merchandiser}`}
        })
        .then(res=>{
            history.push("/user/home");
            localStorage.removeItem('shop_access_token');
            setIsActive(false)
        })
        .catch(error=>{
            setIsActive(false)
        })
    }


  return (
    <div>
      <div className="section">
          <br/>
          <br/>
          <br/>
            <Container>
          
            </Container>
       </div>
    </div>
  );
}

export default DeleteShop;
