import React from "react";
import{
    Container,
    Col,
    Row,
    Button,
    Form, Modal, ModalBody,Progress, Spinner
} from "reactstrap";
import axios from "axios";
// core components
//import { Link } from "react-router-dom";
import ImageUploader from 'react-images-upload';




class ShopUploadImages extends React.Component{

    constructor(props) {
        super(props);
         this.state = { pictures: [], product_id:this.props.location.state.product_id, isActive:false, modal:false, activateButton:false,percentage:0 };
         this.onDrop = this.onDrop.bind(this);
         
    }

    onDrop(picture) {
        this.setState({
            pictures: picture,
            activateButton:true
        });
    }

 handleSubmit=(e)=>{
    let merchandiser = localStorage.getItem("shop_access_token")
    e.preventDefault();
    this.setState({isActive:true})
    let bodyFormData = new FormData();
    this.state.pictures.forEach((file) => {
        bodyFormData.append('product_images[]', file);
    });
    axios({method:"post",
    url:"https://backend-api.martekgh.com/api/e-trader/"+this.state.product_id+"/product-images",
    data:bodyFormData,
    headers:{'Authorization':`Bearer ${merchandiser}`},
    onUploadProgress: (progressEvent) => {
        const {loaded , total} = progressEvent;
        let percentage = Math.floor(loaded * 100 / total);
        if(percentage<100){
            this.setState({percentage:percentage});
        }
    }
    }).then(res=>{
        this.setState({modal:true, percentage:100});
        setTimeout(
            function(){
                    this.props.history.push('/shop/shop-page')
            }
            .bind(this),
            1500
        )
    }).catch(error=>{
        this.setState({isActive:false})
    })
} 
    
render(){
    return(
        <div>
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
                            label="Max file size:5mb accept:jpg,png,jpeg"
                            onChange={this.onDrop}
                            imgExtension={['.jpg','.png','.jpeg']}
                            fileSizeError="file size is too big"
                            fileTypeError="is not supported"
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
                            {this.state.isActive?
                                <Button
                                color="info"
                                block
                                style={{marginTop:"20px"}}
                                disabled={true}
                                >
                                <Spinner size="sm" />
                                </Button>
                                :
                                <Button
                                color="info"
                                block
                                style={{marginTop:"20px"}}
                                disabled={!this.state.activateButton}
                                type="submit"
                                >upload
                                </Button>
                            }
                        </Form>
                        </Col>
                        </Row>
                        </Container>
                    </div>
                </div>
                <Modal isOpen={this.state.modal} className="login-modal">
      
                <ModalBody style={{color:"white", fontSize:"14px", fontWeight:500, textAlign:"center"}}>
                    PRODUCT SAVED
                </ModalBody>
                
                </Modal> 
            </div>
    )
}
}
export default ShopUploadImages;