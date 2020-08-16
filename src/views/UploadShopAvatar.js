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
// core components
//import IndexNavbar from "../components/Navbars/IndexNavbar.js";
//import DemoFooter from "../components/Footers/DemoFooter";

class UploadShopAvatar extends React.Component{

    constructor(props) {
        super(props);
         this.state = { 
             avatar: [],
              cover:[],
             store_id:this.props.location.state.id, 
             isActive:false, activateButton:false, activateButton2:false,
             percentage:0
             };
         this.onDrop = this.onDrop.bind(this);
         
    }

    onDrop(picture) {
        this.setState({
            avatar: this.state.avatar.concat(picture),
            cover:this.state.cover.concat(picture),
            activateButton:true,
            activateButton2:true
        });
    }
    
    
    handleSubmit=(e)=>{
    e.preventDefault();
    const avatar_file = new Blob(this.state.avatar);
    const cover_photo_file = new Blob(this.state.cover);
     const bodyFormData = new FormData();
     bodyFormData.set('avatar',avatar_file, avatar_file.filename);
     bodyFormData.append('cover_photo',cover_photo_file,cover_photo_file.filename);
    axios({method:"post",
    url:"https://martek.herokuapp.com/api/merchandiser/"+this.state.store_id+"/store-photos",
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
        this.props.history.push("/auth/verification",{store_id:this.state.store_id, percentage:100})
    }).catch(error=>{
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
        <Container style={{marginTop:"50px"}} className="text-center">
        <Form onSubmit={this.handleSubmit}style={{marginTop:"50px"}}>
            <h4>Shop Images</h4>
        <Row className="mt-auto mb-auto">
            <Col md="4" lg="4"  className="ml-auto mr-auto">
            <div>
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
        </Row>

        
        {this.state.percentage === 0?<div></div>:
        <div>
        <div className="text-center">{this.state.percentage}%</div>
        <Progress value={this.state.percentage} />
        </div>
        }

        <Row style={{marginTop:"30px"}}>
            <Col>
            <Button
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
        </LoadingOverlay>
        </div>
    )
}
}
export default UploadShopAvatar;




