import React from "react";
import{
    Container,
    Col,
    Row,
    Button,
    Form,Progress
} from "reactstrap";
import axios from "axios";
import ImageUploader from 'react-images-upload';
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import IndexNavbar from "components/Navbars/IndexNavbar";
import DemoFooter from "components/Footers/DemoFooter";
// core components
//import IndexNavbar from "../components/Navbars/IndexNavbar.js";
//import DemoFooter from "../components/Footers/DemoFooter";

class UploadShopAvatar extends React.Component{

    constructor(props) {
        super(props);
         this.state = { 
             avatar: [],
              cover:[],
              valid_id:[],
             store_id:this.props.location.state.id, 
             isActive:false, activateButton:false, activateButton2:false, activateButton3:false,
             percentage:0
             };
         this.onDrop = this.onDrop.bind(this);
         
    }

    onDrop(picture) {
        this.setState({
            avatar: this.state.avatar.concat(picture),
            cover:this.state.cover.concat(picture),
            valid_id:this.state.valid_id.concat(picture),
            activateButton:true,
            activateButton2:true,
            activateButton3:true
        });
    }
    
    
    handleSubmit=(e)=>{
    e.preventDefault();
    const avatar_file = new Blob(this.state.avatar);
    const cover_photo_file = new Blob(this.state.cover);
    const valid_id_file = new Blob(this.state.valid_id);
     const bodyFormData = new FormData();
     bodyFormData.set('avatar',avatar_file, avatar_file.filename);
     bodyFormData.append('cover_photo',cover_photo_file,cover_photo_file.filename);
     bodyFormData.append('valid_id',valid_id_file,valid_id_file.filename);
    axios({method:"post",
    url:`https://martek.herokuapp.com/api/merchandiser/${this.state.store_id}/store-photos`,
    data:bodyFormData,
    headers:{
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
        const {loaded , total} = progressEvent;
        let percentage = Math.floor(loaded * 100 / total);
        console.log(percentage)
        if(percentage<100){
            this.setState({percentage:percentage});
        }
    }
    }).then(res=>{
        this.setState({percentage:100})
        this.props.history.push("/auth/wait-shop-verification",{store_id:this.state.store_id})
    }).catch(error=>{
        console.log(error.response.data)
        this.setState(false)
    })
}
    render(){
    return(
        <div>
            <LoadingOverlay 
            active = {this.state.isActive}
            spinner={<BounceLoader color={'#4071e1'}/>}
            >
        <IndexNavbar/>
        
        <div className="main">
                <div className="section">
                    <br/>
        <Container style={{marginTop:"50px"}}>
        <p style={{marginBottom:"10px", fontSize:"13px"}}>Upload All Necessary Files For Your Shop</p>
               
        <Form onSubmit={this.handleSubmit} style={{marginTop:"50px"}}>
        <Row className="mt-auto mb-auto" style={{marginTop:"50px"}}> 
            <Col md="4" lg="4"  className="ml-auto mr-auto">
            <div>
            <label>Shop Avatar</label>
            <ImageUploader
                withIcon={true}
                withPreview={true}
                buttonText='Shop Avatar'
                onChange={this.onDrop}
                imgExtension={['.jpg',  '.png','.jpeg']}
                maxFileSize={5242880}
                value={this.state.activateButton}
            />
                </div>
            </Col>
            <Col md="4" lg="4" className="ml-auto mr-auto">
                <div>
                <label>Cover Photo</label>
                <ImageUploader
                    withIcon={true}
                    withPreview={true}
                    buttonText='Cover Photo'
                    onChange={this.onDrop}
                    imgExtension={['.jpg','.png', '.jpeg']}
                    maxFileSize={5242880}
                    value={this.state.activateButton2}
                />
                    </div>
            </Col>
            <Col md="4" lg="4" className="ml-auto mr-auto">
                <div>
                <label>Valid ID Card</label>
                <ImageUploader
                    withIcon={true}
                    withPreview={true}
                    buttonText='Valid ID Card'
                    onChange={this.onDrop}
                    imgExtension={['.jpg','.png', '.jpeg']}
                    maxFileSize={5242880}
                    value={this.state.activateButton2}
                />
                    </div>
            </Col>
        </Row>

        
        {this.state.percentage === 0?<div></div>:
        <div>
        <div className="text-center">{this.state.percentage}%</div>
        <Progress value={this.state.percentage} />
        </div>
        }

        <Row style={{marginTop:"30px"}}>
            <Col md="4">
            <Button
                block
                color="info"
                disabled={!this.state.activateButton || !this.state.activateButton2}
                type="submit"
                >
                    upload
                </Button>
            </Col>
            </Row>
            
        </Form>
        </Container>
        </div>
        </div>
        </LoadingOverlay>
        
        <DemoFooter />
        </div>
    )
}
}
export default UploadShopAvatar;




