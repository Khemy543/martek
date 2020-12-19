import React from "react";
// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import Pagination from "react-js-pagination";
import history from "../history.js";
import Product from "components/Product.js";
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
        axios.get("https://backend-api.martekgh.com/api/category/"+this.props.location.state.category_id+"/products?page="+pageNumber+"")
        .then(res=>{
            console.log(res.data)
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
                    <Card style={{width:"100%", border:"1px solid #eaeaea", margborderRadius:"5px", backgroundColor:"white",boxShadow:"0 2px 12px rgba(0,0,0,0.1)"}} className="card-plain">
                            <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px"}}>
                            <Row style={{borderBottom:"1px solid #eaeaea"}}>
                                <Col sm="12" md="12" lg="12" xl="12" xs="12">
                                <h3 style={{fontWeight:500}} className="category">
                                    <i className="fa fa-gg" style={{color:"#ff8d00"}}/> {this.props.location.state.category_name}
                                    
                                </h3>
                                </Col>
                            </Row>
                                </CardTitle>
                                <CardBody>
                                <Container>
                                    <Row>
                                     {data[0].map((product,index)=>{
                                        return <Product key={product.id} product={product}/>;

                                        })}
                                    </Row>
                                </Container>
                            </CardBody>
    
                            </Card>
            </Row>
            <br/>
            <br/>
            
            <Row>
                <Col md="10" className="ml-auto mr-auto">
                <Pagination
                totalItemsCount={meta&&meta.total}
                activePage={meta&&meta.current_page}
                itemsCountPerPage={meta&&meta.per_page}
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
            <div className="main">
                <div className="section">
                <br/>
               
                <Container>
                <p style={{marginBottom:"10px", fontSize:"13px"}}><span style={{cursor:"pointer"}} onClick={()=>this.props.history.push("/user/home")}>Home</span><i className="fa fa-chevron-right"/> {this.props.location.state.category_name}</p>
                
                <div style={{textAlign:"center"}}>
                <img src={require(`assets/img/categories/${this.props.location.state.image}`)} style={{width:"100%",height:"auto"}}/>
                
                </div>
                {this.state.products !== null && this.state.products.data !== undefined && this.state.products.data[0].length <=0?
                    <Row>
                    <Col md="6" className="ml-auto mr-auto">

                    <h4 style={{fontWeight:500}}>No Products Available</h4>
                    </Col>
                    </Row>
                    :
                <Row style={{marginTop:"30px"}}>
                {products && this.renderProducts()}
                </Row>
                }
                </Container>

                    </div>

                </div>
            </div>
    );
}
}
export default Categories;