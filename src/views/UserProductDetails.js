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
import Gallery from 'react-grid-gallery';
import StarRatings from 'react-star-ratings';

//context
import { ProductConsumer } from "../context";

function UserProductDetails(props){
    const [popoverOpen, setPopoverOpen] = React.useState(false);
    const [campus_name, setCampus_name] = React.useState("");
    const [product, setProduct] = React.useState([]);
    const [owner ,setOwner] = React.useState([]);
    const [isActive, setIsActive] = React.useState(false);
    const [reviews,setReviews] = React.useState([]);
    const [average,setAverage] = React.useState(0);
    const [images, setImages] = React.useState([]);
    const [first, setFirst] = React.useState(null)
    const [productid, setProductId] = React.useState(props.location.state.id);
   
    
    let user = localStorage.getItem("access_token")

    React.useEffect(()=>{
        setIsActive(true);
            let newImageArray = []
            axios.get("https://backend-api.martekgh.com/api/product/"+productid+"/details")
            .then(res=>{
                console.log("details",res.data);
                setProduct(res.data);
                setOwner(res.data.product_owner);
                setCampus_name(res.data.product_owner.campus);
                setIsActive(false);
                setFirst(res.data.product_images[0].path);
                let images = res.data.product_images;
                for(var i=1; i<images.length;i++){
                    newImageArray.push({
                        src: `https://backend-api.martekgh.com/${images[i].path}`,
                        thumbnail: `https://backend-api.martekgh.com/${images[i].path}`,
                        thumbnailWidth: 180,
                        thumbnailHeight: 180,
                    })
                }
                setImages(newImageArray)
            })
            .catch(error=>{
                console.log(error)
            });

            axios.get("https://backend-api.martekgh.com/api/product/"+productid+"/reviews")
            .then(res=>{
                console.log(res.data);
                setReviews(res.data.product_reviews);
                if(res.data.average_rating !== null){
                     setAverage(Math.round(res.data.average_rating))
                }

            })
            .catch(error=>{
                console.log(error)
            })
        
        },[]);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const handleDelete=()=>{
        setIsActive(true)
        axios.delete("https://backend-api.martekgh.com/api/e-trader/product/"+props.location.state.id+"/delete",{
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
    const {name ,email,phone,company_name,merchandiser_id} = owner;
    const {campus} = campus_name;
    

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
                                        <Col md="4">
                                        <div style={{textAlign:"center", marginTop:"30px"}} >
                                            <img alt= "#" src={`https://backend-api.martekgh.com/${first}`} 
                                            style={{width:"200px", height:"200px"}}
                                            />
                                        </div>
                                        </Col>
                                        <Col md="4">
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
                                        <Col md="4">
                                            <Card className="card-plain">
                                            <CardTitle style={{padding:"0px 0px 0px 0px", margin:"0px 15px 15px 15px"}}>
                                                <h4 style={{fontSize:"18px", fontWeight:500, }}>SELLER INFORMATION</h4>
                                                </CardTitle>
                                            <CardBody>
                                            <div style={{ margin:"10px"}}>
                                                <h4 style={{fontWeight:500, fontSize:"16px", margin:"10px 0px"}}>{name || company_name}</h4>
                                                <h4 style={{fontWeight:500,fontSize:"14px", margin:"10px 0px"}}>{phone}</h4>
                                                <h4 style={{fontWeight:500,fontSize:"14px", margin:"10px 0px"}}>{email}</h4>
                                                <h4 style={{fontWeight:500,fontSize:"14px", margin:"10px 0px"}}>{campus}</h4>
                                            </div>
                                            </CardBody>
                                            </Card>
                                        </Col>

                                        </Row>

                                </CardBody>
                               
                            </Card>
                        </Row>
                            
                        {/* discription, review, images */}
                        <Row style={{ marginTop:"-15px"}}>
                            {/* discription and review */}
                            <Col md="8" style={{padding:"0px 3px 0px 0px"}}>
                            <Row>
                                <Col md="12">
                                <Card className="card-plain" style={{backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px"}}>
                                    <CardTitle style={{paddingTop:"0px", borderBottom:"1px solid #F1EAE0"}}>
                                        <h4 style={{fontSize:"18px", fontWeight:500, margin: "30px 10px 5px"}}>DESCRIPTION</h4>
                                        </CardTitle>
                                    <CardBody>
                                        <p style={{fontWeight:500, fontSize:"14px", margin:"10px"}}> 
                                        {description}
                                        </p>
                                        </CardBody>
                                    </Card>

                                </Col>
                                {/* reviews start */}
                                <Col md="12">
                                <Row style={{marginTop:"-15px"}}>
                                    <Col md="12">
                                    <Card className="card-plain" style={{backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px"}}>
                                        <CardTitle style={{paddingTop:"0px", borderBottom:"1px solid #F1EAE0"}}>
                                    <h4 style={{fontSize:"18px", fontWeight:500, margin: "30px 10px 5px"}}>CUSTOMER FEEDBACK</h4>   
                                </CardTitle>
                                <CardBody>
                                    
                                        
                            <Col md="12">
                            {reviews.length <=0 ?
                            <Row>
                                <Col md="10" className="ml-auto mr-auto">
                                    <h4 style={{textAlign:"center",marginBottom:"10px"}}>No Reviews</h4>
                                </Col>
                            </Row>
                            :
                            <Row>
                            <Col md="12" className="ml-auto mr-auto" style={{maxHeight:"35vh", overflowY:"scroll", borderBottom:"1px solid #F1EAE0"}}>
                            {reviews.map(value=>(
                                <Row style={{marginBottom:"10px"}}>
                                <Col md="12" sm="12" xs="12" lg="12" style={{textAlign:"left"}}>
                                <h5 style={{marginTop:"0px", fontSize:"16px", fontWeight:500, marginBottom:"-4px"}}>{value.review}</h5>
                                <StarRatings
                                    rating={value.rating}
                                    starRatedColor="#D4AF37"
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="15px"
                                    starSpacing="2px"
                                    />
                                <p style={{fontSize:"11px",fontWeight:400}}>{value.date} by {value.user.name}</p>
                                </Col>
                                </Row>
                            ))}
                            </Col>
                            </Row>
                            }
                            </Col>
                                </CardBody>
                            </Card>
                            </Col>
                            </Row>
                                </Col>
                            </Row>
                            </Col>
                            {/* images */}
                            <Col md="4" style={{padding:"0px 0px 0px 3px"}}>
                                <Card className="card-plain" style={{backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px"}}>
                                    <CardTitle style={{paddingTop:"0px", borderBottom:"1px solid #F1EAE0"}}>
                                        <h4 style={{fontSize:"18px", fontWeight:500, margin: "30px 10px 5px"}}>IMAGES</h4>
                                        </CardTitle>
                                    <CardBody>
                                    <Gallery images={images}/>
                                    </CardBody>
                                    </Card>
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