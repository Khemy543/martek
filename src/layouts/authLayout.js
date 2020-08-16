import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import ProtectedRoute from '../ProtectedRoutes.js';
import ProtectedShopRoute from '../ProtectedShopRoutes.js';
import ProtectedLoginRoute from '../ProtectedLoginRoutes.js';
import ProtectedShopLoginRoute from '../ProtectedShopLoginRoutes.js';

import routes from "../layoutRoutes.js";


class AuthLayout extends React.Component{
    getRoutes = routes => {
        return routes.map((prop, key) => {
          if (prop.layout === "/auth") {
              if(prop.protectedLogin === true){
                  return(
                      <ProtectedLoginRoute
                      path={prop.layout + prop.path}
                      component={prop.component}
                      key={key}
                      />
                    )
              }else if(prop.protectedShopLogin === true){
                  return(
                      <ProtectedShopLoginRoute
                      path={prop.layout + prop.path}
                      component={prop.component}
                      key={key}
                      />
                  )
              }
            return (
              <Route
                path={prop.layout + prop.path}
                component={prop.component}
                key={key}
              />
            );
          } else {
            return null;
          }
        });
      };
    render(){
    return(
        <div>
        <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/auth/login-page" />
        </Switch>
        </div>
    );
}
}
export default AuthLayout;