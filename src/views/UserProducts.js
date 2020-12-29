import React from "react";
import axios from "axios";

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
import UserProduct from "components/UserProduct.js";

function UserProducts(props){
  const [isActive, setIsActive] = React.useState(false);
  const [products, setProducts] = React.useState([]);
 
  let user = localStorage.getItem('access_token')
  React.useEffect(()=>{
    axios.get("https://backend-api.martekgh.com/api/e-trader/get-user-products",{
      headers:{"Authorization":`Bearer ${user}`}
  }).then(res=>{
          console.log(res.data)
          setProducts(res.data);
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
                
                <Container style={{marginTop:"20px"}}>
                <p style={{marginBottom:"10px", fontSize:"13px"}}><span style={{cursor:"pointer"}} onClick={()=>props.history.push("/user/home")}>Home</span><i className="fa fa-chevron-right"/> user products</p>
                  <Row style={{marginTop:"50px"}}>
                  <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                            <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px", borderBottom:"1px solid #eaeaea"}}>
                                <h3 style={{fontWeight:500}} className="category">
                                    <i className="fa fa-gg" style={{color:"#ff8d00"}}/> PRODUCTS
                                </h3>
                                </CardTitle>
                                <CardBody>
                                    <Container>
                                        <Row>
                                        {products.map((product)=>(
                                            <UserProduct key={product.id} product={product}/>
                                        ))}
                                        </Row>
                                </Container>
                                </CardBody>
                            </Card>
                  </Row>
                </Container>
                    </div>

                </div>
                </LoadingOverlay>
            </div>
    );
}
export default UserProducts;