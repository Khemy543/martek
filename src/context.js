import React from "react";
//import { detailProduct } from "./dummy_data";
import _ from "lodash";
import axios from 'axios';
import { Modal, ModalBody, Col, Container} from "reactstrap";
import decode from "jwt-decode";





const ProductContext = React.createContext();
//Provider
//Consumer

let user =null;
let user_id=null;
let merchandiser = null;


class ProductProvider extends React.Component{
    constructor(){
    super();
    this.state={
        user:{},
        merchandiser:{},
        cart:[],
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0,
        searchResults:[],
        searchValue:"",
        Token:"",
        spinner:false,
        modal:false,
        modalInfo:"",
        setShops:[],
        followShops:[],
        followLoader:false,
        unfollowLoader:false,
        activeShopFollowers:null,
        id:"",
		activeTabIndex:"1",
        followModal:false,
		actions: {
			changeIndex: index => this.setState({ activeTabIndex: index }),
            setUser : data => this.setState({user : data}),
            setMerchandiser : data => this.setState({merchandiser : data})
		}
    }
}

    toggle=()=>{
        this.setState({modal:!this.state.modal}) 
    }
    componentWillMount(){
        user = localStorage.getItem('access_token')
        user_id = localStorage.getItem("user_id");
        merchandiser = localStorage.getItem('shop_access_token')
        
    }
    
    componentWillUpdate(){
        user = localStorage.getItem('access_token')
        user_id = localStorage.getItem("user_id");
        merchandiser = localStorage.getItem('shop_access_token')

    }

    componentDidUpdate(){
        user = localStorage.getItem('access_token')
        user_id = localStorage.getItem("user_id");
        merchandiser = localStorage.getItem('shop_access_token')

    }

    componentDidMount(){
        user = localStorage.getItem('access_token')
        user_id = localStorage.getItem("user_id");
        merchandiser = localStorage.getItem('shop_access_token')


        this.isTokenExpired();
        this.isShopTokenExpired();
        if(user != null){
            this.followingShops();
        }

        if(user != null){
        axios.get("https://backend-api.martekgh.com/api/user-cart",{headers:{'Authorization':`Bearer ${user}`}})
        .then(res=>{
            if(res.data !== null){
                this.setState({cart:res.data.cart[0], cartTotal:res.data.cart[1], spinner:false});
            }
        }).catch(error=>{
        });

        axios.get('https://backend-api.martekgh.com/api/auth/user',{headers:{'Authorization':`Bearer ${user}`}})
        .then(response=>{
            this.setState({user:response.data});
            localStorage.setItem("user_id",response.data.id);
            if(response.data.valid_id === null){
            localStorage.setItem('validity',false)
            }
        })
        .catch(error=>{
        })
    }

    if(merchandiser != null){
        axios.get('https://backend-api.martekgh.com/api/merchandiser',{headers:{'Authorization':`Bearer ${merchandiser}`}})
        .then(response=>{
            this.setState({merchandiser:response.data})
        })
        .catch(error=>{
        })
    }

        
    }


    //token
isTokenExpired() {
    let authenticated = localStorage.getItem('access_token');
     try {
         const decoded = decode(authenticated);
         if (decoded.exp < (Date.now() / 1000)) { // Checking if token is expired.
             localStorage.removeItem('access_token');
             window.location.reload("/")
         }
     }
     catch (err) {
         return false;
     }
 }

 isShopTokenExpired(){
     let authenticated = localStorage.getItem('shop_access_token');
     try {
        const decoded = decode(authenticated);
        if (decoded.exp < (Date.now() / 1000)) { // Checking if token is expired.
            localStorage.removeItem('shop_access_token');
            window.location.reload("/")
        }
    }
    catch (err) {
        return false;
    }
 }


 followingShops=()=>{
    axios.get("https://backend-api.martekgh.com/api/following-shops",
        {headers:{'Authorization':`Bearer ${user}`}})
        .then(res=>{
            this.setState({followShops:res.data})
        })
        .catch(error=>{
        })
 }
   

    follow = ({id, name, description, avatar})=>{
        user = localStorage.getItem('access_token');
        
        if(!user){
            return this.setState({followModal:true})
        }

        this.setState({followLoader:true})
    
        axios.post("https://backend-api.martekgh.com/api/follow/"+id+"/shop",null,{headers:{
        "Authorization":`Bearer ${user}`}})
        .then(res=>{
            if(res && res.data){
                let shops = this.state.followShops;
                let newShop = {
                    shop_id:id,
                    company_name:name,
                    company_description:description,
                    shop_avatar : avatar
                }

                this.setState({followShops:[...shops,newShop], activeShopFollowers:res.data.shop_followers})
            }
        })
        .catch(error=>{
        })
        .finally((_) => {
            this.setState({followLoader:false})
        })
    }

