import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {signin} from '../actions/authactions';
import Navbar from './subcomponents/newsubcomponents/navbar';

import Userdetails from "./userdetails";
import Navigation from '../ui/navigation';
import Footer from '../ui/footer';
// import './form.css';
 const Signin=(props)=>{
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const[username,setUsername]=useState("");
	const[password,setPassword]=useState("");
	const mystyle={marginTop:"20px"};
	const {user :userred}=auth;
	
	useEffect(() => {
   
      console.log(userred.firstName);
    
	console.log(auth.error);
  }, [userred.firstName,auth.error]);
	
	const submitfunc=(e)=>{
		e.preventDefault();
		const user={username,password};
		dispatch(signin(user));
		cleanupfunc();
	}
	const cleanupfunc=()=>{
		setUsername("");
		setPassword("");
		}
	return(
		<>
		<Navbar/>
		<div className="App" style={{display:"flex",alignItems:"center",justifyContent:"center",height:"400px"}}>
      <header className="App-header">
       <div className="formwrapper">
		<div className="inputs" style={mystyle} >
			<label>EMAIL</label>
			<input  type="text" value={username} onChange={(e)=>{setUsername(e.target.value);}}/>
		</div>
	    <div className="inputs" style={mystyle}>
			<label>PASSWORD</label>
			<input type="text"  value={password} onChange={(e)=>{setPassword(e.target.value);}}/>
	    </div>
		<div> <input type="submit" value="SUBMIT" onClick={submitfunc}/></div>
	   </div>
	  
	   
		
      </header>
    </div>
	
	
	</>
	);

}
export default Signin;
