import React from 'react'
import { Redirect, Route } from 'react-router-dom'
const isAuthenticated = localStorage.getItem('access_token');

const ProtectedRoute = ({ component : Component, ...rest }) => {

    return (
        <Route { ...rest } render = {
            (props) => {
                if(isAuthenticated){
                    return <Component {...props} {...rest} />
                }else{
                    console.log('here', props);
                    return <Redirect  
                        to={
                            {
                                pathname:`/auth/login-page`,
                                state : {
                                    redirect_url : props.location.pathname
                                }
                            }
                        }
                    />
                }
            }
        } />
    )
} 

export default ProtectedRoute;