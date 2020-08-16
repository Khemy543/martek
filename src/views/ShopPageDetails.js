import React from "react";

// reactstrap components
import{
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardBody,
    Button,Popover,PopoverBody,PopoverHeader
} from "reactstrap";

// core components
import ExamplesNavbar from "../components/Navbars/ExamplesNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";
import Product from "../components/Product.js";
import axios from 'axios';
//import history from "../history.js";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

//context
import { ProductConsumer } from "../context";
let user =null;

function ShopDetailsPage(props){
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [product, setProduct] = React.useState([]);
    const [owner ,setOwner] = React.useState([]);
    const [isActive, setIsActive] = React.useState(false);
    

    React.useEffect(()=>{
        let all_data = JSON.parse(localStorage.getItem('ShopData'));
        if(all_data !== null){
          user = all_data[0];
        }
          setIsActive(true);
          axios.get("https://martek.herokuapp.com/api/product/"+props.location.state.id+"/details")
          .then(res=>{
              console.log(res.data);
              setProduct(res.data);
              setOwner(res.data.product_owner);
              setIsActive(false)
          })
          .catch(error=>{
          })},[props.location.state.id]);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const handleDelete=()=>{
        setIsActive(true)
        axios.delete("https://martek.herokuapp.com/api/e-trader/product/"+props.location.state.id+"/delete",{
            headers:{"Authorization":`Bearer ${user}`}
        })
        .then(res=>{
            props.history.push("/shop/shop-page");
            setIsActive(false)
        })
        .catch(error=>{
            setIsActive(false)
        })
    }



    const {product_name, price, in_stock,description} = product;
    const {company_name} = owner;
    

        return(
            <div>
                 <LoadingOverlay 
                        active = {isActive}
                        spinner={<BounceLoader color={'#4071e1'}/>}
                        >
                <div className="main">
                    <br/>
                    <br/>
                    <div className="section">
                    
                        <ProductConsumer>

                            {value =>(
                                    <Container>
                                    <Row>
                        <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                            
                                <CardBody>
                                    <Row>
                                        <Col md="7">
                                        <Card className="card-plain" style={{borderRight:"1px solid #eaeaea"}}>
                                        <div style={{textAlign:"center"}}>
                                            <img alt= "#" src={require("../assets/img/iphone.png")} 
                                            style={{maxWidth:"180px", height:"185.13px"}}
                                            />
                                        </div>
                                        </Card>
                                        </Col>
                                        <Col md="5">
                                        <Card className="card-plain" style={{borderRight:"1px solid #eaeaea"}}>
                                        <CardTitle style={{padding:"15px 0px 0px 0px", margin:"10px 15px 15px 15px"}}>
                                        <h3 className="category" style={{marginTop:"5px", marginLeft:"20px"}}>
                                            {product_name}
                                            </h3>
                                            <h4 style={{fontSize:"14px", marginLeft:"20px", marginTop:"3px"}}>{company_name} | share</h4>
                                            <h4 style={{fontSize:"16px", marginLeft:"20px", fontWeight:"bold", marginTop:"20px"}}>¢ {price}</h4>
                                            <h4 style={{fontSize:"16px", marginLeft:"20px", fontWeight:"bold", marginTop:"20px"}}>in stock : {in_stock}</h4>
                                            {/* <div style={{float:'right', marginTop:"-15px", marginRight:"40%"}}>
                                            <i className="fa fa-heart-o mr-2" style={{fontWeight:"bold", color:"red"}}/>
                                            <i className="fa fa-share-alt" style={{fontWeight:"bold", color:"blue"}}/>
                                            </div> */}
                                            <Button
                                            style={{ marginRight:"30px", marginTop:"20px"}}
                                            color="info"
                                            block
                                            onClick={()=>props.history.push("/shop/edit-product",{id:props.location.state.id})}
                                            
                                            >
                                           Edit Product

                                            
                                        </Button>
                                        
                                        <Button
                                        color="danger"
                                        block
                                        id="Popover1"
                                        >
                                            delete product
                                            </Button>
                                            <Popover placement="bottom" isOpen={popoverOpen} target="Popover1" toggle={toggle}>
                                            <PopoverHeader>Do you want to delete?</PopoverHeader>
                                            <br/>
                                            <PopoverBody><Button color="danger" onClick={handleDelete}>yes</Button> <Button color="info" onClick={toggle} style={{marginLeft:"15px"}}>no</Button></PopoverBody>
                                        </Popover>
                                </CardTitle>
                                        </Card>
                                        </Col>

                                        </Row>

                                </CardBody>
                               
                            </Card>
                        </Row>
                        <Row style={{backgroundColor:"white", boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px"}}>
                            <Col md="12">
                                <Card className="card-plain">
                                    <CardTitle>
                                        <h4 style={{fontSize:"18px"}}>DESCRIPTION</h4>
                                        </CardTitle>
                                    <CardBody>
                                        <p> 
                                            {description}
                                        </p>
                                        </CardBody>
                                    </Card>
                            </Col>
                            </Row>
                            <br/>
                            <Row style={{backgroundColor:"white", boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px"}}>
                            <Col md="12">
                                <Card className="card-plain">
                                    <CardBody>
                                    <div style={{textAlign:"center"}}>
                                        <img src={require("../assets/img/iphone.png")} alt="#" style={{maxWidth:"180px", maxHeight:"185.13px"}}/>
                                        <img src={require("../assets/img/iphone.png")} alt="#" style={{maxWidth:"180px", maxHeight:"185.13px"}}/>
                                        <img src={require("../assets/img/iphone.png")} alt="#" style={{maxWidth:"180px", maxHeight:"185.13px"}}/>
                                        <img src={require("../assets/img/iphone.png")} alt="#" style={{maxWidth:"180px", maxHeight:"185.13px"}}/>
                                    </div>
                                    </CardBody>
                                    </Card>
                            </Col>
                            </Row>
                            <Row style={{backgroundColor:"white", boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px", marginTop:"20px"}}>
                            <Col md="12">
                                <Card className="card-plain">
                                    <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                                        <h4 style={{fontSize:"18px"}}>RELATED ITEMS</h4>
                                        </CardTitle>
                                    <CardBody>
                                    <Row>
                                    <ProductConsumer>
                                        {
                                            value => {
                                                return value.products.map(product => {
                                                    return <Product key={product.id} product={product}/>;
                                                })
                                            }
                                        }
                                        </ProductConsumer>
                                        </Row>
                                        </CardBody>
                                    </Card>
                            </Col>
                            </Row>
                                    </Container>

                                )}
                        </ProductConsumer>

                        
                        </div>
                    </div>
                    </LoadingOverlay>
                </div>
        );
    
}
export default ShopDetailsPage;