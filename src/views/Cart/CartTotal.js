import React from "react";
import { Link } from "react-router-dom";

//import reactstrap
import{
    Container,
    Col,
    Row,
    Button
} from "reactstrap";


export default function CartTotal({value}){
    const  { cartTotal, clearCart } = value;
    return(
    
            <React.Fragment>
            <Container>
                <Row style={{float:"right", marginTop:"30px"}}>
                    <Col>
                        <h5>
                            <span className="text-title" style={{fontSize:"14px"}}>
                                Total :
                            </span>
                             <strong style={{fontSize:"17px", fontWeight:600, marginLeft:"20px"}}>¢ {cartTotal}</strong>
                        </h5>
                        <Link to="#">
                        <Button onClick={()=>clearCart()}
                        color="danger"
                        block   
                        >
                            Clear Cart
                        </Button>
                        </Link>
                        <br/>
                        {/* <h5 style={{marginTop:"20px"}}>
                            <span className="text-title">
                                Subtotal :
                            </span>
                        <strong>¢ {cartSubTotal}</strong>
                        </h5>

                        <h5>
                            <span className="text-title">
                                Tax :
                            </span>
                        <strong>¢ {cartTax}</strong>
                        </h5> */}
                    </Col>

                </Row>
            </Container>
            </React.Fragment>
        
    );
}