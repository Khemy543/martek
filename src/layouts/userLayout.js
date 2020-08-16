import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter.js";
import ProtectedRoute from '../ProtectedRoutes.js';
import ProtectedLoginRoute from '../ProtectedLoginRoutes.js';

import routes from "../layoutRoutes.js";


class UserLayout extends React.Component{
    getRoutes = routes => {
        return routes.map((prop, key) => {
          if (prop.layout === "/user") {
              if(prop.protectedRoute === true){
                  return(
                      <ProtectedRoute
                      path={prop.layout + prop.path}
                      component={prop.component}
                      key={key}
                      />
                  )
              }else
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
        <IndexNavbar />
        <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/user/home" />
        </Switch>
        <DemoFooter />
        </div>
    );
}
}
export default UserLayout;