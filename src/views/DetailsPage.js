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


import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";

//context
import { ProductConsumer } from "../context";

let user = localStorage.getItem('access_token')

class DetailsPage extends React.Component{
    state={
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
        reportSent:false
    }
    
     toggle = () => this.setState({modal:!this.state.modal});
      
        componentDidMount(){
            this.setState({isActive:true})
            axios.get("https://martek.herokuapp.com/api/product/"+this.props.location.state.id+"/details")
            .then(res=>{
                console.log(res.data);
                this.setState({product:res.data, owner:res.data.product_owner, campus_name:res.data.product_owner.campus,isActive:false})
            })
            .catch(error=>{
            });

            axios.get("https://martek.herokuapp.com/api/product/"+this.props.location.state.id+"/reviews")
            .then(res=>{
                console.log(res.data);
                this.setState({reviews:res.data.product_reviews});
                if(res.data.average_rating !== null){
                    this.setState({average:Math.round(res.data.average_rating)})
                }

            })
            .catch(error=>{
                console.log(error)
            })

        let authenticated = localStorage.getItem('access_token');
        if(authenticated !== null){
         this.setState({loggedin:true});
        }
        else{
            this.setState({loggedin:false});
        }
        }

        postReview=()=>{
            if(this.state.reviewAdd !== "" || this.state.rating !== 0){
            this.setState({isActive:true})
            axios.post("https://martek.herokuapp.com/api/add-product/reviews",
            {
                rating: this.state.rating,
            
                product_id: this.props.location.state.id,
            
                review : this.state.reviewAdd
            },
            { headers:{"Authorization":`Bearer ${user}`}} 
            )
            .then(res=>{
                console.log(res.data);
                if(res.data.status === "saved"){
                    let tempReview = this.state.reviews;
                    tempReview.push({rating:this.state.rating, review:this.state.reviewAdd, user:{name:res.data.name}});
                    this.setState({reviews:tempReview,reviewAdd:"", rating:0,isActive:false})
                }
            })
            .catch(error=>{
                console.log(error)
            })
        }

        
        }

        changeRating=( newRating )=> {
            this.setState({
              rating: newRating
            });
          }


        handlePostReport=()=>{
            axios.post("https://martek.herokuapp.com/api/add-product/report",
            {report:this.state.message, product_id:this.props.location.state.id},
            { headers:{"Authorization":`Bearer ${user}`}})
            .then(res=>{
                console.log(res.data);
                if(res.data.status == "saved"){
                    this.setState({reportSent:true})
                }
            })
            .catch(error=>{
                console.log(error.response.data)
            })
        }

        toggleReportModal=()=>{
            this.setState({reportmodal:!this.state.reportmodal})
        }

