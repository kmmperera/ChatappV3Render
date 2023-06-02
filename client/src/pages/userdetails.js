import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateuser,signout} from '../actions/authactions';
import Navigation from '../ui/navigation';
import Footer from '../ui/footer';
import { Link } from 'react-router-dom'
import './form.css';
const uploadsurl=process.env.REACT_APP_IMG;
const api=process.env.REACT_APP_API;
 const Userdetails=(props)=>{
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const {user :userred}=auth;
	
	const[firstname,setFirstname]=useState(userred.firstName);
	const[lastname,setLastname]=useState(userred.lastName);
	const[email,setEmail]=useState(userred.email);
	const[password,setPassword]=useState("");
	const[pic,setPic]=useState();
	
	
	const mystyle={marginTop:"20px"};
	
	const picurl= `${userred.pofilePicture}`;
	
	
	useEffect(() => {
   
      console.log(userred.firstName);
	 // console.log(picurl);
   // const picurl= `http://localhost:2000/${userred.pofilePicture}`;
	console.log(auth.error);
	console.log(uploadsurl);
	console.log(api);
  }, [userred.firstName,auth.error]);
  
  useEffect(() => {
   	setFirstname(userred.firstName);
	setLastname(userred.lastName);
	setEmail(userred.email);
	
  }, [auth.user]);
  

	
	const submitfunc=()=>{
		//e.preventDefault();
		//const user={firstname,lastname,email,password};
		/* const form= new FormData();
		form.append("firstname", firstname);
		form.append("lastname", lastname);
		form.append("email", email);
		form.append("password", password); */
		




		//dispatch(updateuser(user));
		dispatch(updateuser({firstname,lastname,email,password}))
	}
	/* const handlepic = (e) => {
    setPic( e.target.files[0]);
  };
  <div><span style={{marginBottom:"20px",display:"block"}}>CHANGE PROFILE PICTURE</span><input type="file" name="pic"  onChange={handlepic} /></div> */
  
	const logout=()=>{dispatch(signout());}
	return(
		<>
		<Navigation>
		<div><h1 style={{color:"#009DDC",textAlign:"center",marginTop:"20px",}}>Edit your info</h1></div>
		<div className="App" style={{display:"flex",alignItems:"center",justifyContent:"center"}}>
      <header className="App-header">
       <div className="formwrapper" style={{marginTop:"50px",}}>
	<div><img  style={{position:"relative",maxHeight:"100px",maxWidth:"100px",}} src={picurl} /> </div>
		<div className="inputs" style={mystyle} >
			<span>First Name</span>
			<input  type="text" value={firstname} onChange={(e)=>{setFirstname(e.target.value);}}/>
		</div>
		<div className="inputs" style={mystyle} >
			<span>Last Name</span>
			<input  type="text" value={lastname} onChange={(e)=>{setLastname(e.target.value);}}/>
		</div>
		<div className="inputs" style={mystyle} >
			<span>Email</span>
			<input  type="text" value={email} onChange={(e)=>{setEmail(e.target.value);}}/>
		</div>
	    <div className="inputs" style={mystyle}>
			<span>PASSWORD</span>
			<input type="text"  value={password} onChange={(e)=>{setPassword(e.target.value);}}/>
	    </div>
		
		
		<div> <input type="submit" value="SUBMIT" onClick={submitfunc}/></div>
	   </div>
	   
	    
	    <div>{auth.error && (<h1>ERROR OCCURED</h1>) } </div>
		 
      </header>
    </div>
	</Navigation>
	<Footer></Footer>
	</>
	);

}
export default Userdetails;
