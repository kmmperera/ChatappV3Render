import { useDispatch, useSelector } from "react-redux";
import {getallusers} from '../../actions/admin/getuseractions';
import {getworkdetails} from '../../actions/workactions';
import React, { useState,useEffect } from "react";
import Navigation from '../../ui/navigation';
import Footer from '../../ui/footer';
const Allusers=(props)=>{
	const dispatch=useDispatch();
	const allusers=useSelector((state)=>{return state.users});
	const work=useSelector((state)=>{return state.work});
	const auth=useSelector((state)=>{return state.auth});
	const {user :userred}=auth;
	useEffect(()=>{
		 dispatch(getallusers());
		console.log(auth.loggedin);
		
		
	},[]);
	useEffect(()=>{
		
		console.log(work.workdetails);
		console.log(userred.firstName);
		
	},[work.workdetails]);
	const getusers=()=>{
		dispatch(getallusers());
	}
	const getwork=(e)=>{
		let user={_id:e.target.getAttribute('name')};
		dispatch(getworkdetails(user));
		console.log(user);
	}
if(userred.role !== "admin"){
	return (
	<>
	<Navigation>
		<div><h1  style={{color:"#009DDC",margin:"50px"}}>Please login as Admin  </h1></div>
	</Navigation>

	</>
	);
	
}
	return(
		<>
		<Navigation>
		<p>{!auth.loggedin && (auth.loggedin)}</p>
	<div>
	<div>{allusers.users&&(<div className="userwrapper" style={{display:"flex", flexWrap: "wrap",}}>{allusers.users.map((u,index)=>{return(<div key={index} name={u._id} onClick={getwork} style={{margin:"30px",borderRadius:"5px",border:"1px solid grey",padding:"20px",fontSize:"20px",cursor: "pointer",}}>{u.firstName}</div>)})}</div>)}</div>
	<div>{work.workdetails.length > 0 &&(<div className="detailwrapper" style={{display:"flex",flexWrap: "wrap",}}>{work.workdetails.map((w,index)=>{return(<div  key={index}  style={{margin:"20px",border:"1px solid",borderRadius:"5px",color:"white",backgroundColor:"#44A1A0",fontSize:"20px",padding:"20px",}}>
<p>PLACE : {w.place}</p> 
<p>DATE : {w.date}</p> 
<p>FROM : {w.from}</p> 
<p>TO : {w.to}</p> 
<p>HOURS : {w.hours}</p>
</div>)})}</div>)}</div>
	</div>
	</Navigation>
	<Footer></Footer>
	</>
	);
}
export default Allusers;
