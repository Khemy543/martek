import React from 'react'
import { Redirect } from 'react-router-dom'

class ProtectedLoginRoute extends React.Component {

    render() {
        const Component = this.props.component;
        const isAuthenticated = localStorage.getItem('storageData')
        
       
        if(isAuthenticated === null){
            return (
                <Component />
        );} 
        else{
        return(
            
            <Redirect to={{ pathname: '/user/home' }} />
        );}
    }
}

export default ProtectedLoginRoute;  