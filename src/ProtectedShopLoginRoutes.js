import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedShopLoginRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('ShopData')
        
       
        if(isAuthenticated === null){
            return (
                <Component />
        );} 
        else{
        return(
            
            <Redirect to={{ pathname: '/shop/shop-page' }} />
        );}
    }
}

export default ProtectedShopLoginRoute;  