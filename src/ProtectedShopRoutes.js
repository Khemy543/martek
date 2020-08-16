import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedShopRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('ShopData')
        
       
        if(isAuthenticated === null){
            return (
                <Redirect to={{ pathname: '/auth/shop-login' }} />
        );} 
        else{
        return(
            
            <Component />
        );}
    }
}

export default ProtectedShopRoute;  