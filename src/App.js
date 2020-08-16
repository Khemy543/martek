/*!

=========================================================
* Paper Kit React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/paper-kit-react

* Copyright 2019 Creative Tim (https://www.creative-tim.com)
* Licensed under MIT (https://github.com/creativetimofficial/paper-kit-react/blob/master/LICENSE.md)

* Coded by Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/
import React from "react";

// styles
import "assets/css/bootstrap.min.css";
import "assets/scss/paper-kit.scss";
import "assets/demo/demo.css";
import "./App.css";

import "assets/css/paper-kit.css";
// Import css files
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
//route
import Routes from "./route.js";


class App extends React.Component{

  // fake authentication Promise
  authenticate(){
    return new Promise(resolve => setTimeout(resolve, 2000)) // 2 seconds
  }

    /* constructor(props){
        super(props);
    } */
    componentDidMount(){

        this.authenticate().then(() => {
            const ele = document.getElementById('ipl-progress-indicator')
            if(ele){
              // fade out
              ele.classList.add('available')
              setTimeout(() => {
                // remove from DOM
                ele.outerHTML = ''
              }, 2000)
            }
          })
    }
    
    render(){
        return(
          <Routes/>
        );
    }
}

export default App;