    unfollow=(id)=>{
        user = localStorage.getItem('access_token')
        this.setState({unfollowLoader:true})
        axios.post("https://backend-api.martekgh.com/api/unfollow/"+id+"/shop",null,{headers:{
            "Authorization":`Bearer ${user}`}})
            .then(res=>{
                if(res && res.data){
                    let shops = [...this.state.followShops];
                    shops = shops.filter(shop => shop.shop_id != id);
                    this.setState({followShops:shops,activeShopFollowers:res.data.shop_followers})
                }
            })
            .catch(error=>{
            })
            .finally((_) => this.setState({unfollowLoader:false}))
    }

    closeFollowModal=()=>{
        this.setState({followModal:false})
    }


    //getShop
    getShop=(id)=>{
    const AllShops = [...this.state.setShops];
    const shop = AllShops.find(item =>  item.id === id);
    return shop;
    }

    
//logout
logout = ()=>{
    user = localStorage.getItem('access_token')
    this.setState({spinner:true});
    axios.post("https://backend-api.martekgh.com/api/auth/logout", null, {
        headers:{'Authorization':`Bearer ${user}`}
      })
      .then(res=>{
        localStorage.clear();
        this.setState({spinner:false, user:{}});
        window.location.reload("/");
      })
      .catch(error=>{
        
        this.setState({spinner:false})
      })
}

shopLogout =()=>{
    axios.post("https://backend-api.martekgh.com/api/merchandiser/logout",null,{
    headers:{ 'Authorization':`Bearer ${merchandiser}`}
    })
    .then(res=>{
        localStorage.removeItem("shop_access_token");;
        this.setState({merchandiser:{}})
        window.location.pathname='/user/home';
    })
    .catch(error=>{
    })
}
   
    //incrementaion
    increment = (id) =>{
        let tempCart =[...this.state.cart];
        const selectedProduct = tempCart.find(item=>item.id===id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.quantity = product.quantity +1;
        if(product.quantity > product.in_stock){
            product.quantity = product.quantity-1;
        }else{

        
        product.total = product.quantity * product.price;

        const total = parseFloat(this.state.cartTotal) + parseFloat(product.price);

        this.setState(()=>{
            return{cart:[...tempCart], cartTotal:total}
        }, 
        function postcart() {
            const cart = [this.state.cart, this.state.cartTotal];
            axios.post("https://backend-api.martekgh.com/api/user/"+user_id+"/add-cart", {cart}, {headers:{
                "Authorization":`Bearer ${user}`,
                "Content-Type":"application/json",
                "Accept":"application/json"
        }}
        ).then(res=>{
            
            if(res.data.status === "cart saved"){
            }
            else{

            }
        }).catch(error=>{
            
        })
        })
    }
    }

    //decrementaion
    decrement = (id) =>{
        let tempCart =[...this.state.cart];
        const selectedProduct = tempCart.find(item=>item.id===id);

        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];

        product.quantity = product.quantity -1;
        
        if(product.quantity === 0){
            this.removeItem(id);
        }
        else{
            const total = parseFloat(this.state.cartTotal) - parseFloat(product.price);
            product.total = product.quantity * product.price;
            this.setState(()=>{
                return{cart:[...tempCart], cartTotal:total}
            },
            function postcart() {
                const cart = [this.state.cart, this.state.cartTotal];
                axios.post("https://backend-api.martekgh.com/api/user/"+user_id+"/add-cart", {cart}, {headers:{
                    "Authorization":`Bearer ${user}`,
                    "Content-Type":"application/json",
                    "Accept":"application/json"
            }}
            ).then(res=>{
                
                if(res.data.status === "cart saved"){
                    
                    
                }
                else{
    
                }
            }).catch(error=>{
                
            })
            });
        }
       
    }

    // remove item
    removeItem = (id) =>{
        let tempCart = [...this.state.cart];
        let newCart = tempCart.filter(item => item.id !==id);
        const selectedProduct = tempCart.find(item=>item.id===id);
        const index = tempCart.indexOf(selectedProduct);
        const product = tempCart[index];
        const total = parseFloat(this.state.cartTotal) - parseFloat(product.total);
        
        this.setState(()=>{
            return{cart:[...newCart], cartTotal:total}
        },function postcart() {
            const cart = [this.state.cart, this.state.cartTotal];
            axios.post("https://backend-api.martekgh.com/api/user/"+user_id+"/add-cart", {cart}, {headers:{
                "Authorization":`Bearer ${user}`,
                "Content-Type":"application/json",
                "Accept":"application/json"
        }}
        ).then(res=>{
            
            if(res.data.status === "cart saved"){
                
                
            }
            else{

            }
        }).catch(error=>{
            
        })
        })
    }

