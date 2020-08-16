import React from "react";
// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import Pagination from "react-js-pagination";
import history from "../history.js";
//react strap
import{
    Container,
    Row,
    Card,
    CardBody,
    CardTitle,
    Col
    
} from "reactstrap";
import { ProductConsumer } from "../context";
import axios from "axios";

class Categories extends React.Component {
    state={
        isActive:false,
        products:null
    }

    componentDidMount(){
        this.getProducts();
    }

    getProducts(pageNumber=1){
        this.setState({isActive:true});
        axios.get("https://martek.herokuapp.com/api/category/"+this.props.location.state.category_id+"/products?page="+pageNumber+"")
        .then(res=>{
            this.setState({products:res.data});
            this.setState({isActive:false})
        })
        .catch(error=>{
        })
    }

    renderProducts(){
        const {data, meta} = this.state.products;
        return(
            <React.Fragment>
            <Container>
                <Row>
            <ProductConsumer>
            {(value=>(
            data[0].map((product,index)=>(
                <Col lg="3" md="4" sm="6" xs="6" style={{padding:"0px 0px 0px 0px"}} key={index}>
                <Card style={{borderRight:"1px solid #eaeaea", margin:"20px 0px 0px 10px", padding:"10px 20px 20px 10px",boxShadow:"0 2px 12px rgba(0,0,0,0.1)", transition:"all 1s linear", background:'white'}} className="card-plain" id="product-card">
                    <CardTitle style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", padding:"0px 0px 0px 0px",height:"20px"}}>
                        {product.product_name}
                    </CardTitle>
                    <br/>
                    
                            <div>
                            <div style={{textAlign:"center"}} className="first-img" >
                    <div onClick={()=> history.push("/user/product-details",{id:product.id})}>
                    <img alt="#" src={require("../assets/img/iphone.png")} style={{maxHeight:"185.13px", maxWidth:"100px"}} className="to-go"/>
                    <img alt="#" src={require("../assets/img/flatscreen.png")} style={{maxHeight:"185.13px", maxWidth:"100px"}} className="img-top"/>
                    </div>  
                    </div>
                    
                    <br/>
                    
                    <CardBody style={{padding:"0px 0px 0px 0px"}}>
                        <h3 style={{color:"#5588b7", fontSize:"14px", fontWeight:"500", marginRight:"30px"}}> ¢ {product.price}</h3>
                        
                        
                                                            
                        </CardBody>
                            </div>
                    
                    
                    
                    </Card>
            </Col>
            ))
            ))}
            </ProductConsumer>
            </Row>
            <br/>
            <br/>
            
            <Row>
                <Col md="10" className="ml-auto mr-auto">
                <Pagination
                totalItemsCount={meta.total}
                activePage={meta.current_page}
                itemsCountPerPage={meta.per_page}
                onChange={(pageNumber)=>this.getProducts(pageNumber)}
                itemClass="page-item"
                linkClass="page-link"
                firstPageText="First"
                lastPageText = "Last"
                />
                </Col>
                </Row>
                </Container>
            </React.Fragment>
        )
    }
    render(){
        const {products} = this.state;
    return(
        <div>
            <LoadingOverlay 
                active = {this.state.isActive}
                spinner={<BounceLoader color={'#4071e1'}/>}
                >
            <div className="main">
                <div className="section">
                <br/>
               
                <Container>
                <h3 style={{marginBottom:"10px"}}>{this.props.location.state.category_name}</h3>
                <Row>
                {products && this.renderProducts()}
                </Row>
                </Container>

                    </div>

                </div>
                </LoadingOverlay>
            </div>
    );
}
}
export default Categories;