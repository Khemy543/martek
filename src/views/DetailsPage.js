import React from "react";

// reactstrap components
import{
    Container,
    Row,
    Col,
    Card,
    CardTitle,
    CardBody,
    Modal,
    ModalBody, ModalHeader, Button,
    InputGroupText,InputGroupAddon,Input,InputGroup,ModalFooter
} from "reactstrap";
import axios from "axios";
import StarRatings from 'react-star-ratings';
import Slider from "react-slick";
import { ProductConsumer } from "../context";
import Gallery from 'react-grid-gallery';
import StoreIcon from '@material-ui/icons/Store';
import ProductCarousel from '../components/ProductCarousel.js'

let user = localStorage.getItem('access_token');


var settings = {
    dots: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay:true,
    responsive:[
        {
          breakpoint:450,
          settings:{
              centerMode:true,
              slidesToShow:1
          }
        }
      ]
  };
  
function DetailsPage(props){

    const [modal, setModal]= React.useState(false);
    const [product, setProduct] = React.useState([]);
    const [owner, setOwner] = React.useState("");
    const [campus_name, setCampus_name] = React.useState("");
    const [isActive, setisActive] = React.useState(false);
    const [reviews, setReviews] = React.useState([]);
    const [reviewAdd, setreviewAdd] = React.useState("");
    const [loggedin, setLoggedin] = React.useState(false);
    const [rating, setRating] = React.useState(0);
    const [average, setAverage] = React.useState(0);
    const [tipmodal, setTipmodal] = React.useState(false);
    const [related, setRelated] = React.useState([]);
    const [images, setImages] = React.useState([]);
    const [first, setFirst] = React.useState(null);
    const [productImages, setProductImages] = React.useState([])
    const [productid, setProductId] = React.useState(props.location.state.id);
   
     const toggle = () => setModal(!modal);

     const styleSmall=()=>{
        return ({
           height:"170px",
           width:"170px",
           cursor:"zoom-in",
           objectFit:"cover"
        });
     }

        React.useEffect(()=>{
            setisActive(true);
            let newImageArray = []
            axios.get("https://backend-api.martekgh.com/api/product/"+productid+"/details")
            .then(res=>{
                console.log("details",res.data);
                setProduct(res.data);
                setOwner(res.data.product_owner);
                setCampus_name(res.data.product_owner.campus);
                setRelated(res.data.related_product);
                setisActive(false);
                setProductImages(res.data.product_images)
                setFirst(res.data.product_images[0].path);
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

        let authenticated = localStorage.getItem('access_token');
        if(authenticated !== null){
         setLoggedin(true)
        }
        else{
            setLoggedin(false)
        }
        },[productid])
       
        const postReview=(e)=>{
            e.preventDefault()
            if(reviewAdd !== "" || rating !== 0){
            axios.post("https://backend-api.martekgh.com/api/add-product/reviews",
            {
                rating: rating,
            
                product_id: props.location.state.id,
            
                review : reviewAdd
            },
            { headers:{"Authorization":`Bearer ${user}`}} 
            )
            .then(res=>{
                console.log(res.data);
                var today = new Date();
                var dd = String(today.getDate()).padStart(2, '0');
                var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
                var yyyy = today.getFullYear();
                var date = yyyy + '-' + mm + '-' + dd;
                if(res.data.status === "saved"){
                    let tempReview = [...reviews];
                    tempReview.push({rating:rating, date:date, review:reviewAdd, user:{name:res.data.name}});
                    console.log(tempReview)
                    setReviews(tempReview);
                    setreviewAdd("");
                    setRating(0);
                    setisActive(false)
                }
            })
            .catch(error=>{
                console.log(error)
            })
        }

        
        }

        const changeRating=( newRating )=> {
            setRating(newRating)
          }

        const Reload=(id)=>{
            props.history.push("/user/product-details",{id:id});
            window.location.reload('/')
        }

       const {product_name, price,in_stock,description, product_images} = product;
       const {name ,email,phone,company_name,merchandiser_id} = owner;
       const {campus} = campus_name;
      
        return(
            <div>
                <div>
                    <br/>
                    <div className="section">
                        <ProductConsumer>
                            {value=>(
                                    <Container>
                                    <Row>
                                <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                            
                                <CardBody sty>
                                    <Row>
                                        <Col md="6">
                                        <div style={{textAlign:"center"}} >
                                            {/* <img alt= "#" src={`https://backend-api.martekgh.com/${first}`} 
                                            style={{width:"200px", height:"200px"}}
                                            /> */}
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
                                                <p style={{fontWeight:500, fontSize:"14px", marginTop:"8px"}}> 
                                                {description}
                                                </p>
                                            </div>
                                            </div>
                                            {/* <Row>
                                            <Col>
                                            </Col>
                                            <Col>
                                            <h5 style={{fontSize:"13px", marginTop:"20px",fontWeight:"bold"}}>IN STOCK : {in_stock}</h5>
                                            </Col>
                                            </Row> */}
                                            <br/>
                                            <Row>
                                                <Col>
                                                {in_stock==0?
                                                <Button disabled color="warning" block
                                                    style={{  marginTop:"20px"}}
                                                >out of stock 
                                                </Button>:
                                                <Button
                                                    color="info"
                                                    block
                                                    onClick={()=>{value.addToCart(product)}}>
                                            <   div>Add to cart</div>
                                                </Button>}
                                                </Col>
                                                <Col>
                                                <Button color="danger" block
                                                    onClick={()=>{
                                                        setModal(true);
                                                        setTipmodal(true);
                                                    }}>
                                                    buy now
                                                </Button>
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
                                        {/* <Col md="4">
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
                                        </Col> */}

                                        </Row>

                                </CardBody>
                               
                            </Card>
                        </Row>
                        
                        {/* discription, review, images */}
                        <Row>
                            {/* discription and review */}
                            <Col md="12" style={{padding:"0px 3px 0px 0px"}}>
                            <Row>
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
                                {/* <Col md="3" sm="3" xs="3" lg="3" className="ml-auto mr-auto">
                                <div className="avatar">
                                <img
                                    alt="#"
                                    className="img-circle img-no-padding img-responsive"
                                    src={require("../assets/img/new_logo.png")}
                                    style={{border:"1px solid #eaeaea"}}
                                />
                                </div>
                                </Col> */}
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
                            <Row style={{marginTop:"10px"}}>
                            {loggedin?
                                <Col md="12" className="mr-auto ml-auto">
                                <form  onSubmit={postReview}>
                                <p style={{marginTop:"5px",marginBottom:"0px", fontWeight:500}}>Rate this product</p>
                                <StarRatings
                                    rating={rating}
                                    starRatedColor="#CFB53B"
                                    changeRating={changeRating}
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="20px"
                                    starSpacing="2px"
                                    />
                                <InputGroup style={{marginTop:"10px"}}>
                                <Input placeholder="Add your comment" type="textarea" value={reviewAdd} onChange={e=>setreviewAdd(e.target.value)} required/>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                        <Button type="submit"><i className="fa fa-paper-plane-o" style={{cursor:"pointer"}}/></Button>
                                    </InputGroupText>
                                </InputGroupAddon>
                                </InputGroup>
                                </form>
                                
                                </Col>
                            :
                            <div></div>}
                                
                            </Row>
                            </Col>
                                </CardBody>
                            </Card>
                            </Col>
                            </Row>
                                </Col>
                            </Row>
                            </Col>
                            {/* images */}
                           {/*  <Col md="4" style={{padding:"0px 0px 0px 3px"}}>
                                <Card className="card-plain" style={{backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px"}}>
                                    <CardTitle style={{paddingTop:"0px", borderBottom:"1px solid #F1EAE0"}}>
                                        <h4 style={{fontSize:"18px", fontWeight:500, margin: "30px 10px 5px"}}>IMAGES</h4>
                                        </CardTitle>
                                    <CardBody style={{
                                        margin:"auto",
                                        width:"99%",
                                        padding:"10px"
                                    }}>
                                    <Gallery 
                                        images={images}
                                        backdropClosesModal={true}
                                        enableImageSelection={false}
                                        thumbnailStyle={styleSmall}
                                        rowHeight={170}
                                    />
                                    </CardBody>
                                    </Card>
                            </Col> */}
                            
                            </Row>

                            {/* related items */}
                            <Row style={{marginTop:"-15px"}}> 
                        <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                        <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px", borderBottom:"1px solid #eaeaea"}}>
                            <h4 style={{fontSize:"18px", fontWeight:500, margin: "30px 10px 5px"}} >
                                RELATED ITEMS
                                </h4>
                            </CardTitle>
                            <CardBody>
                                    <Container>
                                    <Row>
                                        <Col md="12" style={{padding:"0px 0px 0px 0px"}}>
                                        <Slider {...settings} infinite={related.length>5}>
                                        {related.map((value,key)=>(
                                            <div key={key}>
                                                <Col style={{padding:"0px 3px 0px 3px", cursor:"pointer"}}>
                                                <div style={{textAlign:"center"}}>
                                                    <div style={{textAlign:"center"}} onClick={() => Reload(value.id)}>
                                                    <img alt="#" src={`https://backend-api.martekgh.com/${value.product_image[0].path}`} style={{height:"185.13px", width:"180px", borderRadius:'5px',objectFit:"cover"}}/>
                                                    </div>
                                                    <h3 style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", textAlign:"left"}}>
                                                    {value.product_name}
                                                    </h3>
                                                    <h3 style={{color:"#5588b7", fontSize:"14px", fontWeight:600, textAlign:"left", marginTop:"3px"}}>GH¢ {value.price}</h3>
                                                </div>
                                                </Col>
                                            </div>
                                            ))}
                                        </Slider>
                                        
                                        </Col>
                                        </Row>
                                        </Container>
                                    </CardBody>
    
                            </Card>
                            </Row>

                        </Container>
                            )}
                        </ProductConsumer>
                        </div>
                    </div>

                    {/* user info modal */}
                    <Modal isOpen={modal} toggle={toggle}>
                    <ModalHeader>
                            Seller's Information
                            </ModalHeader>
                    <ModalBody>
                        
                        <div>
                            <h4 style={{fontWeight:500, marginBottom:"-12px"}}>{name || company_name}</h4>
                            <h4 style={{fontSize:"14px", marginBottom:"-12px"}}>{phone}</h4>
                            <h4 style={{fontSize:"14px", marginBottom:"-12px"}}>{email}</h4>
                            <h4 style={{fontSize:"14px", marginBottom:"-12px"}}>{campus}</h4>
                        </div>
                        <br/>
                        <br/>
                        <Row>
                            <Col lg="4" md="4" sm="4" xs="4">
                        <a href={`tel:${phone}`} style={{marginRight:"20px"}}><Button color="info" block><i className="fa fa-phone fa-2x"/></Button></a> 
                            </Col>
                            <Col lg="4" md="4" sm="4" xs="4">
                        <a href={`mailto:${email}`} style={{marginRight:"20px"}}><Button color="danger" block><i className="fa fa-envelope fa-2x"/></Button></a>
                            </Col>
                            <Col lg="4" md="4" sm="4" xs="">
                        <a href={`https://wa.me/${phone}`} target="_blank"  rel="noopener noreferrer" style={{marginRight:"20px"}}><Button color="success" block><i className="fa fa-whatsapp fa-2x"/></Button></a>
                            </Col>
                        </Row>
                    </ModalBody>

                    {/* buying tips */}
                    <Modal isOpen={tipmodal}>
                        <ModalHeader>
                            <h4 style={{fontWeight:500, fontSize:"17px"}}>Tips</h4>    
                        </ModalHeader>
                        <ModalBody style={{fontWeight:400}}>
                            1. Ensure to meet a campus seller in person, check the item(s) and make sure you are satisfied with the product.<br/>
                            2. Make payments only on delivery.<br/>
                            3. Avoid deals that are too good to be true; unrealistically low prices inclusive.<br/>
                            4. Never give out personal Information.<br/>
                            (This includes bank details, and any other information which could be misused).<br/><br/>
                            <Button color="danger" onClick={()=>setTipmodal(false)}>Close</Button>
                        </ModalBody>
                    </Modal>
                    </Modal>
                </div>
        );
    }

export default DetailsPage;