import axios from 'axios';
let token  = localStorage.getItem('access_token');


let API =  axios.create({
  baseURL: 'https://backend-api.martekgh.com/api/',
  headers:{
      "Content-Type": "application/json",
      "Accept": "application/json"
  }
})
API.interceptors.request.use(
  config => {
    const token = localStorage.getItem("authToken");
    if(token){
      config.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

API.interceptors.response.use(
  response => {
    if(response.status === 200 || response.status === 201) {
      return Promise.resolve(response);
    }else {
      return Promise.reject(response);
    }
  },

  error => {
    if(error.response && error.response.status){
      switch (error.response.status) {
        case 400:
          return;
        
        case 401:
          router.replace({
            path:"/auth/login",
            query : {redirectUrl : }
          });
          break;
        
        case 500:
          alert('500 error');
          break;
          
      }
    }
    return Promise.reject(error.response);
  }
);
export default API;