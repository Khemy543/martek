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


import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

//context
import { ProductConsumer } from "../context";
import { DesktopWindows } from "@material-ui/icons";
var settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
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
  

let user = localStorage.getItem('access_token');

function DetailsPage(props){
    /* state={
        modal:false,
        product:[],
        owner:"",
        campus_name:"",
        isActive:false,
        reviews:[],
        reviewAdd:"",
        loggedin:false,
        rating:0,
        reportmodal:false,
        average:0,
        message:"",
        tipmodal:false,
        related:[]
    } */

    const [modal, setModal]= React.useState(false);
    const [product, setProduct] = React.useState([]);
    const [owner, setOwner] = React.useState("");
    const [campus_name, setCampus_name] = React.useState("");
    const [isActive, setisActive] = React.useState(false);
    const [reviews, setReviews] = React.useState([]);
    const [reviewAdd, setreviewAdd] = React.useState("");
    const [loggedin, setLoggedin] = React.useState(false);
    const [rating, setRating] = React.useState(0);
    const [reportmodal, setReportmodal] = React.useState(false);
    const [average, setAverage] = React.useState(0);
    const [message, setMessage] = React.useState("");
    const [tipmodal, setTipmodal] = React.useState(false);
    const [related, setRelated] = React.useState([]);
    const [productid, setProductId] = React.useState(props.location.state.id);
   
     const toggle = () => setModal(!modal);
      
     const toggleReportModal = ()=>setReportmodal(!reportmodal)
        React.useEffect(()=>{
            setisActive(true);
            axios.get("https://martek.herokuapp.com/api/product/"+productid+"/details")
            .then(res=>{
                console.log("details",res.data);
                setProduct(res.data);
                setOwner(res.data.product_owner);
                setCampus_name(res.data.product_owner.campus);
                setRelated(res.data.related_product);
                setisActive(false)
            })
            .catch(error=>{
                console.log(error)
            });

            axios.get("https://martek.herokuapp.com/api/product/"+productid+"/reviews")
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
            
        

        const postReview=()=>{
            if(this.state.reviewAdd !== "" || this.state.rating !== 0){
            this.setState({isActive:true})
            axios.post("https://martek.herokuapp.com/api/add-product/reviews",
            {
                rating: rating,
            
                product_id: props.location.state.id,
            
                review : reviewAdd
            },
            { headers:{"Authorization":`Bearer ${user}`}} 
            )
            .then(res=>{
                console.log(res.data);
                if(res.data.status === "saved"){
                    let tempReview = [...reviewAdd];
                    tempReview.push({rating:rating, review:reviewAdd, user:{name:res.data.name}});
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


        const handlePostReport=()=>{
            axios.post("https://martek.herokuapp.com/api/add-product/report",
            {report:message, product_id:props.location.state.id},
            { headers:{"Authorization":`Bearer ${user}`}})
            .then(res=>{
                console.log(res.data);
                if(res.data.status == "saved"){
                    setReportmodal(true)
                }
            })
            .catch(error=>{
                console.log(error)
            })
        }

       const {product_name, price,in_stock,description} = product;
       const {name ,email,phone,company_name,merchandiser_id} = owner;
       const {campus} = campus_name;

        return(
            <div>
                <div>
                    <br/>
                    <br/>
                    <div className="section">
                        <ProductConsumer>
                            {value=>(
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

                                        <h3 className="category" style={{marginTop:"5px", marginLeft:"20px", fontWeight:500}}>
                                            {product_name}
                                        </h3>
                                            <Row>
                                                <Col md="6" sm="6" xs="6" lg="6">
                                                <h4 style={{fontSize:"14px", marginLeft:"20px", marginTop:"3px",cursor:"pointer"}} onClick={()=>{
                                                if(merchandiser_id){
                                                    props.history.push("/user/shop-view",{id:merchandiser_id})
                                                }
                                                }}>| {name}  {company_name}
                                            </h4>
                                                </Col>
                                                <Col  md="6" sm="6" xs="6" lg="6">
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
                                            
                                            <Row>
                                            <Col>
                                            <h4 style={{fontSize:"16px", marginLeft:"20px", fontWeight:"bold", marginTop:"20px"}}>¢ {price}</h4>
                                            </Col>
                                            <Col>
                                            <h5 style={{fontSize:"13px", marginTop:"20px",fontWeight:"bold"}}>IN STOCK : {in_stock}</h5>
                                            </Col>
                                            <Col>
                                            {/* <div style={{marginTop:"20px"}}>
                                            <i className="fa fa-heart-o mr-2" style={{fontWeight:"bold", color:"red"}}/>
                                            <i className="fa fa-share-alt" style={{fontWeight:"bold", color:"blue"}}/>
                                            </div> */}
                                            </Col>
                                            </Row>
                                            {in_stock==0?
                                            <Button
                                            disabled
                                            color="warning"
                                            block
                                            style={{ marginRight:"30px", marginTop:"20px"}}
                                            >out of stock 
                                            </Button>:
                                            <Button
                                            style={{ marginRight:"30px", marginTop:"20px"}}
                                            color="info"
                                            block
                                            
                                            onClick={()=>{value.addToCart(props.location.state.id)}}
                                            >
                                           <div><i className="fa fa-cart-plus mr-2"/>Add to cart</div>

                                            
                                            </Button>
                                            }
                                            
                                        
                                        <Button
                                        color="danger"
                                        block
                                        onClick={()=>{
                                            setModal(true);
                                            setTipmodal(true);
                                        }}>
                                            buy now
                                        </Button>
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
                                            
                                            </Modal>

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
                                </CardTitle>
                                        </Card>
                                        </Col>

                                        </Row>

                                </CardBody>
                               
                            </Card>
                        </Row>
                        <Row style={{backgroundColor:"white", boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px", marginTop:"-15px"}}>
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
                            <Row style={{backgroundColor:"white", boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px", marginTop:"-15px"}}>
                            <Col md="12">
                                <Card className="card-plain">
                                    <CardBody>
                                        <Container>
                                    <Row>
                                        <Col lg="3" md="4" sm="6" xs="6">
                                        <img src={require("../assets/img/iphone.png")} alt="#" style={{maxWidth:"180px", maxHeight:"185.13px"}}/>
                                        </Col>
                                        <Col lg="3" md="4" sm="6" xs="6">
                                        <img src={require("../assets/img/iphone.png")} alt="#" style={{maxWidth:"180px", maxHeight:"185.13px"}}/>
                                        </Col>
                                        <Col lg="3" md="4" sm="6" xs="6">
                                        <img src={require("../assets/img/iphone.png")} alt="#" style={{maxWidth:"180px", maxHeight:"185.13px"}}/>
                                        </Col>
                                        <Col lg="3" md="4" sm="6" xs="6">
                                        <img src={require("../assets/img/iphone.png")} alt="#" style={{maxWidth:"180px", maxHeight:"185.13px"}}/>
                                        </Col>
                                    </Row>
                                    </Container>
                                    </CardBody>
                                    </Card>
                            </Col>
                            </Row>
                            
                            <Row style={{ marginTop:"5px"}}>
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
                                <p style={{fontSize:"10px"}}>{value.date}</p>
                                <p style={{fontWeight:400}}>{value.review}</p>
                                </Col>
                                </Row>
                            ))}
                            </Col>
                            </Row>
                            }
                            <Row>
                            {loggedin?
                                <Col md="6" className="mr-auto ml-auto">
                                <p style={{marginTop:"5px",marginBottom:"0px"}}>Rate this product</p>
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
                                    <i className="fa fa-paper-plane-o" onClick={()=>postReview()} style={{cursor:"pointer"}}/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                </InputGroup>
                                
                                </Col>
                            :
                            <div></div>}
                                
                            </Row>
                            </Col>
                            </Row>
                            

                            <Row style={{marginTop:"20px"}}> 
                        <Card style={{width:"100%", border:"1px solid #eaeaea", borderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                        <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                            <h3 style={{borderBottom:"1px solid #eaeaea", fontWeight:500}} className="category">
                                <i className="fa fa-gg" style={{color:"#ff8d00"}}/> RELATED ITEMS
                                
                                </h3>
                            </CardTitle>
                    
                                <CardBody>
                                    <Container>
                                    <Row>
                                        <Col md="12" style={{padding:"0px 0px 0px 0px"}}>
                                        <Slider {...settings} infinite={related.length>3}>
                                        {related.map((value,key)=>(
                                            <div>
                                                <Col>
                                            <Card className="card-plain" style={{borderRight:"1px solid #eaeaea",margin:"0px 0px 0px 0px", padding:"0px 20px 0px 20px", cursor:"pointer"}}>
                                                <CardTitle style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", padding:"0px 0px 0px 0px"}}>
                                                {value.product_name}
                                                    </CardTitle>
                                                    <br/>
                                                    <div style={{textAlign:"center"}} onClick={() =>{
                                                        props.history.push("/user/product-details",{id:value.id})
                                                        window.location.reload("/")
                                                        }}>
                                                    <img alt="#" src={require("../assets/img/iphone.png")} style={{height:"185.13px", width:"180px"}}/>
                                                    </div>
                                                    <br/>
                                                    <CardBody style={{color:"#5588b7", fontSize:"14px", fontWeight:"500",padding:"0px 0px 0px 0px"}}>¢ {value.price}</CardBody>
                                                </Card>
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


                            {loggedin?
                            <Row style={{backgroundColor:"white", boxShadow:"0 2px 12px rgba(0,0,0,0.1)", borderRadius:"5px",marginTop:"35px"}}>
                            <Col md="10">
                                <Card className="card-plain">
                                    <CardBody>
                                    <Input type="textarea" placeholder="report product..." value={message} onChange={(e)=>setMessage(e.target.value)}/>
                                    </CardBody>
                                    </Card>
                            </Col>

                            <Col md="2">
                            <Button style={{marginTop:"20px", backgroundColor:"transparent", color:"#17a2b8", borderColor:"transparent"}} color="info" onClick={()=>handlePostReport()}>Send Report</Button>
                                    
                            </Col>
                            </Row>
                            :
                            <div></div>
                            }

                        </Container>
                            )}
                        </ProductConsumer>
                        <Modal isOpen={reportmodal} toggle={()=>toggleReportModal()}>
                            <div style={{textAlign:'center',marginTop:"10px",marginBottom:"10px"}}>
                            <p style={{fontWeight:"bold"}}><i className="fa fa-check mr-1" style={{color:"green", fontSize:"20px"}}/> sent!!</p>
                            <p>Thanks for the report!<br/>Action is being taken, Feedback will be sent soon</p>
                            </div>
                        </Modal>
                        </div>
                    </div>
                </div>
        );
    }

export default DetailsPage;