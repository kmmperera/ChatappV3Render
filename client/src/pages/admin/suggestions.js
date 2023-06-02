import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateuser,signout} from '../../actions/authactions';
import Navigation from '../../ui/navigation';
import Footer from '../../ui/footer';
import { Link } from 'react-router-dom'
import './form.css';
const uploadsurl=process.env.REACT_APP_IMG;
const api=process.env.REACT_APP_API;
 const Suggestions=(props)=>{
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const {user :userred}=auth;
	
	
    useEffect(() => {
   
     
	console.log(auth.error);
	
  }, []);
  
 
	const logout=()=>{dispatch(signout());}
	return(
		<>
		<Navigation>
		<h1>Suggestions</h1>
	</Navigation>
	<Footer></Footer>
	</>
	);

}
export default Suggestions;
