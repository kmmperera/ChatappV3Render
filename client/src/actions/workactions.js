import axios from './api';
//import axios from 'axios';

const getworkdetails = (user) => {
  return async (dispatch) => {
    
     let res;
	 try{
	 res=await axios.post("/getworkdetails",user);
	 
	 if (res.status === 200) {
		 
		 let{workdetails: payload}= res.data;
		  dispatch({ type: "workdetailssuccess",payload});
	 }
	 else {
		 let{error}= res.data;
		 dispatch({ type: "workdetailsfailed",payload:{error}});
	 }
	 }
	 catch(error){dispatch({ type: "workdetailsfailed",payload:{error}});}
  };
};

const putworkdetails = (details) => {
  return async (dispatch) => {
    
     let res;
	 try{
	 res=await axios.post("/putworkdetails",details);
	 
	 if (res.status === 200) {
		 
		 let{workdetails: payload}= res.data;
		  dispatch({ type: "workdetailssuccess",payload});
	 }
	 else {
		 let{error}= res.data;
		 dispatch({ type: "workdetailsfailed",payload:{error}});
	 }
	 }
	 catch(error){dispatch({ type: "workdetailsfailed",payload:{error}});}
  };
};

export {getworkdetails,putworkdetails};
