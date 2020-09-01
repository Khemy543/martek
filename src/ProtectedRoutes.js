import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('access_token')
        
       
        if(isAuthenticated === null){
            return (
                <Redirect to={{ pathname: '/auth/login-page' }} />
        );} 
        else{
        return(
            
            <Component />
        );}
    }
}

export default ProtectedRoute;  