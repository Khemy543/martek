import React from "react";
// reactstrap components
import {
  Card,
  CardBody,
  Container,
  Row,
  CardTitle,
  Col,
  InputGroup, InputGroupAddon, InputGroupText, Table
} from "reactstrap";
// core components
import LoadingOverlay from "react-loading-overlay";
import FadeLoader from "react-spinners/FadeLoader";
import history from "../../history.js";
import { Link } from "react-router-dom";
import axios from 'axios';


let merchandiser = localStorage.getItem('shop_access_token');
function ShopTransactions(props) {
const [transaction,setTransactions] = React.useState([])

React.useEffect(()=>{
    axios.get('https://backend-api.martekgh.com/api/shop/payment/transactions',
    {headers:{'Authorization':`Bearer ${merchandiser}`}})
    .then(res=>{
        console.log(res.data);
        setTransactions(res.data)
    })
    .catch(error=>{
      console.log(error)
    })
},[]) 

  return (
    <>
      <div className="section">
        <Container style={{marginTop:"40px"}}>
        {transaction.length <=0?
        <Row>
          <Col md="6" sm="12" xs="12" lg="6" xl="6" className="ml-auto mr-auto">
            <h4 className="text-center">No Transactions Made</h4>
          </Col>
        </Row>
        :
          <Row>
            <Col md="12" sm="12" xs="12" className="ml-auto mr-auto">
                    <Card className="card-plain" style={{backgroundColor:"white", borderRadius:"5px"}}>
                    <CardTitle style={{padding:"5px 0px 0px 0px", margin:"0px 15px 0px 15px", borderBottom:"1px solid #eaeaea"}}>
                                <h3 style={{fontWeight:500}} className="category">
                                    TRANSACTIONS
                                </h3>
                                </CardTitle>
                        <CardBody style={{margin:"15px", overflowX:"scroll"}}>
                            <Table striped bordered>
                            <thead style={{backgroundColor:"#6ec7e0"}}>
                                <tr>
                                <th>#</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Phone</th>
                                <th>email</th>
                                <th>amount</th>
                                <th>Payment Method</th>
                                <th>status</th>
                                <th>Device IP</th>
                                <th>Reference</th>
                                </tr>
                            </thead>
                            <tbody>
                                {transaction.map((value,key)=>(
                                <tr>
                                <th>{key+1}</th>
                                <td>{value.firstname}</td>
                                <td>{value.lastname}</td>
                                <td>{value.phonenumber}</td>
                                <td>{value.email}</td>
                                <td>{value.amount}</td>
                                {value.momo_payment === '0'?
                                <td>Card</td>:
                                <td>Mobile Money</td>}
                                <td>{value.status}</td>
                                <td>{value.device_ip}</td>
                                <td>{value.txRef}</td>
                                </tr>
                                ))}
                            </tbody>
                            </Table>
                        </CardBody>
                    </Card>
            </Col>
          </Row>
        }
        </Container>
        </div>
    </>
  );
}


export default ShopTransactions;
