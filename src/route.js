import React from "react";
//import ReactDOM from "react-dom";
import { Router, Route,Switch,Redirect } from "react-router-dom";
import SrollToTop from "react-router-scroll-top";
import history from "./history";

// pages


// others
import PageNotFound from "./views/PageNotFound.js";
import ProtectedRoute from './ProtectedRoutes.js';
import ProtectedShopRoute from './ProtectedShopRoutes.js';
import ProtectedLoginRoute from './ProtectedLoginRoutes.js';
import ProtectedShopLoginRoute from './ProtectedShopLoginRoutes.js';
import UserLayout from "./layouts/userLayout.js";
import ShopLayout from "./layouts/shopLayout.js";
import AuthLayout from "./layouts/authLayout.js";
import VerificationLayout from "./layouts/verificationLayout.js";





const Routes = () => {

    return(
            <Router history={history}>
            <SrollToTop/>
            <Switch>

            <Route path="/user" render={props => <UserLayout {...props} />} />
            <Route path="/shop" render={props => <ShopLayout {...props} />} />
            <Route path="/auth" render={props => <AuthLayout {...props} />} />
            <Route path="/api/auth" render={props => <VerificationLayout {...props} />} />
            <Redirect from= "/" to="/user/home" />
            <Route exact path="*" component={ PageNotFound } />
              
            </Switch>
          </Router>

        
    );
  };

  export default Routes;