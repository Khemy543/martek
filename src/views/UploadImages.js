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
import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter";
//import { Link } from "react-router-dom";
import ImageUploader from 'react-images-upload';
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";


class UploadImages extends React.Component {
    
    constructor(props) {
        super(props);
         this.state = { pictures: [], 
            product_id:this.props.location.state.product_id, 
            isActive:false, 
            modal:false, 
            activateButton:false,
            percentage:0,
            number:0
        };
         this.onDrop = this.onDrop.bind(this);
         
    }

    componentDidMount(){
        let user = localStorage.getItem('access_token')
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture), activateButton:true,number:this.state.pictures.length
        });

        console.log(this.state.number)
    }
    

    handleSubmit=(e)=>{
        let user = localStorage.getItem('access_token')      
        console.log(user)
        e.preventDefault();
        console.log(this.state.pictures.length);
        const file = new Blob(this.state.pictures);
        const bodyFormData = new FormData();
        bodyFormData.set('product_images',file, file.filename);

        const options = {
            
        }

    axios({
            method:'post',
            headers:{
                "Authorization":`Bearer ${user}`,
                "Content-Type":"mutipart/form-data"
            },
            data:bodyFormData,
            url:"https://martek.herokuapp.com/api/e-trader/"+this.state.product_id+"/product-images",
            onUploadProgress: (progressEvent) => {
                const {loaded , total} = progressEvent;
                let percentage = Math.floor(loaded * 100 / total);
                console.log(percentage)
                if(percentage<100){
                    this.setState({percentage:percentage});
                }
            }
    }).then(res=>{
        console.log(res.data)
        this.setState({isActive:false, modal:true, percentage:100});
    }).catch(error=>{
        console.log(error.response.data)
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
                    <Form onSubmit={this.handleSubmit}>
                        
                        <Row>
                        <Col md="4" className="mr-auto ml-auto text-center">
                        <h3 className="text-uppercase">Upload Images</h3>
                        <div>
                        <ImageUploader
                            withLabel={true}
                            withIcon={true}
                            withPreview={true}
                            buttonText='Choose images'
                            onChange={this.onDrop}
                            label="Max file size:5mb accept:jpg,png"
                            imgExtension={['.jpg','.png']}
                            fileSizeError="file size is too big"
                            fileTypeError="is not supported"
                            maxFileSize={5242880}
                            value={this.state.activateButton}
                            disabled={true}
                            
                        />
                            </div>
                            <h4>*maximum of 5 images</h4>
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
                                type="submit"
                                style={{marginTop:"20px"}}
                                disabled={!this.state.activateButton}
                                >upload
                                    </Button>
                            </Col>
                            
                        </Row>
                        </Form>
                        </Container>
                    </div>
                </div>
                </LoadingOverlay>
                <Modal isOpen={this.state.modal} className="login-modal">
      
                <ModalBody style={{color:"white", fontSize:"12px", fontWeight:500}}>
                    PRODUCT SAVED
                    <a href="/user/home" style={{float:"right"}}><Button color="primary">OK</Button></a>{' '}
                </ModalBody>
                
                </Modal>
            </div>
    )
}
}
export default UploadImages;