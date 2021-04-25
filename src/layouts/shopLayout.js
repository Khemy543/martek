import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import ExamplesNavbar from "../components/Navbars/ExamplesNavbar.js";
import DemoFooter from "../components/Footers/DemoFooter.js" ;
import ScrollToTop from "react-scroll-up";
import ProtectedShopRoute from '../ProtectedShopRoutes.js';

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
        <DemoFooter prop={this.props}/>
        <ScrollToTop showUnder={160}>
          <span style={{backgroundColor:"#eaeaea", border:"1px solid rgb(214 213 213)" , textAlign:"center", padding:"5px 5px 5px 5px"}}>
            <i className="fa fa-chevron-up"></i>
          </span>
        </ScrollToTop>
        </div>
    );
}
}
export default ShopLayout;