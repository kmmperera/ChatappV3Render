
import axios from 'axios';
import store from "../store";
const api=process.env.REACT_APP_API || "http://localhost:2000/api";
const token = window.localStorage.getItem("token");
const apilink = axios.create({
  baseURL: api,
  headers: {
    Authorization: token ? `Bearer ${token}` : "",
  },
 
});

apilink.interceptors.request.use((req) => {
  const { auth } = store.getState();
  if (auth.token) {
    req.headers.Authorization = `Bearer ${auth.token}`;
  }
  return req;
});

apilink.interceptors.response.use(
  (res) => {
    return res;
  },
  (error) => {
	  const status = error.response ? error.response.status : 400 ;
	  if (status && status === 401) {
      localStorage.clear();
      store.dispatch({ type:"logout"});
    }
    console.log(error.response);
    
    return Promise.reject(error);
  }
);



export default apilink;
