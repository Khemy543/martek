import React from "react";
// reactstrap components
import {
  Button,
  Input,
  Container,
  Row,
  Col,
  Spinner,
  Modal,
  ModalBody
} from "reactstrap";

// core components
import ExamplesNavbar from "components/Navbars/ExamplesNavbar.js";
//import ProfilePageHeader from "components/Headers/ProfilePageHeader.js";
import DemoFooter from "components/Footers/DemoFooter.js";
import axios from "axios";
import { ProductConsumer } from "context";

let merchandiser = localStorage.getItem('shop_access_token')
class ManageAd extends React.Component{

    state={
        imageFile:null,
        imageSrc: null,
        ad_id:null,
        laoding:false,
        modal:false,
        modalInfo : '',
        deleteLoading: false
    }

    browseFiles(){
        this.inputElement.click();
    }

    componentDidMount(){
        axios.get(`https://backend-api.martekgh.com/api/merchandiser/shop/ad`,
        {headers:{'Authorization':`Bearer ${merchandiser}`}})
        .then(response=>{
            this.setState({
                imageSrc: `https://backend-api.martekgh.com/${response.data.shop_ad?.ad_path}`,
                ad_id : response.data.shop_ad.id
            })
        })
        .catch(error=>{

        })
    }

    handleChange(value){
        this.setState({
            imageFile:value
        });
        let tempImageFile = value;
        let reader = new FileReader();
        if(tempImageFile){
            reader.readAsDataURL(tempImageFile);
            reader.onload = (e) => {
                this.setState({imageSrc : e.target.result})
            }
        }
    }

    submitAd=(id)=>{
        this.setState({loading:true})
        let formData = new FormData();
        formData.append('ad', this.state.imageFile)
        
        axios.post(`https://backend-api.martekgh.com/api/merchandiser/${id}/store-ad`, formData,
        {headers:{'Authorization':`Bearer ${merchandiser}`}})
        .then(response=>{
            console.log(response.data);
            this.setState({
                modalInfo:"AD UPDATED SUCCESSFULLY",
                modal:true
            })
            setTimeout(
                function(){
                    this.setState({modal:false});
                }
                .bind(this),
                1500
            )
        })
        .catch(error=>{
            console.log(error)
        })
        .finally((_)=>this.setState({loading:false}))
    }

    deleteAd=(id)=>{
        this.setState({deleteLoading:true})
        axios.delete(`https://backend-api.martekgh.com/api/merchandiser/shop/${this.state.ad_id}/ad`)
        .then(response=>{
            this.setState({
                modalInfo:"AD DELETED!",
                modal:true,
                imageSrc:null
            })
            setTimeout(
                function(){
                    this.setState({modal:false});
                }
                .bind(this),
                1500
            )
        }).catch(error=>{
            console.log(error)
        })
        .finally((_)=>{
            this.setState({deleteLoading:false})
        })
    }

    render(){
        return(
            <div>
            <div className="section">
                <br/>
                <br/>
                <Container>
                <h4 style={{fontWeight:500, fontSize:'16px'}}>Picture Ad</h4>
                <p style={{marginBottom:"10px", fontSize:"13px"}}>Choose a picture for your ad</p>
                <ProductConsumer>
                    {
                        value=>(
                            <>
                            <Row>
                            <Col md ="8" xs="12" sm="12" style={{display:"flex", justifyContent:"center"}}>
                                <div>
                                    <div className="ad-icon">
                                        <i className="fa fa-picture-o" />
                                    </div>
                                    <p>Upload a picture from your library</p>
                                    
                                    <div>
                                        <input type="file" accept="image/*" ref={input =>this.inputElement = input}  className="hidden" onChange={e=>this.handleChange(e.target.files[0])} />
                                        <div className="preview-container" onClick={()=>this.browseFiles()}>
                                            <img className="preview-image" src={this.state.imageSrc} />
                                            <div className="image-container">
                                                <i className="fa fa-picture-o" style={{fontSize:"50px"}}/>
                                            </div>
                                        </div>
                                    </div>
                                        <br/>
                                        <br/>
                                    
                                        {
                                            this.state.loading?
                                            <Button disabled color="info" style={{marginRight:"5px"}}>
                                                <Spinner size="sm" />
                                            </Button>
                                            :
                                            <Button color="info" onClick={()=>this.submitAd(value.merchandiser?.id)} style={{marginRight:"5px"}}>
                                                Upload Ad
                                            </Button>

                                        }

                                        {
                                            this.state.deleteLoading?
                                            <Button disabled color="danger"style={{marginLeft:"5px"}}>
                                                <Spinner size="sm" />
                                            </Button>
                                            :
                                            <Button color="danger" onClick={()=>this.deleteAd(value.merchandiser?.id)} style={{marginLeft:"5px"}}>
                                                Delete Ad
                                            </Button>

                                        }

                                </div>
                            </Col>

                            <Col md="4" style={{borderLeft:"1px solid #9b9999"}}>
                                <h4 style={{fontWeight:500, fontSize:'16px'}}>Recommended Picture Specs</h4>
                                <br/>
                                <ul>
                                    <li>Format : JPEG, JPG, PNG</li>
                                    <li>Size : 5mb or less</li>
                                </ul>

                            </Col>
                        </Row>
                        
                        <br/>
                        <br/>
                        <div style={{
                            display:"flex",
                            justifyContent:"center",
                            width:"100%"
                        }}>
                        
                        <Modal isOpen={this.state.modal} toggle={this.toggle} style={{maxHeight:"40px", maxWidth:"500px"}} className="alert-modal">
                            <ModalBody style={{ color: "white", fontSize: "12px", fontWeight: 500 }} className="text-center">
                                {this.state.modalInfo}!
                            </ModalBody>
                        </Modal>

                        </div>
                        </>
                        )
                    }
                </ProductConsumer>
                
                </Container>
            </div>
            </div>
        )
    }
}

export default ManageAd;