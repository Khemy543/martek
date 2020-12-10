import React from "react";
import{
    Container,
    Col,
    Row,
    Button,
    Form, Modal, ModalBody,Progress
} from "reactstrap";
import axios from "axios";
//import { Link } from "react-router-dom";
import ImageUploader from 'react-images-upload';
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";


let user = localStorage.getItem('access_token')  
class UploadImages extends React.Component {
    
    constructor(props) {
        super(props);
         this.state = { 
            pictures: [], 
            product_id:this.props.location.state.product_id, 
            isActive:false, 
            modal:false, 
            activateButton:false,
            percentage:0,
            number:0
        };
         this.onDrop = this.onDrop.bind(this);
         
    }

    onDrop(picture) {
        this.setState({
            pictures: this.state.pictures.concat(picture),
            activateButton:true,
            number:this.state.pictures.length
        });
    }
    

    handleSubmit=(e)=>{
        console.log(".....uploading....")    
        console.log(user)
        e.preventDefault();
        const file = this.state.pictures;
        console.log("file",file);
        let name = ['name','game','john']
        let bodyFormData = new FormData();
        bodyFormData.append('product_images',file);
        for (var pair of bodyFormData.entries()) {
            console.log(pair[0]+ ', ' + pair[1]); 
        }
    axios({
            method:'post',
            headers:{
                "Authorization":`Bearer ${user}`
            },
            data:bodyFormData,
            url:"http://backend-api.martekgh.com/api/e-trader/"+this.state.product_id+"/product-images",
            onUploadProgress: (progressEvent) => {
                const {loaded , total} = progressEvent;
                let percentage = Math.floor(loaded * 100 / total);
                console.log(percentage)
                if(percentage<100){
                    this.setState({percentage:percentage});
                }
            }
    }).then(res=>{
        console.log(res);
        this.setState({isActive:false, modal:true,percentage:100})
        setTimeout(
            function(){
                this.setState({modal:false});
                console.log(this.props)
            }
            .bind(this),
            1500
        )
    }).catch(error=>{
        console.log(error.response.data)
        this.setState({isActive:false, modal:true,percentage:100})
        setTimeout(
            function(){
                this.setState({modal:false});
                this.props.history.push('/user/payment/user/information')
            }
            .bind(this),
            1500
        )
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
                            imgExtension={['.jpg','.png', '.jpeg']}
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
                <Modal isOpen={this.state.modal} className="alert-modal">
                    <ModalBody>
                        <h4 style={{textAlign:"center", marginTop:"-3%", fontWeight:"500", color:"white"}}>PRODUCT SAVED!!</h4>
                    </ModalBody>
                </Modal>
            </div>
    )
}
}
export default UploadImages;