import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {putworkdetails} from '../actions/workactions';
import Navigation from '../ui/navigation';
import Footer from '../ui/footer';
import './form.css';
const Workhours=(props)=>{
	const[date,setDate]=useState("");
	const[place,setPlace]=useState("");
	const[from,setFrom]=useState("");
	const[to,setTo]=useState("");
	const[hours,setHours]=useState("");
	const auth=useSelector((state)=>{return state.auth});
	const user=auth.user;
	const id=user._id;
	const dispatch = useDispatch();
	const submitfunc=()=>{
		let workdetails={date,place,from,to,hours,id};
		dispatch(putworkdetails(workdetails));
		console.log(workdetails);
		cleanupfunc();
	}
	const cleanupfunc=()=>{
		setDate("");
		setPlace("");
		setFrom("");
		setTo("");
		setHours("");
	}
	
	return(
	<>
	<Navigation>
	<div><h1 style={{color:"#009DDC",textAlign:"center",marginTop:"20px",}}>What you did today ?</h1></div>
	<div className="compwrapper" style={{margin:"100px",display: "flex",alignItems: "center",justifyContent: "center"}}>
	
	<div  className="formwrapper">
	<div><span>Date</span><input type="text" name="date" value={date} onChange={(e)=>{setDate(e.target.value)}}/></div><br/>
	<div><span>Place</span><input type="text" name="place" value={place} onChange={(e)=>{setPlace(e.target.value)}}/></div><br/>
	<div><span>From</span><input type="text" name="from" value={from} onChange={(e)=>{setFrom(e.target.value)}}/></div><br/>
	<div><span>To</span><input type="text" name="to" value={to} onChange={(e)=>{setTo(e.target.value)}}/></div><br/>
	<div><span>Hours</span><input type="text" name="hours" value={hours} onChange={(e)=>{setHours(e.target.value)}}/></div><br/>
	<div><input type="submit"  value="SUBMIT" onClick={submitfunc}/></div><br/>
	</div>
	
	</div>
	
	</Navigation>
	<Footer></Footer>
	</>
	);
	
}

export default Workhours;
