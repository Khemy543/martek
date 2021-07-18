
import React from "react";

// styles
import "bootstrap/dist/css/bootstrap.min.css";
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

    
    render(){
        return(
          <Routes/>
        );
    }
}

export default App;
