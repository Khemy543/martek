import React from "react";

import axios from "axios";
// core components
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";

//react strap
import{
    Container,
    Row,
    Col,
    Form,  Label, Input,
    Button, InputGroup, InputGroupAddon, InputGroupText, Spinner, FormFeedback
} from "reactstrap";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import history from "../history.js";
import { conforms } from "lodash";
//context
//import { ProductConsumer } from "../context.js";



function AddProduct(props){
  const [categoryList, setCategoryList]=React.useState([]);
  const [product_name, setProduct_name] = React.useState('');
  const [price, setPrice] = React.useState(null);
  const [category, setCategory] = React.useState(1);
  const [in_stock] = React.useState(1);
  //const [imageLink, setImageLink] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isActive , setIsAcitve] = React.useState(false);
  const [error, setError] = React.useState(null);

  let valid = localStorage.getItem('validity');
  if(valid === "false"){
    history.push("/user/add-product-validation")
  }

  React.useEffect(()=>{
      axios.get("https://backend-api.martekgh.com/api/categories")
      .then(res=>{
        const categories = res.data
        setCategoryList(categories);
      })
    },[]);
    
    const handleSubmit = (e) =>{
      e.preventDefault();

      if(typeof(Number(price)) != 'number' || isNaN(Number(price))){
        return setError('Please enter a valid amount !')
      }

      setIsAcitve(true);

    let user = localStorage.getItem('access_token')
    axios.post('https://backend-api.martekgh.com/api/e-trader/'+category+'/add-product',
    {product_name, in_stock, price:parseFloat(price), description}, {
      headers:{'Authorization':`Bearer ${user}`}
    }).then(res => {
      if(res.data.status === "success"){
        const product_id = res.data.product_id;
        setIsAcitve(false);
        history.push("/user/upload-images",{
          product_id, amount:price
        })
      }else{
        if(res.data.status === "Valid ID required"){
          history.push('/user/add-product-validation')
        }
      }
     
    }).catch(error => {
      setIsAcitve(false)
    })
  
  }
  
  
        return(
            <div>
                <div className="main">
                <div className="section">
                <br/>
              
                <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="5">
                
                <Form className="contact-form" onSubmit={handleSubmit}>
                  <Row>
                    <Col>
                    <Label>ITEM NAME</Label>
                      <InputGroup>
                      
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-layout-11" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Item Name" type="text" name="product_name" value={product_name} onChange={e => setProduct_name(e.target.value)} required/>
                      </InputGroup>
                    </Col>
                  </Row>
                  <Row>
                  <Col>
                    <Label>PRICE (GHS)</Label>
                       {/*  <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            GHS
                          </InputGroupText>
                        </InputGroupAddon> */}
                        <Input 
                          invalid={error}
                          placeholder="Price" 
                          type="number" name="price" 
                          value={price} onChange={e => setPrice(e.target.value)} required/>
                        <FormFeedback style={{fontWeight:500}}>{error}</FormFeedback>
                    </Col>
                  </Row>
    
                  <Row>
                    <Col>
                    <Label>CATEGORY</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-chart-pie-36" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Category" type="select" value={category} onChange={e => setCategory(e.target.value)}>
                       {categoryList.map(value => (
                         value.category === "Phones"?
                         <option key={value.id} value={value.id}>Phones And Accessories</option>
                         :
                         <option key={value.id} value={value.id}>{value.category}</option>
                         
                         ))}
                        </Input>
                      </InputGroup>
                    </Col>
                    
                  </Row>
                  
                  
                
                 
                <br/>
                  <Row>
                      <Col md="12">
                  <Input
                    placeholder="Description"
                    type="textarea"
                    rows="4"  
                    value={description} name="description" onChange={e => setDescription(e.target.value)}
                    required
                  />
                  </Col>
                  </Row>

                  <Row>
                    <Col className="ml-auto mr-auto" md="12">
                    {isActive?
                      <Button className="btn-fill" color="info" block disabled>
                        <Spinner size="sm"/>
                      </Button>
                      :
                      <Button className="btn-fill" color="info" block type="submit">
                        Next
                      </Button>
                    }
                    </Col>
                  </Row>
                </Form>
              </Col>
            </Row>
          </Container>
                </div>
                </div>
            </div>
        );
    }

export default AddProduct;