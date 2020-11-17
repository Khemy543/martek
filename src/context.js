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
        this.setProducts();
        this.getFollowingShops();
        //products
        this.getElectronics();
        this.getPhones();
        this.getFashion();
        this.getHome();
        this.getBeauty();
        this.getFood();
        this.getGames();
        this.getSkills();
        this.getEntertainment();
        this.getOthers();

        this.getShops();

/* 
        localStorage.clear(); */

        axios.get("https://martek.herokuapp.com/api/user-cart",{headers:{'Authorization':`Bearer ${user}`}})
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
        axios.get("https://martek.herokuapp.com/api/following-shops",{headers:{'Authorization':`Bearer ${user}`}})
        .then(res=>{
            return(this.setState({followShops:res.data, spinner:false}))
            
        })
        .catch(error=>{
            
            this.setState({spinner:false})
        })
    }
    

    //get Electronics
    getElectronics=()=>{
        let last_page = null;
        axios.get("https://martek.herokuapp.com/api/category/1/products")
        .then(res=>{
           last_page = res.data.meta.last_page;
        
        
        var pageNumber = 1;
        let product = [];
        for(pageNumber = 1; pageNumber<=last_page; pageNumber++){
        axios.get("http://martek.herokuapp.com/api/category/1/products?page="+pageNumber+"")
        .then(res=>{
            
            product.push(...res.data.data[0]);
        })
        .catch(error=>{
            
        })  
    }
    
    this.setState(()=>{
        return{setElectronics:product};
    });
});
    
}


//get Phones
getPhones=()=>{
    let last_page = null;
    axios.get("https://martek.herokuapp.com/api/category/2/products")
    .then(res=>{
       last_page = res.data.meta.last_page;
    
    
    var pageNumber = 1;
    let product = [];
    for(pageNumber = 1; pageNumber<=last_page; pageNumber++){
    axios.get("http://martek.herokuapp.com/api/category/2/products?page="+pageNumber+"")
    .then(res=>{
        
        product.push(...res.data.data[0]);
    })
    .catch(error=>{
        
    })  
}

this.setState(()=>{
    return{setPhones:product};
});
});

}


//get Fashion
getFashion=()=>{
    let last_page = null;
    axios.get("https://martek.herokuapp.com/api/category/3/products")
    .then(res=>{
       last_page = res.data.meta.last_page;
    
    
    var pageNumber = 1;
    let product = [];
    for(pageNumber = 1; pageNumber<=last_page; pageNumber++){
    axios.get("http://martek.herokuapp.com/api/category/3/products?page="+pageNumber+"")
    .then(res=>{
        
        product.push(...res.data.data[0]);
    })
    .catch(error=>{
        
    })  
}

this.setState(()=>{
    return{setFashion:product};
});
});

}

//get Home
getHome=()=>{
    let last_page = null;
    axios.get("https://martek.herokuapp.com/api/category/4/products")
    .then(res=>{
       last_page = res.data.meta.last_page;
    
    
    var pageNumber = 1;
    let product = [];
    for(pageNumber = 1; pageNumber<=last_page; pageNumber++){
    axios.get("http://martek.herokuapp.com/api/category/4/products?page="+pageNumber+"")
    .then(res=>{
        
        product.push(...res.data.data[0]);
    })
    .catch(error=>{
        
    })  
}

this.setState(()=>{
    return{setHome:product};
});
});

}

//get Beauty
getBeauty=()=>{
    let last_page = null;
    axios.get("https://martek.herokuapp.com/api/category/5/products")
    .then(res=>{
       last_page = res.data.meta.last_page;
    
    
    var pageNumber = 1;
    let product = [];
    for(pageNumber = 1; pageNumber<=last_page; pageNumber++){
    axios.get("http://martek.herokuapp.com/api/category/5/products?page="+pageNumber+"")
    .then(res=>{
        
        product.push(...res.data.data[0]);
    })
    .catch(error=>{
        
    })  
}

this.setState(()=>{
    return{setBeauty:product};
});
});

}

//get Food
getFood=()=>{
    let last_page = null;
    axios.get("https://martek.herokuapp.com/api/category/6/products")
    .then(res=>{
       last_page = res.data.meta.last_page;
    
    
    var pageNumber = 1;
    let product = [];
    for(pageNumber = 1; pageNumber<=last_page; pageNumber++){
    axios.get("http://martek.herokuapp.com/api/category/6/products?page="+pageNumber+"")
    .then(res=>{
        
        product.push(...res.data.data[0]);
    })
    .catch(error=>{
        
    })  
}

this.setState(()=>{
    return{setFoods:product};
});
});

}


//get Games
getGames=()=>{
    let last_page = null;
    axios.get("https://martek.herokuapp.com/api/category/7/products")
    .then(res=>{
       last_page = res.data.meta.last_page;
    
    
    var pageNumber = 1;
    let product = [];
    for(pageNumber = 1; pageNumber<=last_page; pageNumber++){
    axios.get("http://martek.herokuapp.com/api/category/7/products?page="+pageNumber+"")
    .then(res=>{
        
        product.push(...res.data.data[0]);
    })
    .catch(error=>{
        
    })  
}

this.setState(()=>{
    return{setGames:product};
});
});

}

//get skills
getSkills=()=>{
    let last_page = null;
    axios.get("https://martek.herokuapp.com/api/category/8/products")
    .then(res=>{
       last_page = res.data.meta.last_page;
    
    
    var pageNumber = 1;
    let product = [];
    for(pageNumber = 1; pageNumber<=last_page; pageNumber++){
    axios.get("http://martek.herokuapp.com/api/category/8/products?page="+pageNumber+"")
    .then(res=>{
        
        product.push(...res.data.data[0]);
    })
    .catch(error=>{
        
    })  
}

this.setState(()=>{
    return{setSkills:product};
});
});

}

