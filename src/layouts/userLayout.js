import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import IndexNavbar from "../components/Navbars/IndexNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter.js";
import ProtectedRoute from '../ProtectedRoutes.js';
import ProtectedLoginRoute from '../ProtectedLoginRoutes.js';
import ScrollToTop from "react-scroll-up";

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
        <DemoFooter prop = {this.props}/>
        <ScrollToTop showUnder={160}>
          <span style={{backgroundColor:"#eaeaea", border:"1px solid rgb(214 213 213)" , zIndex:"999999",  textAlign:"center", padding:"5px 5px 5px 5px"}}>
            <i className="fa fa-chevron-up"></i>
          </span>
        </ScrollToTop>
        </div>
    );
}
}
export default UserLayout;