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
    Col,Card, CardBody,CardTitle
    
} from "reactstrap";
//import { ProductConsumer } from "../context";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import history from "../history.js";

function UserProducts(){
  const [isActive, setIsActive] = React.useState(false);
  const [products, setProducts] = React.useState([]);
 
  let user = localStorage.getItem('access_token')
  React.useEffect(()=>{
    axios.get("https://martek.herokuapp.com/api/e-trader/get-user-products",{
      headers:{"Authorization":`Bearer ${user}`}
  }).then(res=>{
          console.log(res.data)
          setProducts(res.data);
          setIsActive(false)
      })
      .catch(error=>{
          console.log(error.response.data)
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
                  <Row>
                  {products.map((value,key)=>(
                  <Col lg="3" md="4" sm="6" xs="6">
                  <Card className="card-plain" style={{borderRight:"1px solid #eaeaea",margin:"10px 0px 0px 0px", padding:"0px 0px 0px 0px",cursor:"pointer"}}>
                    <CardTitle style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", padding:"0px 0px 0px 0px"}}>
                        {value.product_name}
                        </CardTitle>
                        <br/>
                        
                        <div style={{textAlign:"center"}} onClick={()=>history.push("/user/user-product-details",{id:value.id})}>
                        <img alt="#" src={require("../assets/img/iphone.png")} style={{ maxHeight:"185.13px",maxWidth:"100px"}}/>
                        </div>
                        
                        <br/>
                        <CardBody style={{color:"#5588b7", fontSize:"14px", fontWeight:"500",padding:"0px 0px 0px 0px"}}>¢ {value.price}</CardBody>
                    </Card>
                    </Col>
                    ))}
                  </Row>
                </Container>
                    </div>

                </div>
                </LoadingOverlay>
            </div>
    );
}
export default UserProducts;