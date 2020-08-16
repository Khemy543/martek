import React from "react";
import { Link } from "react-router-dom";


//import reactstrap
import{
    Container,
    Col,
    Row,
    Card,
    CardBody,
    CardTitle
} from "reactstrap";


export default function PageNotFound(){
    return(
    
            <div>
                
                
                <div className="main">
            <div className="section" style={{height:"100vh"}}>
            <Container className="centered">
                <Row>
             <Col md="6" lg="6" sm="12" xs="12" style={{marginLeft:"50%", marginTop:"15%",transform:"translate(-50%,-50%)"}}>
                    <Card className="card-plain" style={{backgroundColor:"white", borderRadius:"5px"}}>
                        <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 30px 0px 15px"}}>
                            <h3 
                            style={{borderBottom:"1px solid #eaeaea", fontWeight:"bold"}}>
                            404</h3>
                        </CardTitle>
                        <CardBody>
                            <h5 style={{marginLeft:"12px"}}>
                                OOPS!!<br/>
                                SORRY PAGE NOT FOUND</h5>
                                <Link to="/user/home"><p style={{color:"#00adfffa", float:"right"}}><i className="fa fa-chevron-left"/> GO BACK</p></Link>
                        </CardBody>
                    </Card>
                </Col>    
               </Row>
                </Container>
                </div>
                </div>
            </div>
        
    );
}