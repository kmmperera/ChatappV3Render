import React, { useState,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from 'react-router-dom';
import {unfollow} from '../../actions/admin/getuseractions';

 const UserList=(props)=>{
	const dispatch = useDispatch();
	const auth = useSelector((state) => state.auth);
	const {user :userred}=auth;
	const [userlist,setUserlist] =useState([]);
	const[unfollowid,setUnfollowid]=useState("");
	const dummyimg="https://mernecombucket.s3.amazonaws.com/dAInx6qFL-nopic2.jpg";
    useEffect(() => {
   
     setUserlist(props.userlist);
	
	
  }, [props.userlist]);
  
 
 useEffect(() => {
			if(unfollowid && unfollowid != ""  ){
						dispatch(unfollow({followingid: unfollowid,loggeduser: userred._id}));
						dispatch({type:"removeAFollower",payload:{followingid: unfollowid}});
			}
  		}, [unfollowid]);	
 
	
	return(
	<>
		<div className="followingllist" style={{backgroundColor:"#ffffff",borderRadius: "1rem",paddingTop:"1rem"}}>
		{
			userlist && userlist.length > 0 ? userlist.map((u,index)=>{ return (
			<div style={{margin:"20px"}} key={index}>
			<p style={{display:"inline-block"}}>
			<Link style={{display: 'inline-block' ,textDecoration:"none"}} to={`/posts/${u._id}`}>

			<img src={u.pofilePicture ? u.pofilePicture:dummyimg } style={{width:"50px",heigh:"50px",borderRadius:"50%"}}/>
			</Link>
			</p>
			<div style={{display: 'inline-block',position:"relative",bottom:"15px"}}>
			<Link style={{display: 'inline-block' ,textDecoration:"none"}} to={`/posts/${u._id}`}>
			<p style={{width:"50%"}}>{u.firstName} </p>
			</Link>
			{ userred._id == props.displayuser ? 
			(<p style={{marginTop:"5px",background :"#009DDC",width:"70px",borderRadius:"5px",height:"20px",textAlign:"center",cursor:"pointer"}} onClick={()=>{setUnfollowid(u._id)}}>
			Unfollow
			</p> 
			
			) : null
			}
			</div>
			</div>
			)}): null
			
			
		}
		
		</div>
	</>
	);

}
export default UserList;
