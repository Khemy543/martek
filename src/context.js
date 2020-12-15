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


class ProductProvider extends React.Component{
    
    state={
        setElectronics:[],
        setFoods:[],
        setPhones:[],
        setFashion:[],
        setHome:[],
        setBeauty:[],
        setGames:[],
        setSkills:[],
        setEntertianment:[],
        setOthers:[],
        allProducts:[],
        products: [],
        nextProducts:[],
        detailProduct : [],
        cart:[],
        cartSubTotal:0,
        cartTax:0,
        cartTotal:0,
        searchResults:[],
        searchShopResults:[],
        allCategories:[],
        Token:"",
        spinner:false,
        modal:false,
        modalInfo:"",
        setShops:[],
        followShops:[],
        followLoader:false,
        followingLoader:false,
        indexFashion:[],
        prediction:[],
        shopPredicition:[],
        id:"",
        searchValue:""
    }

    toggle=()=>{
        this.setState({modal:!this.state.modal}) 
    }
    componentWillMount(){
        user = localStorage.getItem('access_token')
        user_id = localStorage.getItem("user_id");
        
    }
    
    componentWillUpdate(){
        user = localStorage.getItem('access_token')
        user_id = localStorage.getItem("user_id");

    }

    componentDidUpdate(){
        user = localStorage.getItem('access_token')
        user_id = localStorage.getItem("user_id");

    }

    componentDidMount(){
        user = localStorage.getItem('access_token')
        user_id = localStorage.getItem("user_id");


        this.isTokenExpired();
        this.isShopTokenExpired();
        this.getFollowingShops();


        /* localStorage.clear(); */

        axios.get("https://backend-api.martekgh.com/api/user-cart",{headers:{'Authorization':`Bearer ${user}`}})
        .then(res=>{
            if(res.data !== null){
                this.setState({cart:res.data.cart[0], cartTotal:res.data.cart[1], spinner:false});
            }
        }).catch(error=>{
            
        });

        
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

    //get following shops

    getFollowingShops(){
        this.setState({spinner:true})
        axios.get("https://backend-api.martekgh.com/api/following-shops",{headers:{'Authorization':`Bearer ${user}`}})
        .then(res=>{
            return(this.setState({followShops:res.data, spinner:false}))
            
        })
        .catch(error=>{
            
            this.setState({spinner:false})
        })
    }
    

    follow = (id)=>{
        user = localStorage.getItem('access_token')
    
           axios.post("https://backend-api.martekgh.com/api/follow/"+id+"/shop",null,{headers:{
            "Authorization":`Bearer ${user}`}})
            .then(res=>{
                
                axios.get("https://backend-api.martekgh.com/api/following-shops",{headers:{'Authorization':`Bearer ${user}`}})
                .then(res=>{
                    console.log(res.data)
                    return(this.setState({followShops:res.data}))
                })
                .catch(error=>{
                    
                    
                })
            })
            .catch(error=>{
            })
        }

    unfollow=(id)=>{
        user = localStorage.getItem('access_token')
        this.setState({loader:true})
        axios.post("https://backend-api.martekgh.com/api/unfollow/"+id+"/shop",null,{headers:{
            "Authorization":`Bearer ${user}`}})
            .then(res=>{
                
                axios.get("https://backend-api.martekgh.com/api/following-shops",{headers:{'Authorization':`Bearer ${user}`}})
                .then(res=>{
                    console.log(res.data)
                    return(this.setState({followShops:res.data, loader:false}))
                })
                .catch(error=>{
                    
                })
            })
            .catch(error=>{
                console.log(error.response.data)
            })
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
        window.location.reload("/");
        this.setState({spinner:false});
      })
      .catch(error=>{
        
        this.setState({spinner:false})
      })
}
    //copies of nextProducts
    
