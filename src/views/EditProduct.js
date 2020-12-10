import React from "react";


// core components
import ExamplesNavbar from "../components/Navbars/ExamplesNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";

//react strap
import{
    Container,
    Row,
    Col,
    Form,Label, Input,
    Button, InputGroup, InputGroupAddon, InputGroupText
} from "reactstrap";
import axios from "axios";
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
//import history from "../history.js";
//context
//import { ProductConsumer } from "../context.js";

function EditProduct(props) {
  const [categoryList, setCategoryList]=React.useState([]);
  const [product_name, setProduct_name] = React.useState('');
  const [price, setPrice] = React.useState('');
  const [category, setCategory] = React.useState(1);
  const [in_stock, setIn_stock] = React.useState('');
  const [description, setDescription] = React.useState('');
  const [isActive, setIsActive] = React.useState(false);

 
  let merchandiser = localStorage.getItem("shop_access_token")

  React.useEffect(()=>{

      axios.get("http://backend-api.martekgh.com/api/categories")
      .then(res=>{
        const categories = res.data
        setCategoryList(categories);
      })
      .catch(error=>{
      });

      axios.get("http://backend-api.martekgh.com/api/product/"+props.location.state.id+"/details")
      .then(res=>{
        console.log(res.data)
        setProduct_name(res.data.product_name);
        setDescription(res.data.description);
        setIn_stock(res.data.in_stock);
        setPrice(res.data.price);

      })
      .catch(error=>{
      })
    },[props.location.state.id]);
    
    const handleSubmit = (e) =>{
      e.preventDefault();
       setIsActive(true);
    axios.post('http://backend-api.martekgh.com/api/e-trader/product/'+props.location.state.id+'/update',
    {product_name, in_stock, price, description,category}, {
      headers:{'Authorization':`Bearer ${merchandiser}`}
    }).then(res => {
        console.log(res.data)
        setIsActive(false)
        props.history.push("/shop/shop-product-details",{id:props.location.state.id})
    }).catch(error => {
      setIsActive(false)
      console.log(error)
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
                        <Input placeholder="Item Name" type="text" value={product_name} onChange={e => setProduct_name(e.target.value)}/>
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
                        <Input placeholder="Price" type="number" name="price" value={price} onChange={e => setPrice(e.target.value)}/>
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
                    <Col md="6">
                      <Label>QUANTITY</Label>
                      <InputGroup>
                        <InputGroupAddon addonType="prepend">
                          <InputGroupText>
                            <i className="nc-icon nc-cart-simple" />
                          </InputGroupText>
                        </InputGroupAddon>
                        <Input placeholder="Quantity" type="number" name="in_stock" value={in_stock} onChange={e => setIn_stock(e.target.value)}/>
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
                  />
                  </Col>
                  </Row>

                  <Row>
                    <Col className="ml-auto mr-auto" md="6">
                      <Button className="btn-fill" color="info" block type="submit">
                        Save Changes
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
export default EditProduct;