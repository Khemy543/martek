import React from "react";
import axios from "axios";
// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";
import { Link } from "react-router-dom";

//react strap
import{
    Container,
    Row,
    Col,
   Input,
    Button, InputGroup, InputGroupAddon, InputGroupText,Popover,PopoverBody,PopoverHeader,
    
} from "reactstrap";
//import { ProductConsumer } from "../context";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
//import ShopCard from "../components/ShopCard.js";
import history from "../history.js";

function Profile(){
  const [name, setName] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [campus, setCampus] = React.useState("");
  const [isActive, setIsActive] = React.useState(false);
  const [popoverOpen, setPopoverOpen] = React.useState(false);
  
  
    
  const toggle = () => setPopoverOpen(!popoverOpen);


  let user =null;
  let all_data = JSON.parse(localStorage.getItem('storageData'));
  if(all_data !== null){
    user = all_data[0];
  }
  
  c
  React.useEffect(()=>{
    axios.get("https://martek.herokuapp.com/api/merchandiser/"+res.data.id+"/products"
    )
      .then(response=>{
          setShopProducts(response.data[0]);
          setIsActive(false)
      })
      .catch(error=>{
          console.log(error)
      })
  },[])


    return(
        <div>
          <LoadingOverlay 
            active = {isActive}
            spinner={<BounceLoader color={'#4071e1'}/>}
            >
            <div className="main">
                <div className="section">
                <br/>
                <br/>
                
                      <Container>
             
                </Container>
                
                

                    </div>

                </div>
                </LoadingOverlay>
            </div>
    );
}
export default UserProducts;