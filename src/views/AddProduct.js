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
    Button, InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import history from "../history.js";
//context
//import { ProductConsumer } from "../context.js";



function AddProduct(props){
  const [categoryList, setCategoryList]=React.useState([]);
  const [product_name, setProduct_name] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState(1);
  const [in_stock] = React.useState(1);
  //const [imageLink, setImageLink] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isActive , setIsAcitve] = React.useState(false);

  let user = localStorage.getItem('access_token')



  React.useEffect(()=>{
    axios.get("https://martek.herokuapp.com/api/auth/user",{
      headers:{ 'Authorization':`Bearer ${user}`}
    })
    .then(res=>{
    console.log(res.data);
    if(res.data.valid_id === null){
      props.history.push('/user/add-product-validation')
    }
    })
      axios.get("https://martek.herokuapp.com/api/categories")
      .then(res=>{
        const categories = res.data
        setCategoryList(categories);
      })
    },[]);
    
    const handleSubmit = (e) =>{
      console.log("....")
      e.preventDefault();
    axios.post('https://martek.herokuapp.com/api/e-trader/'+category+'/add-product',{product_name, in_stock, price, description}, {
      headers:{'Authorization':`Bearer ${user}`}
    }).then(res => {
      console.log(res.data)
      if(res.data.status === "success"){
        const product_id = res.data.product_id;
        setIsAcitve(false);
        history.push("/user/upload-images",{product_id})
      }else{
        if(res.data.status === "Valid ID required"){
          props.history.push('/user/add-product-validation')
        }
      }
     
    }).catch(error => {
      console.log(error)
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
                    <Label>PRICE</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-money-coins" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Price" type="number" name="price" value={price} onChange={e => setPrice(e.target.value)} required/>
                      </InputGroup>
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
                      <Button className="btn-fill" color="info" block type="submit">
                        Next
                      </Button>
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