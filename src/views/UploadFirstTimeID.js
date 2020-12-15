import React from "react";
import{
    Container,
    Col,
    Row,
    Button,
    Form,Progress, ModalHeader, ModalBody,Modal, Spinner
} from "reactstrap";
import axios from "axios";
import ImageUploader from 'react-images-upload';
import LoadingOverlay from "react-loading-overlay";
import BounceLoader from "react-spinners/BounceLoader";
import history from '../history.js';
// core components
//import IndexNavbar from "../components/Navbars/IndexNavbar.js";
//import DemoFooter from "../components/Footers/DemoFooter";

let user = localStorage.getItem('access_token')


class UploadValidID extends React.Component{

    constructor(props) {
        super(props);
         this.state = { 
              valid_id:[],
              percentage:0,
              button:false,
              modal:false,
              isActive:false
             };
         this.onDrop = this.onDrop.bind(this);
         
    }
    

    onDrop(picture) {
        this.setState({
            valid_id:this.state.valid_id.concat(picture)
        });
    }


    componentDidMount(){
        console.log(this.props)
        if(localStorage.getItem('validity') === "true"){
           history.push('/user/add-product')
          }
    }
    

    handleSubmit=(e)=>{
    e.preventDefault();
    this.setState({isActive:true})
    const valid_id_file = new Blob(this.state.valid_id);
     const bodyFormData = new FormData();
     bodyFormData.append('valid_id',valid_id_file,valid_id_file.filename);
    axios({method:"post",
    url:`https://backend-api.martekgh.com/api/auth/upload/valid-id`,
    data:bodyFormData,
    headers:{
        "Authorization":`Bearer ${user}`,
      "Content-Type": "multipart/form-data",
    },
    onUploadProgress: (progressEvent) => {
        const {loaded , total} = progressEvent;
        let cpercentage = Math.floor(loaded * 100 / total);
        console.log(cpercentage)
        if(cpercentage<100){
            this.setState({percentage:cpercentage});
        }else{
            this.setState({percentage:100})
        }
    }
    }).then(res=>{
        console.log(res.data)
        this.setState({modal:true})
        setTimeout(
            function(){
                localStorage.setItem('validity',true)
                history.push('/user/add-product');
            }
            .bind(this),
            1500
        )
    }).catch(error=>{
        console.log(error)
        this.setState(false)
    })
}
    render(){
    return(
        <div>
        
        <div className="main">
                <div className="section">
                    <br/>
        <Container style={{marginTop:"50px"}}>
        <p style={{marginBottom:"10px", fontSize:"13px"}}>Provide A Valid ID</p>
               
        <Form onSubmit={this.handleSubmit} style={{marginTop:"50px"}}>
        
        <Row className="mt-auto mb-auto" style={{marginTop:"50px"}}> 
            <Col md="4" lg="4" className="ml-auto mr-auto">
                <div>
                <label>Valid ID Card</label>
                <ImageUploader
                    withIcon={true}
                    withPreview={true}
                    buttonText='Valid ID Card'
                    onChange={this.onDrop}
                    label="Max file size:5mb accept:jpg,png,jpeg"
                    imgExtension={['.jpg','.png', '.jpeg']}
                    fileSizeError="file size is too big"
                    fileTypeError="is not supported"
                    maxFileSize={5242880}
                />
                    </div>

                    {this.state.percentage === 0?<div></div>:
        <div>
        <div className="text-center">{this.state.percentage}%</div>
        <Progress value={this.state.percentage} />
        </div>
        }
            </Col>
        </Row>

        
        

        <Row style={{marginTop:"30px"}}>
            <Col md="4" style={{marginRight:"auto", marginLeft:"auto"}}>
            {this.state.isActive?
                <Button
                block
                color="info"
                disabled={true}
                >
                    <Spinner size="sm"/>
                </Button>
                :
            <Button
                block
                color="info"
                type="submit"
                disabled={this.state.valid_id.length<=0}
                >
                    upload
                </Button>
            }
            </Col>
            </Row>
            
        </Form>
        </Container>
        <Modal isOpen={this.state.modal} className="login-modal">
      
      <ModalBody style={{color:"white", fontSize:"12px", fontWeight:500}} className="text-center">
        ID SAVED
      </ModalBody>
      
    </Modal>
        </div>
        </div>
        </div>
    )
}
}
export default UploadValidID;




