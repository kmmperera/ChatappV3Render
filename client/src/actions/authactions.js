import axios from './api';
//import axios from 'axios';

const signin=(user)=>{
	return async (dispatch) => {
		let res;
		 dispatch({ type:"authenticating" });
		 try{
		res=await axios.post("/signin",{user});
		if (res.status === 200) {
			let{user,token}= res.data;
			   localStorage.setItem("user", JSON.stringify(user));
			   localStorage.setItem("token",token);

        dispatch({ type: "loginsuccess",payload:{user,token}});
		}
		else{
			const {error}=res.data;
			 dispatch({ type: "loginfailed",payload:{error}});
		}
		 }
		 catch(error){
			 
		dispatch({
        type: "loginfailed",
        payload: { error },
      });
		 }
	}
	
	
}

const signup=(user)=>{
	return async (dispatch) => {
		let res;
		 dispatch({ type:"authenticating" });
		 try{
		res=await axios.post("/signup",{user});
		if (res.status === 200) {
			let{user}= res.data;
        dispatch({ type: "signupsuccess",payload:{user}});
		}
		else{
			const {error}=res.data;
			 dispatch({ type: "signupfailed",payload:{error}});
		}
		 }
		 catch(error){
			 
		dispatch({
        type: "loginfailed",
        payload: { error },
      });
		 }
	}
	
	
}
const updateuser=(form)=>{
	
	return async (dispatch) => {
		let res;
		 dispatch({ type:"userupdating" });
		 try{
		res=await axios.post("/updateuser",form);
		if (res.status === 200) {
			let{user}= res.data;
			localStorage.setItem("user", JSON.stringify(user));
        dispatch({ type: "updatesuccess",payload:{user}});
		}
		else{
			const {error}=res.data;
			 dispatch({ type: "updatefailed",payload:{error}});
		}
		 }
		 catch(error){
			 
		dispatch({
        type: "updatefailed",
        payload: { error },
      });
		 }
	}
	
}
const isUserLoggedIn=()=>{
	
	return async (dispatch) => {
    const localstorage = localStorage.getItem("user");
    if (localstorage) {
      const user = JSON.parse(localStorage.getItem("user"));
      dispatch({ type: "loginsuccess",payload:{user}});
    } else {
      dispatch({ type: "loginfailed",payload:{error:"please log in"}});
    }
  };
	
}

 const signout = () => {
  return async (dispatch) => {
    
     localStorage.removeItem('user');
	 localStorage.removeItem('token');

	  dispatch({ type: "logout"});
    
  };
};


export {signin,signup,updateuser,isUserLoggedIn,signout};
