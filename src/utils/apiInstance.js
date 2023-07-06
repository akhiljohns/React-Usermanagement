
import axios from 'axios'


const apiInstance = axios.create({
    baseURL: 'http://localhost:4000', 
    // timeout: 5000, 
    // headers: {
    //   'Content-Type': 'application/json',
    // },
    withCredentials:true
  });
  
  export default apiInstance;




  