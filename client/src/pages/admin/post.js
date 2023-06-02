import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {updateuser,signout} from '../../actions/authactions';
import {createpost,postByID} from '../../actions/admin/post';

import Navigation from '../../ui/navigation';
import Footer from '../../ui/footer';
import { Link } from 'react-router-dom'
import './form.css';
const uploadsurl=process.env.REACT_APP_IMG;
const api=process.env.REACT_APP_API;
 const Post=(props)=>{
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const postred = useSelector((state) => state.post);
	
	const [pid,setPid]=useState(props.match.params.pid);

	const {user :userred}=auth;
	
	
    
  
   useEffect(() => {
	let getpost={id:props.match.params.pid };
	dispatch(postByID(getpost));
	
  }, [props.match.params.pid ]);
  
   useEffect(() => {
	
	
  }, [postred.postbyid]);
  
 
	const logout=()=>{dispatch(signout());}
	
	if(userred && userred._id ==""){
		return(
		<>
		<Navigation>
		<div> <p style={{margin:"50px 100px",fontSize:"40px"}}>Please log in ...</p></div>
		</Navigation>
		
		<Footer></Footer>
		</>
		);
		
	}
	
	if( typeof pid !== 'undefined' || pid ==null || pid == ""){
		return(
		<>
		<Navigation>
		<div> <p style={{margin:"50px 100px",fontSize:"40px"}}>Please log in ...</p></div>
		</Navigation>
		
		<Footer></Footer>
		</>
		);
		
	}
	return(
		<>
		<Navigation>
		
		<div>
			{
					 Object.keys(postred.postbyid).map((p,index)=> (<p key={index}> {postred.postbyid[p].text} </p>))
			}
		</div>	
	</Navigation>
	<Footer></Footer>
	</>
	);

}
export default Post;
