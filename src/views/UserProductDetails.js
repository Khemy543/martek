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
import ProductCarousel from '../components/ProductCarousel.js'
import StoreIcon from '@material-ui/icons/Store';
import swal from 'sweetalert';

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
    const [productImages, setProductImages] = React.useState([])
    const [productid, setProductId] = React.useState(props.location.state.id);
   
    
    let user = localStorage.getItem("access_token")

    React.useEffect(()=>{
        setIsActive(true);
            let newImageArray = []
            axios.get("https://backend-api.martekgh.com/api/product/"+productid+"/details")
            .then(res=>{
                setProduct(res.data);
                setOwner(res.data.product_owner);
                setCampus_name(res.data.product_owner.campus);
                setProductImages(res.data.product_images)
                setIsActive(false);
                let images = res.data.product_images;
                for(var i=0; i<images.length;i++){
                    newImageArray.push({
                        src: `https://backend-api.martekgh.com/${images[i].path}`,
                        thumbnail: `https://backend-api.martekgh.com/${images[i].path}`,
                    })
                }
                setImages(newImageArray)
            })
            .catch(error=>{
            });

            axios.get("https://backend-api.martekgh.com/api/product/"+productid+"/reviews")
            .then(res=>{
                setReviews(res.data.product_reviews);
                if(res.data.average_rating !== null){
                     setAverage(Math.round(res.data.average_rating))
                }

            })
            .catch(error=>{
            })
        
        },[]);

    const toggle = () => setPopoverOpen(!popoverOpen);

    const handleDelete=()=>{
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover product once deleted!",
            buttons: true,
            dangerMode: true,
            buttons:["Cancel","Yes, Delete Product"]
          }).then(response=>{
            if(response){
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
          })
        
    }



    const {product_name, price, in_stock,description, id} = product;
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
                                        <Col md="6">
                                        <div style={{textAlign:"center"}} >
                                            <ProductCarousel 
                                                images={productImages}
                                            />
                                        </div>
                                        </Col>
                                        <Col md="6">
                                        <Row>
                                            <Col>
                                            <Card className="card-plain" style={{borderRight:"1px solid #eaeaea"}}>
                                        <CardTitle style={{padding:"15px 0px 0px 0px", margin:"10px 15px 15px 15px"}}>

                                        <h1 className="category" style={{marginTop:"5px", fontSize:"25px",  fontWeight:500}}>
                                            {product_name}
                                        </h1>
                                            {merchandiser_id === undefined?
                                                <h4 style={{fontSize:"16px", marginTop:"7px",cursor:"pointer"}} onClick={()=>{
                                                if(merchandiser_id){
                                                    props.history.push("/user/shop-view",{id:merchandiser_id})
                                                }
                                                }}>| {name}
                                                </h4>
                                                :
                                                <h4 style={{fontSize:"14px",  marginTop:"7px",cursor:"pointer"}} onClick={()=>{
                                                if(merchandiser_id){
                                                    props.history.push("/user/shop-view",{id:merchandiser_id})
                                                }
                                                }}>| <StoreIcon style={{marginLeft:'-9px', marginRight:"3px"}}/> {company_name}
                                                </h4>
                                            }
                                            <div style={{ marginTop:"7px"}}>
                                            <StarRatings
                                                rating={average}
                                                starRatedColor="#CFB53B"
                                                numberOfStars={5}
                                                name='rating'
                                                starDimension="15px"
                                                starSpacing="2px"
                                            />
                                            </div>
                                            <h4 style={{fontSize:"16px", fontWeight:"bold", marginTop:"20px"}}>GH¢ {price}</h4>
                                            <div>
                                            <div style={{paddingTop:"0px", borderBottom:"1px solid #F1EAE0"}}>
                                                <h4 style={{fontSize:"14px", fontWeight:500, margin: "30px 0px 5px 0px"}}>DESCRIPTION</h4>
                                            </div>
                                            <div>
                                                <p style={{fontWeight:500, fontSize:"14px", marginTop:"8px", whiteSpace:"pre-line"}}> 
                                                {description}
                                                </p>
                                            </div>
                                            </div>
                                            <br/>
                                            <Row>
                                                <Col md="6">
                                                <Button
                                                    color="info"
                                                    block
                                                    onClick={()=>props.history.push("/user/edit-user-products",{id:props.location.state.id})}
                                                    >
                                                    Edit Product
                                                </Button>
                                                </Col>
                                                <Col md="6">
                                                <Button
                                                    color="danger"
                                                    block
                                                    onClick={handleDelete}
                                                    >
                                                    delete product
                                                </Button>
                                                </Col>
                                            </Row>
                                            <br/>
                                            <Row>
                                            <Col md="12">
                                                {props.location.state.payment_status == "requires payment"?
                                                <Button block onClick={()=>props.history.push('/user/payment/information',{amount:price, product_id:id})}>
                                                    Make Payment
                                                </Button>
                                                :
                                                null}
                                                </Col>
                                            </Row>
                                        
                                        </CardTitle>
                                        </Card>
                                            </Col>
                                        </Row>
                                        <Row>
                                            <Col>
                                            
                                            </Col>
                                        </Row>
                                        </Col>

                                        </Row>

                                </CardBody>
                               
                            </Card>
                        </Row>
                            
                        <Row>
                            <Col md="12" style={{padding:"0px 3px 0px 0px"}}>
                            <Row>
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