    //clear cart
    clearCart =(id)=>{
        this.setState({spinner:true})
        this.setState(()=>{
            return {cart:[], cartTotal:0};
        },
        function postcart() {
            const cart = [this.state.cart, this.state.cartTotal];
            axios.post("https://backend-api.martekgh.com/api/user/"+user_id+"/add-cart", {cart}, {headers:{
                "Authorization":`Bearer ${user}`,
                "Content-Type":"application/json",
                "Accept":"application/json"
        }}
        ).then(res=>{
            
            if(res.data.status === "cart saved"){
                
                this.setState({spinner:false});
            }
        
        }).catch(error=>{
            
            this.setState({spinner:false})
        })
        },
    ()=>{this.setProducts();}
    );
    }
    //get Items
    getItems = id =>{
        const AllProducts = [...this.state.setElectronics, ...this.state.setFoods,...this.state.setPhones,...this.state.setBeauty,...this.state.setEntertianment, ...this.state.setFashion,...this.state.setGames,...this.state.setHome,...this.state.setOthers,...this.state.setSkills];
        const product = AllProducts.find(item =>  item.id === id);
        return product;
    }
    getCartItem = id =>{
        const tempCart = [...this.state.cart];
        const cartProduct = tempCart.find(item=> item.id ===id);
        return cartProduct;
    }

    //handle details
    handleDetail =(id) =>{
        axios.get("https://backend-api.martekgh.com/api/product/"+id+"/details")
            .then(res=>{
                this.setState(()=>{
                    return {detailProduct:res.data}
                })
            })
            .catch(error=>{
            })
    }

    
    //handle inCart
    addToCart =(product) =>{
        this.setState({spinner:true})
        let tempCarts = [...this.state.cart];
        const cart_index = tempCarts.indexOf(this.getCartItem(product.id));
        if(cart_index === -1){
            product.quantity=1;
            const price=product.price;
            product.total=price;
            if(product['image'] !== undefined){
                product['product_images'] = product['image'];
                delete product['image'];
            }
            
            var total = parseFloat(this.state.cartTotal) + parseFloat(product.total);
            
            this.setState(()=>{
                return {
                    cart:[...this.state.cart, product], cartTotal:total
                };
            },
            function postcart() {
                const cart = [this.state.cart, this.state.cartTotal];
                axios.post("https://backend-api.martekgh.com/api/user/"+user_id+"/add-cart", {cart}, {headers:{
                    "Authorization":`Bearer ${user}`,
                    "Content-Type":"application/json",
                    "Accept":"application/json"
            }}
            ).then(res=>{
                
                if(res.data.status === "cart saved"){
                    
                    this.setState({modal:true, modalInfo:"ADDED TO CART", spinner:false})
                }
                setTimeout(
                    function(){
                        this.setState({modal:false});
                    }
                    .bind(this),
                    1500
                )
                
            }).catch(error=>{
                
                this.setState({spinner:false})
            })
            })
        }
        else{
            this.setState({modal:true, modalInfo:"ITEM ALREADY IN CART",spinner:false});

            setTimeout(
                function(){
                    this.setState({modal:false});
                }
                .bind(this),
                1500
            )
        
        }
        
        
}
    
//search

    search=(searchValue)=>{
    axios.get('https://backend-api.martekgh.com/api/search/item',
    {params:{search:searchValue}})
    .then(res=>{
      this.setState({
        searchResults:res.data,
        searchValue:searchValue,
      })
    })
    .catch(error=>{
    })
  }
    
    
    render(){
        
        return(
            <ProductContext.Provider value={{
                ...this.state,
                addToCart:this.addToCart,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart,
                search:this.search,
                logout:this.logout,
                shopLogout:this.shopLogout,
                follow:this.follow,
                unfollow:this.unfollow,
                closeFollowModal:this.closeFollowModal
            }}>
               

                {this.props.children}
                <div style={{
                    display:"flex",
                    justifyContent:"center",
                    width:"100vh"
                }}>
                    <Modal isOpen={this.state.modal} toggle={this.toggle} style={{maxHeight:"40px", maxWidth:"500px"}} className="alert-modal">
                        <ModalBody style={{ color: "white", fontSize: "12px", fontWeight: 500 }} className="text-center">
                           {this.state.modalInfo}!
                        </ModalBody>
                    </Modal>
                </div>
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;



export {ProductProvider,ProductConsumer,ProductContext};