        render(){

       const {product_name, price,in_stock,description} = this.state.product;
       const {name ,email,phone,company_name,merchandiser_id} = this.state.owner;
       const {campus} = this.state.campus_name;

        return(
            <div>
                <LoadingOverlay 
                active = {this.state.isActive}
                spinner={<BounceLoader color={'#4071e1'}/>}
                >
                <div className="main">
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
                                                    this.props.history.push("/user/shop-view",{id:merchandiser_id})
                                                }
                                                }}>| {name}  {company_name}
                                            </h4>
                                                </Col>
                                                <Col  md="6" sm="6" xs="6" lg="6">
                                                <StarRatings
                                                rating={this.state.average}
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
                                            <h5 style={{fontSize:"16px", marginTop:"20px"}}>IN STOCK : {in_stock}</h5>
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
                                            
                                            onClick={()=>{value.addToCart(this.props.location.state.id)}}
                                            >
                                           <div><i className="fa fa-cart-plus mr-2"/>Add to cart</div>

                                            
                                            </Button>
                                            }
                                            
                                        
                                        <Button
                                        color="danger"
                                        block
                                        onClick={()=>this.setState({modal:true})}
                                        >
                                            buy now
                                        </Button>
                                        <br/>
                                        <span style={{color:"red", fontSize:"12px", fontWeight:600, cursor:"pointer"}} onClick={()=>this.setState({reportmodal:true})}>REPORT</span>
                                            <Modal isOpen={this.state.modal} toggle={this.toggle}>
                                            <ModalHeader>
                                                    Seller's Information
                                                    </ModalHeader>
                                            <ModalBody>
                                               
                                                <div>
                                                    <h4 style={{fontWeight:500}}>{name}</h4>
                                                    <h4 style={{fontSize:"14px"}}>{phone}</h4>
                                                    <h4 style={{fontSize:"14px"}}>{email}</h4>
                                                    <h4 style={{fontSize:"14px"}}>{campus}</h4>
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
                            
                            <Row style={{ marginTop:"20px"}}>
                            <h4 style={{marginBottom:"20px", marginLeft:"20px"}}>REVIEWS</h4>
                            <Col md="12">
                            {this.state.reviews.length <=0 ?
                            <Row>
                                <Col md="6" className="ml-auto mr-auto">
                                    <h4 style={{textAlign:"center",marginBottom:"10px"}}>No Reviews</h4>
                                </Col>
                            </Row>
                            :
                            <Row>
                            <Col md="6" className="ml-auto mr-auto" style={{maxHeight:"50vh",overflowY:"scroll"}}>
                            {this.state.reviews.map(value=>(
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
                            {this.state.loggedin?
                                <Col md="6" className="mr-auto ml-auto">
                                <InputGroup>
                                <Input placeholder="Add your comment" type="textarea" value={this.state.reviewAdd} onChange={e=>this.setState({reviewAdd:e.target.value})} required/>
                                <InputGroupAddon addonType="append">
                                    <InputGroupText>
                                    <i className="fa fa-paper-plane-o" onClick={()=>this.postReview()} style={{cursor:"pointer"}}/>
                                    </InputGroupText>
                                </InputGroupAddon>
                                </InputGroup>
                                <p style={{marginTop:"5px",marginBottom:"0px"}}>Rate this product</p>
                                <StarRatings
                                    rating={this.state.rating}
                                    starRatedColor="#CFB53B"
                                    changeRating={this.changeRating}
                                    numberOfStars={5}
                                    name='rating'
                                    starDimension="20px"
                                    starSpacing="2px"
                                    />
                                </Col>
                            :
                            <div></div>}
                                
                            </Row>
                            </Col>
                            </Row>
                            
                            
                           
                                    </Container>
                            )}
                        </ProductConsumer>
                        <Modal isOpen={this.state.reportmodal} toggle={()=>this.toggleReportModal()}>
                        <ModalHeader>
                                <h4 style={{fontWeight:"bold",fontSize:"17px", marginTop:"0px"}}>Report Product</h4>
                            </ModalHeader>
                            {!this.state.reportSent?
                            <>
                            <ModalBody>
                            <Row>
                                <Col md="12">
                                <Input type="textarea" placeholder="report message..." value={this.state.message} onChange={(e)=>this.setState({message:e.target.value})}/>

                                </Col>
                            </Row>
                            </ModalBody>
                            <ModalFooter style={{border:"none",marginBottom:"20px", marginRight:"15px"}}>
                                <Button color="info" onClick={()=>this.handlePostReport()}>Report</Button>
                                <Button color="danger" onClick={()=>this.setReportmodal(false)}>Close</Button>
                            </ModalFooter>
                            </>
                            :
                            <>
                            <div style={{textAlign:'center',marginTop:"10px",marginBottom:"10px"}}>
                            <p style={{fontWeight:"bold"}}><i className="fa fa-check mr-1" style={{color:"green", fontSize:"20px"}}/> sent!!</p>
                            <p>Thanks for the report!<br/>Action is being taken, Feedback will be sent soon</p>
                            </div>
                            </>
                            }
                        </Modal>
                        </div>
                    </div>
                    </LoadingOverlay>
                </div>
        );
    }
}

export default DetailsPage;