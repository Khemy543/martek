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



function AddProduct(){
  const [categoryList, setCategoryList]=React.useState([]);
  const [product_name, setProduct_name] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState(1);
  const [in_stock] = React.useState(1);
  //const [imageLink, setImageLink] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isActive , setIsAcitve] = React.useState(false);

  let user =1;
  let all_data = JSON.parse(localStorage.getItem('storageData'));

  if(all_data !== null){
    user = all_data[0];
  }



  React.useEffect(()=>{
    
      axios.get("https://martek.herokuapp.com/api/categories")
      .then(res=>{
        const categories = res.data
        setCategoryList(categories);
      })
    },[]);
    
    const handleSubmit = (e) =>{
      e.preventDefault();
       setIsAcitve(true)
    axios.post('https://martek.herokuapp.com/api/e-trader/'+category+'/add-product',{product_name, in_stock, price, description}, {
      headers:{'Authorization':`Bearer ${user}`}
    }).then(res => {
      if(res.data.status === "success"){
        const product_id = res.data.product_id;
        setIsAcitve(false);
        history.push("/user/upload-images",{product_id})
      }
     
    }).catch(error => {
      setIsAcitve(false)
    })
  
  }
  
  
        return(
            <div>
              <LoadingOverlay 
              active = {isActive}
              spinner={<BounceLoader color={'#4071e1'}/>}
              >
                
                
                <div className="main">
                <div className="section">
                <br/>
              
                <Container>
            <Row>
              <Col className="ml-auto mr-auto" md="8">
                
                <Form className="contact-form" onSubmit={handleSubmit}>
                  <Row>
                    <Col md="6">
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
                    <Col md="6">
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
                    <Col md="6">
                    <Label>CATEGORY</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-chart-pie-36" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Category" type="select" value={category} onChange={e => setCategory(e.target.value)}>
                       {categoryList.map(value => <option key={value.id} value={value.id}>{value.category}</option>)}
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
                    <Col className="ml-auto mr-auto" md="6">
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
                </LoadingOverlay>
            </div>
        );
    }

export default AddProduct;