/*
//copies of SliderProducts
setProducts =() =>{
    let tempSliderProducts = [];
    data.slice(6,9).forEach(item =>{
        const singleItem = {...item};
    tempSliderProducts=[...tempSliderProducts, singleItem];
    });
    this.setState(()=>{
        return{sliderProducts:tempSliderProducts};
    });
}; */

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
        //let tempProducts = [...this.state.products, ...this.state.nextProducts, ...this.state.setElectronics];
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
    //addTotals
    /* addTotal = (id)=>{
        let SubTotal=0;
        this.state.cart.map(item=>(SubTotal += item.total))
        const tempTax = SubTotal * 0.1;
        const Tax = parseFloat(tempTax.toFixed(2));
        const total = SubTotal + Tax;
        this.setState(()=>{
            return{
                cartSubTotal: SubTotal,
                cartTax:Tax,
                cartTotal:total
            }
        })
    } */
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
            //product.in_cart=true;
            product.quantity=1;
            const price=product.price;
            product.total=price;
            
            var total = parseFloat(this.state.cartTotal) + parseFloat(product.total);
            
            this.setState(()=>{
                return {
                    cart:[...this.state.cart, product], cartTotal:total
                };
            },
            function postcart() {
                console.log('cart:',this.state.cart)
                const cart = [this.state.cart, this.state.cartTotal];
                console.log(cart)
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
                //this.setState({modal:true, modalInfo:"PLEASE SIGN IN", spinner:false})
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
        if(searchValue === ""){
            this.setState(()=>{
                return{searchResults:[]}
            })
        }else{
        let newSearchValue = searchValue.toLowerCase();
        let tempProducts = [...this.state.setElectronics, ...this.state.setFoods,...this.state.setPhones,...this.state.setBeauty,...this.state.setEntertianment, ...this.state.setFashion,...this.state.setGames,...this.state.setHome,...this.state.setOthers,...this.state.setSkills];
        
        const search = _.filter(tempProducts, (item)=>{
            return this.searchQuery(item, newSearchValue)
        });
        
        this.setState(()=>{
            return{searchResults:search, searchValue:searchValue};
        })
        
    }
}

    searchQuery=(item,newSearchValue)=>{
        console.log("item",item)
        const{product_name,product_description} = item

        if((product_name.toLowerCase().includes(newSearchValue)) || (product_name.toUpperCase().includes(newSearchValue)) || (product_description.toLowerCase().includes(newSearchValue)) || (product_description.toUpperCase().includes(newSearchValue))){
            return true;
        }
        return false;
    }


    //search shops
    searchShop=(searchValue)=>{
        if(searchValue === ""){
            this.setState(()=>{
                return{searchShopResults:[]}
            })
        }else{
        let newSearchValue = searchValue.toLowerCase();
        let tempShops = [...this.state.setShops];
        const search = _.filter(tempShops, (item)=>{
            return this.searchShopsQuery(item, newSearchValue)
        });
        
        this.setState(()=>{
            return{searchShopResults:search,searchValue:searchValue};
        })
        
    }
}

    searchShopsQuery=(item,newSearchValue)=>{
        const{company_name,company_description} = item

        if((company_name.toLowerCase().includes(newSearchValue)) || (company_name.toUpperCase().includes(newSearchValue)) || (company_description.toLowerCase().includes(newSearchValue)) || (company_description.toUpperCase().includes(newSearchValue))){
            return true;
        }
        return false;
    }

    seacrhPrediction=(searchValue) =>{
        if(searchValue === ""){
            this.setState(()=>{
                return{prediction:[]}
            })
        }else{
        let newSearchValue = searchValue.toLowerCase();
        let tempProducts = [...this.state.setElectronics, ...this.state.setFoods,...this.state.setPhones,...this.state.setBeauty,...this.state.setEntertianment, ...this.state.setFashion,...this.state.setGames,...this.state.setHome,...this.state.setOthers,...this.state.setSkills];
        const search = _.filter(tempProducts, (item)=>{
            return this.searchQuery(item, newSearchValue)
        });
        console.log(search)
        this.setState(()=>{
            return{prediction:search};
        })
    }
}

searchShopPrediction=(searchValue)=>{
    if(searchValue === ""){
        this.setState(()=>{
            return{shopPredicition:[]}
        })
    }else{
    let newSearchValue = searchValue.toLowerCase();
    let tempShops = [...this.state.setShops];
    const search = _.filter(tempShops, (item)=>{
        return this.searchShopsQuery(item, newSearchValue)
    });
    
    this.setState(()=>{
        return{shopPredicition:search};
    })
    
}
}




    
    
    render(){
        
        return(
            <ProductContext.Provider value={{
                ...this.state,
                handleDetail:this.handleDetail,
                addToCart:this.addToCart,
                increment:this.increment,
                decrement:this.decrement,
                removeItem:this.removeItem,
                clearCart:this.clearCart,
                search:this.search,
                searchShop:this.searchShop,
                logout:this.logout,
                follow:this.follow,
                unfollow:this.unfollow,
                searchPrediction:this.seacrhPrediction,
                searchShopPrediction:this.searchShopPrediction,
                handleSubmit:this.handleSubmit
                
            }}>
               

                {this.props.children}
                <Container>
                <Col className="ml-auto mr-auto" md="12">
                    <Modal isOpen={this.state.modal} toggle={this.toggle} style={{maxHeight:"40px", maxWidth:"300px"}} className="alert-modal">
                        <ModalBody>
                            <h4 style={{textAlign:"center", marginTop:"-3%", fontWeight:"500", color:"white", fontSize:"15px"}}>{this.state.modalInfo}!!</h4>
                        </ModalBody>
                    </Modal>
                </Col>
                </Container>
            </ProductContext.Provider>
        );
    }
}

const ProductConsumer = ProductContext.Consumer;



export {ProductProvider,ProductConsumer};