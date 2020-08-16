import React from "react";
import{
    Container,
    Col,
    Row,
    Button,
    Form, Modal, ModalBody,Progress
} from "reactstrap";
import axios from "axios";
// core components
import ExamplesNavbar from "../components/Navbars/ExamplesNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";
//import { Link } from "react-router-dom";
import ImageUploader from 'react-images-upload';
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";


let user =1;
let all_data = JSON.parse(localStorage.getItem('ShopData'));
if(all_data !== null){      
  user = all_data[0];
}

class ShopUploadImages extends React.Component{

    constructor(props) {
        super(props);
         this.state = { pictures: [], product_id:this.props.location.state.product_id, isActive:false, modal:false, activateButton:false,percentage:0 };
         this.onDrop = this.onDrop.bind(this);
         
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
            activateButton:true
        });
    }

 handleSubmit=(e)=>{
    e.preventDefault();
    const file = new Blob(this.state.pictures);
    const bodyFormData = new FormData();
    bodyFormData.set('product_images',file, file.filename);

    axios({method:"post",
    url:"https://martek.herokuapp.com/api/e-trader/"+this.state.product_id+"/product-images",
    data:bodyFormData,
    headers:{'Authorization':`Bearer ${user}`, "Content-Type":"mutipart/form-data"},
    onUploadProgress: (progressEvent) => {
        const {loaded , total} = progressEvent;
        let percentage = Math.floor(loaded * 100 / total);
        console.log(percentage)
        if(percentage<100){
            this.setState({percentage:percentage});
        }
    }
    }).then(res=>{
        this.setState({modal:true, isActive:false, percentage:100})
    }).catch(error=>{
    })
} 
    
render(){
    return(
        <div>
             <LoadingOverlay 
                active = {this.state.isActive}
                spinner={<BounceLoader color={'#4071e1'}/>}
                >
            <div className="main">
                <div className="section">
                    <br/>
                    <br/>
                    <Container >
                    <Row>
                    <Col md="4" className="ml-auto mr-auto text-center">
                    <h3>Upload Images</h3>
                    <br/>
                    <Form onSubmit={this.handleSubmit}>
                        <div>
                        <ImageUploader
                            withIcon={true}
                            withPreview={true}
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            imgExtension={['.jpg','.png','.jpeg']}
                            maxFileSize={5242880}
                            value={this.state.activateButton}
                        />
                            </div>
                            <br/>
                            {this.state.percentage === 0?<div></div>:
                            <div>
                            <div className="text-center">{this.state.percentage}%</div>
                            <Progress value={this.state.percentage} />
                            </div>
                            }
                                <Button
                                color="info"
                                block
                                style={{marginTop:"20px"}}
                                disabled={!this.state.activateButton}
                                type="submit"
                                >upload
                                    </Button>
                        </Form>
                        </Col>
                        </Row>
                        </Container>
                    </div>
                </div>
                </LoadingOverlay>
                <Modal isOpen={this.state.modal} className="login-modal">
      
                <ModalBody style={{color:"white", fontSize:"12px", fontWeight:500}}>
                    PRODUCT SAVED
                    <a href="/shop/shop-page" style={{float:"right"}}><Button color="primary">OK</Button></a>{' '}
                </ModalBody>
                
                </Modal> 
            </div>
    )
}
}
export default ShopUploadImages;