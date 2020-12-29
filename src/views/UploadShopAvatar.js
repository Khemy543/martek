import React from "react";
import{
    Container,
    Col,
    Row,
    Button,
    Form,Progress, Spinner
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
             isActive:false, activateButton:false, activateButton2:false, activateButton3:false,
             percentage:0
             };
         this.onDropAvatar = this.onDropAvatar.bind(this);
         this.onDropCover = this.onDropCover.bind(this);
         this.onDropCard = this.onDropCard.bind(this);
         
    }

    onDropAvatar(picture) {
        this.setState({
            avatar:picture,
            activateButton:true
        });
    }
    onDropCover(picture) {
        this.setState({
            cover:picture,
            activateButton2:true
        });
    }
    onDropCard(picture) {
        this.setState({
            valid_id:picture,
            activateButton3:true
        });
    }
    
    
    handleSubmit=(e)=>{
        this.setState({isActive:true})
    e.preventDefault();
    let avatar_file = this.state.avatar[0]
    let cover_photo_file = this.state.cover[0]
    let valid_id_file = this.state.valid_id[0]
    let bodyFormData = new FormData();
     bodyFormData.append('avatar',avatar_file);
     bodyFormData.append('cover_photo',cover_photo_file);
     bodyFormData.append('valid_id',valid_id_file);
    axios({method:"post",
    url:`https://backend-api.martekgh.com/api/merchandiser/${this.props.location.state.id}/store-photos`,
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
                onChange={this.onDropAvatar}
                imgExtension={['.jpg', '.png','.jpeg', '.jfif', '.heic']}
                maxFileSize={5242880}
                value={this.state.activateButton}
                singleImage={true}
                fileSizeError="File Size Too Big"
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
                    onChange={this.onDropCover}
                    imgExtension={['.jpg','.png','.jpeg', '.jfif', '.heic']}
                    maxFileSize={5242880}
                    value={this.state.activateButton2}
                    singleImage={true}
                    fileSizeError="File Size Too Big"
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
                    onChange={this.onDropCard}
                    label="Max file size:5mb accept:jpg,png,jpeg"
                    imgExtension={['.jpg','.png', '.jpeg', '.jfif', '.heic']}
                    fileSizeError="file size is too big"
                    fileTypeError="is not supported"
                    value={this.state.activateButton3}
                    singleImage={true}
                    fileSizeError="File Size Too Big"
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
            {!this.state.isActive?
                <Button
                block
                color="info"
                disabled={!this.state.activateButton || !this.state.activateButton2}
                type="submit"
                >
                    upload
                </Button>
                :
                <Button
                    block
                    color="info"
                    disabled
                >
                    <Spinner size="sm" color="info"/>
                </Button>
            }
            </Col>
            </Row>
            
        </Form>
        </Container>
        </div>
        </div>
        
        <DemoFooter prop={this.props}/>
        </div>
    )
}
}
export default UploadShopAvatar;




