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
import axios from 'axios';
//import history from "../history.js";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import StarRatings from 'react-star-ratings';

//context
import { ProductConsumer } from "../context";

function UserProductDetails(props){
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [product, setProduct] = React.useState([]);
    const [owner ,setOwner] = React.useState([]);
    const [isActive, setIsActive] = React.useState(false);
    const [reviews,setReviews] = React.useState([]);
    const [average,setAverage] = React.useState(0);
    
    
    let user = localStorage.getItem("access_token")

    React.useEffect(()=>{
        console.log(props)
          setIsActive(true);
          axios.get("http://backend-api.martekgh.com/api/product/"+props.location.state.id+"/details")
          .then(res=>{
              console.log(res.data);
              setProduct(res.data);
              setOwner(res.data.product_owner);
              setIsActive(false)
          })
          .catch(error=>{
          });


          axios.get("http://backend-api.martekgh.com/api/product/"+props.location.state.id+"/reviews")
            .then(res=>{
                console.log(res.data);
                setReviews(res.data.product_reviews);
                setAverage(Math.round(res.data.average_rating))

            })
            .catch(error=>{
                console.log(error)
            })
        
        },[]);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const handleDelete=()=>{
        setIsActive(true)
        axios.delete("http://backend-api.martekgh.com/api/e-trader/product/"+props.location.state.id+"/delete",{
            headers:{"Authorization":`Bearer ${user}`}
        })
        .then(res=>{
            props.history.push("/user/user-products");
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
                                        <Row>
                                            <Col>
                                            <h4 style={{fontSize:"14px", marginLeft:"20px", marginTop:"3px"}}>{company_name} | share</h4>
                                            <h4 style={{fontSize:"16px", marginLeft:"20px", fontWeight:"bold", marginTop:"20px"}}>¢ {price}</h4>
                                            <h4 style={{fontSize:"16px", marginLeft:"20px", fontWeight:"bold", marginTop:"20px"}}>in stock : {in_stock}</h4>
                                            {/* <div style={{float:'right', marginTop:"-15px", marginRight:"40%"}}>
                                            <i className="fa fa-heart-o mr-2" style={{fontWeight:"bold", color:"red"}}/>
                                            <i className="fa fa-share-alt" style={{fontWeight:"bold", color:"blue"}}/>
                                            </div> */}
                                            </Col>
                                            <Col  md="6" sm="6" xs="6" lg="6" className="mt-5">
                                                <StarRatings
                                                rating={average}
                                                starRatedColor="#CFB53B"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension="20px"
                                                starSpacing="2px"
                                                />
                                                </Col>
                                        </Row>
                                           
                                            <Button
                                            style={{ marginRight:"30px", marginTop:"20px"}}
                                            color="info"
                                            block
                                            onClick={()=>props.history.push("/user/edit-user-products",{id:props.location.state.id})}
                                            
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

                            <Row style={{ marginTop:"20px"}}>
                            <h4 style={{marginBottom:"20px", marginLeft:"20px"}}>REVIEWS</h4>
                            <Col md="12">
                            {reviews.length <=0 ?
                            <Row>
                                <Col md="6" className="ml-auto mr-auto">
                                    <h4 style={{textAlign:"center",marginBottom:"10px"}}>No Reviews</h4>
                                </Col>
                            </Row>
                            :
                            <Row>
                            <Col md="6" className="ml-auto mr-auto" style={{maxHeight:"50vh",overflowY:"scroll"}}>
                            {reviews.map(value=>(
                                <Row style={{borderBottom:"1px solid #F1EAE0",marginBottom:"10px"}}>
                                <Col md="3" sm="3" xs="3" lg="3" className="ml-auto mr-auto">
                                <div className="avatar">
                                <img
                                    alt="#"
                                    className="img-circle img-no-padding img-responsive"
                                    src={require("../assets/img/new_logo.png")}
                                    style={{border:"1px solid #eaeaea"}}
                                />
                                </div>
                                </Col>
                                <Col md="9" sm="9" xs="9" lg="9" style={{textAlign:"left"}}>
                                <h5 style={{marginTop:"0px", fontWeight:"bold", marginBottom:"-4px"}}>{value.user.name}</h5>
                                <StarRatings
                                    rating={value.rating}
                                    starRatedColor="#D4AF37"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="15px"
                                    starSpacing="2px"
                                    />
                                <p style={{fontSize:"10px"}}>08/15/2020</p>
                                <p style={{fontWeight:400}}>{value.review}</p>
                                </Col>
                                </Row>
                            ))}
                            </Col>
                            </Row>
                            }
                            </Col>
                            </Row>
                            
                            </Container>

                                )}
                        </ProductConsumer>

                        
                        </div>
                    </div>
                </div>
        );
    
}
export default UserProductDetails;