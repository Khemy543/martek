/*

=========================================================
* Now UI Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/now-ui-kit-react
* Copyright 2019 Creative Tim (http://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/now-ui-kit-react/blob/master/LICENSE.md)

* Designed by www.invisionapp.com Coded by www.creative-tim.com

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/


import React from 'react';
import ReactDOM from 'react-dom';
import App from './App.js';
import { ProductProvider } from "./context";
import * as serviceWorker from './serviceWorker';
import axios from "axios";
/* axios.interceptors.request.use(request=>{
  console.log(request);
  return request;
})
 

axios.interceptors.response.use(
    response=>{
  console.log(response);
  return response;
},
error=>{
    console.log(error);
    if(!error.response){
        alert("Please Check Your Internet Connection")
    }
}) */

ReactDOM.render(
  <ProductProvider>
  <React.StrictMode>
    <App />
  </React.StrictMode>
  </ProductProvider>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();