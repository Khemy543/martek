import React from "react";
import{
    Container,
    Col,
    Row,
    Button,
    Form, Modal, ModalBody
} from "reactstrap";
//import axios from "axios";
import ImageUploader from 'react-images-upload';
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
// core components
//import IndexNavbar from "../components/Navbars/IndexNavbar.js";
//import DemoFooter from "../components/Footers/DemoFooter";


class Verification extends React.Component{

    constructor(props) {
        super(props);
         this.state = { 
             verification_id: [],
             store_id:this.props.location.state.storeId, 
             isActive:false, modal:false, activateButton:false
             };
         this.onDrop = this.onDrop.bind(this);
         
    }

    onDrop(picture) {
        this.setState({
            verification_id: this.state.verification_id.concat(picture),
            activateButton:true
        });
    }
    
    handleSubmit=(e)=>{
    e.preventDefault();
    this.setState({isActive:true})
    
    const verification_id_file = new Blob(this.state.verification_id);
     const bodyFormData = new FormData();
     bodyFormData.set('verification_id',verification_id_file, verification_id_file.filename);
    
    this.setState({modal:true})
}
    render(){
    return(
        <div>
            <LoadingOverlay 
            active = {this.state.isActive}
            spinner={<BounceLoader color={'#4071e1'}/>}
            >
        <div    >
        <Container> 
            <br/>
            <br/>
            <br/>
                    <Form onSubmit={this.handleSubmit}>
                        <Row>
                        
                        <Col md="6" className="mr-auto ml-auto">
                        <h3 className="text-center">Upload ID</h3>
                            <br/>
                            <br/>
                            <br/>
                        <div>
                        <ImageUploader
                            withIcon={true}
                            withPreview={true}
                            buttonText='Upload ID'
                            onChange={this.onDrop}
                            imgExtension={['.jpg',  '.png','.jpeg']}
                            maxFileSize={5242880}
                            value={this.state.activateButton}
                        />
                            </div>
                        </Col>
                
                    </Row>
                    <br/>
                    <br/>
                    <Row>
                        <Col md="6" className="mr-auto ml-auto text-center">
                                <Button
                                color="info"
                                disabled={!this.state.activateButton}
                                type="submit"
                                >
                                    upload
                                    </Button>
                        </Col>
                    </Row>
                </Form>
        </Container>
        </div>
        </LoadingOverlay>
        <Modal isOpen={this.state.modal} className="login-modal">
      
                <ModalBody style={{color:"white", fontSize:"12px", fontWeight:500}}>
                    SHOP CREATED
                    <a href="/auth/shop-login" style={{float:"right"}}><Button color="primary">OK</Button></a>{' '}
                </ModalBody>
                
                </Modal>
        </div>
    )
}
}
export default Verification;




