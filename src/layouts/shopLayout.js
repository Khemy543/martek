import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ExamplesNavbar from "../components/Navbars/ExamplesNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter.js" ;

import PageNotFound from "../views/PageNotFound.js";
import ProtectedRoute from '../ProtectedRoutes.js';
import ProtectedShopRoute from '../ProtectedShopRoutes.js';
import ProtectedLoginRoute from '../ProtectedLoginRoutes.js';
import ProtectedShopLoginRoute from '../ProtectedShopLoginRoutes.js';

import routes from "../layoutRoutes.js";


class ShopLayout extends React.Component{
    getRoutes = routes => {
        return routes.map((prop, key) => {
          if (prop.layout === "/shop") {
              if(prop.protectedShopRoute === true){
                return(
                    <ProtectedShopRoute
                    path={prop.layout + prop.path}
                    component={prop.component}
                    key={key}
                    />
                )
              }
              else
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
        <ExamplesNavbar />
        <Switch>
            {this.getRoutes(routes)}
            <Redirect from="*" to="/shop/shop-page" />
        </Switch>
        <DemoFooter />
        </div>
    );
}
}
export default ShopLayout;