//get Entertainment
getEntertainment=()=>{
    let last_page = null;
    axios.get("https://martek.herokuapp.com/api/category/9/products")
    .then(res=>{
       last_page = res.data.meta.last_page;
    
    
    var pageNumber = 1;
    let product = [];
    for(pageNumber = 1; pageNumber<=last_page; pageNumber++){
    axios.get("http://martek.herokuapp.com/api/category/9/products?page="+pageNumber+"")
    .then(res=>{
        
        product.push(...res.data.data[0]);
    })
    .catch(error=>{
        
    })  
}

this.setState(()=>{
    return{setEntertianment:product};
});
});

}

//get Others
getOthers=()=>{
    let last_page = null;
    axios.get("https://martek.herokuapp.com/api/category/10/products")
    .then(res=>{
       last_page = res.data.meta.last_page;
    
    
    var pageNumber = 1;
    let product = [];
    for(pageNumber = 1; pageNumber<=last_page; pageNumber++){
    axios.get("http://martek.herokuapp.com/api/category/10/products?page="+pageNumber+"")
    .then(res=>{
        
        product.push(...res.data.data[0]);
    })
    .catch(error=>{
        
    })  
}

this.setState(()=>{
    return{setOthers:product};
});
});

}

//get Shops
getShops=()=>{
    let last_page = null;
    axios.get("https://martek.herokuapp.com/api/all-shops")
    .then(res=>{
       last_page = res.data.meta.last_page;
    
    
    var pageNumber = 1;
    let shops = [];
    for(pageNumber = 1; pageNumber<=last_page; pageNumber++){
    axios.get("http://martek.herokuapp.com/api/all-shops?page="+pageNumber+"")
    .then(res=>{
        shops.push(...res.data.data);
    })
    .catch(error=>{
        
    })  
}
this.setState(()=>{
    return{setShops:shops};
});
});

}

    
    //Electronics

    //copies of products
    setProducts =() =>{
       // localStorage.clear();
        axios.get("https://martek.herokuapp.com/api/2/product-index")
        .then(res=>{
            const categories = res.data[0];
            let tempProducts = [];
            categories.forEach(item =>{
                const singleItem = {...item};
            tempProducts=[...tempProducts, singleItem];
            });
            this.setState(()=>{
                return{products:tempProducts};
            });
        })

        axios.get("https://martek.herokuapp.com/api/3/product-index")
        .then(res=>{
            const categories = res.data[0];
            let tempProducts = [];
            categories.forEach(item =>{
                const singleItem = {...item};
            tempProducts=[...tempProducts, singleItem];
            });
            this.setState(()=>{
                return{indexFashion:tempProducts};
            });
        })

        axios.get("https://martek.herokuapp.com/api/1/product-index")
        .then(res=>{
            const nextProducts = res.data[0];
            let tempNextProducts = [];
            nextProducts.forEach(item =>{
                const singleItem = {...item};
            tempNextProducts=[...tempNextProducts, singleItem];
            });
            this.setState(()=>{
                return{nextProducts:tempNextProducts};
            });
        });
        
    };


    follow = (id)=>{
        user = localStorage.getItem('access_token')
    
           axios.post("https://martek.herokuapp.com/api/follow/"+id+"/shop",null,{headers:{
            "Authorization":`Bearer ${user}`}})
            .then(res=>{
                
                axios.get("https://martek.herokuapp.com/api/following-shops",{headers:{'Authorization':`Bearer ${user}`}})
                .then(res=>{
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
        axios.post("https://martek.herokuapp.com/api/unfollow/"+id+"/shop",null,{headers:{
            "Authorization":`Bearer ${user}`}})
            .then(res=>{
                
                axios.get("https://martek.herokuapp.com/api/following-shops",{headers:{'Authorization':`Bearer ${user}`}})
                .then(res=>{
                    return(this.setState({followShops:res.data, loader:false}))
                })
                .catch(error=>{
                    
                })
            })
            .catch(error=>{
                
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
    axios.post("https://martek.herokuapp.com/api/auth/logout", null, {
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
            axios.post("https://martek.herokuapp.com/api/user/"+user_id+"/add-cart", {cart}, {headers:{
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
                axios.post("https://martek.herokuapp.com/api/user/"+user_id+"/add-cart", {cart}, {headers:{
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
            axios.post("https://martek.herokuapp.com/api/user/"+user_id+"/add-cart", {cart}, {headers:{
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
            axios.post("https://martek.herokuapp.com/api/user/"+user_id+"/add-cart", {cart}, {headers:{
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
        axios.get("https://martek.herokuapp.com/api/product/"+id+"/details")
            .then(res=>{
                this.setState(()=>{
                    return {detailProduct:res.data}
                })
            })
            .catch(error=>{
            })
    }

    
    //handle inCart
    addToCart =(id) =>{
        this.setState({spinner:true})
        let tempProducts = [...this.state.setElectronics, ...this.state.setFoods,...this.state.setPhones,...this.state.setBeauty,...this.state.setEntertianment, ...this.state.setFashion,...this.state.setGames,...this.state.setHome,...this.state.setOthers,...this.state.setSkills];
        let tempCarts = [...this.state.cart];
        const cart_index = tempCarts.indexOf(this.getCartItem(id));
        if(cart_index === -1){
            const index = tempProducts.indexOf(this.getItems(id));
            const product = tempProducts[index];
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
                axios.post("https://martek.herokuapp.com/api/user/"+user_id+"/add-cart", {cart}, {headers:{
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
                    <h4 style={{textAlign:"center", marginTop:"-3%", fontWeight:"500", color:"white"}}>{this.state.modalInfo}!!</h4>
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